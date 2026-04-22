import requests
import json
import time
import random
import os
from concurrent.futures import ThreadPoolExecutor, as_completed
from threading import Lock

# ===== CONFIG =====
MAX_WORKERS = 100   # chỉnh 5–20 tùy máy & rate limit
DELAY_RANGE = (0.2, 0.6)

access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RrbWhiYWNrLmN0dS5lZHUudm4vYXBpL2F1dGgvZmFzdF9sb2dpbiIsImlhdCI6MTc3NjIzOTE3NCwiZXhwIjoxNzc2MjgyMzc0LCJuYmYiOjE3NzYyMzkxNzQsImp0aSI6IkFsVWR4YVFtQmZ3VmZFSVEiLCJzdWIiOiI1OTQxNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJpc19tb2JpbGUiOmZhbHNlLCJwaGFuSGVNYWNEaW5oIjp7Im5hbWUiOiLEkMSDbmcga8O9IGjhu41jIHBo4bqnbiIsImFwcG5hbWUiOiJkYW5na3lob2NwaGFuIn0sInVzZXJfaW5mbyI6ImVKeHRVajF2Z3pBUS9TdklRNmNvTVpBVWxhbHB1blJvMVVwUkpxVEl3UzYyZ0hNVWJGUlU5Yi8zY093a3JSaDVIOGQ3NS9zbTNkRHRXd2FWMVlwYnFFaE9ucEtVM3EreWxNd2NLYlVSZ1BEMlZOaFlzQXlpVndVeWVwZUZwZlNUZVZYTEduMUUxZk5Ma3U2eWRSek1TZ0JYb3g5czB3U3BGTnlnZHUxRnRkUk02cExreTRjekFLekY3NTVwa2ljMFNXZVhrQXdrK25hWk4yS3dnRzFjbWlWVUVWUnlERnBta1pFWDBDaTRCT1VhZXVXaVhzY0ViQ3hKNHdNZEozQ094cW01Mno5em83dnR5UTZPaXVIbW4rUzJpelN1eWlxc3RLeUhFZkxWT20wczFxaEpIbWRCd1F4bXFqalRabHdEMlh5UW9IWHVRUGlObWJKbFg0NG9wUm9Ya3REL2hCUlRxSk9mQTVWNEF0UEdLUjR6SzBBM1o5Z2pUajJLenpGMExnQ2hXYkdneTJLUlVMcnkyU3VsbFRtemI2ejFvR2laYWhBNVNudndsL2ZZR2NzRm1IbHA3Rnh3TysrdnI0ZkhvcTUzaHZCUm5GclZkVXJEdmhHOXdGSEp6eSs1cS9WUSIsInJldHVybnVybCI6Imh0dHBzOi8vZGttaC5jdHUuZWR1LnZuL2h0cWwvc2luaHZpZW4vaGluZGV4LnBocCIsInVzZXIiOnsiaGRkdF90aGFvX3RhYyI6IkNRIiwibmFtX2hvY190aGFvX3RhYyI6MjAyNSwiaG9jX2t5X3RoYW9fdGFjIjoxfSwiZGV2aWNlX3R5cGUiOiJ3ZWIiLCJhcHBfbmFtZSI6IkRBTkdLWUhPQ1BIQU4iLCJzc29fc2Vzc2lvbl9pZHgiOiIyM2MyNzNlMC1mOTgxLTQ3MzgtYWI1Yy02YmQ2NmM2YzM0YWIifQ.L30uKyVNoC5_3A-HAIg6OGgUMi-Fzwm2EblOV7xPqZU"

headers = {
    "Authorization": f"Bearer {access_token}",
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json, text/plain, */*",
    "Referer": "https://dkmh.ctu.edu.vn/",
    "Origin": "https://dkmh.ctu.edu.vn",
    "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8",
    "Connection": "keep-alive"
}

subjects_api = "http://localhost:8080/api/subjects"
ctu_api = "https://dkmhback.ctu.edu.vn/api/v1/dangkyhocphan/sinhvien/danhmuchocphan"

# ===== LOAD SUBJECTS =====
print("🚀 Lấy danh sách môn...")
res = requests.get(subjects_api, timeout=10)
subjects = res.json()
print(f"📚 Tổng số môn: {len(subjects)}")

# ===== SHARED DATA =====
all_data = []
lock = Lock()

# ===== WORKER FUNCTION =====
def fetch_subject(subject):
    code = subject.get("code")
    if not code:
        return None

    params = {
        "dkmh_tu_dien_nien_khoa_nam_hoc": "2025",
        "dkmh_tu_dien_hoc_ky_ma": "3",
        "dkmh_tu_dien_hoc_phan_ma": code
    }

    try:
        response = requests.get(
            ctu_api,
            headers=headers,
            params=params,
            timeout=10
        )

        if response.status_code == 200:
            data = response.json()

            # API CTU thường trả code + data rỗng → check kỹ
            if data and data.get("data") and data["data"].get("data"):
                print(f"[OK] {code}")
                all_data.append({
                    "ma_request": code,
                    "data": data
                })
            else:
                print(f"[Trống] {code}")
        else:
            print(f"[Lỗi {response.status_code}] {code}")

    except Exception as e:
        print(f"[Exception] {code}: {str(e)}")

    # delay nhẹ để tránh spam
    time.sleep(random.uniform(*DELAY_RANGE))
    return None


# ===== MULTI THREAD RUN =====
print(f"\n⚡ Chạy với {MAX_WORKERS} threads...\n")

with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
    futures = [executor.submit(fetch_subject, sub) for sub in subjects]

    for future in as_completed(futures):
        result = future.result()
        if result:
            with lock:
                all_data.append(result)

# ===== SAVE =====
os.makedirs("public/data", exist_ok=True)
output_file = "public/data/ket_qua_dkmh_full.json"

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(all_data, f, ensure_ascii=False, indent=2)

print(f"\n✅ Done! Lưu tại: {output_file}")
print(f"📦 Tổng môn có dữ liệu: {len(all_data)}")