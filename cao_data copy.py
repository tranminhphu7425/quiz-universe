import requests
import json
import time
import random
import os

# Token bác đưa nè
access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RrbWhiYWNrLmN0dS5lZHUudm4vYXBpL2F1dGgvZmFzdF9sb2dpbiIsImlhdCI6MTc3NjA5MjQ0MSwiZXhwIjoxNzc2MTM1NjQxLCJuYmYiOjE3NzYwOTI0NDEsImp0aSI6IkMzcWNyZXRNUUpNcDVSS1kiLCJzdWIiOiI1OTQxNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJpc19tb2JpbGUiOmZhbHNlLCJwaGFuSGVNYWNEaW5oIjp7Im5hbWUiOiLEkMSDbmcga8O9IGjhu41jIHBo4bqnbiIsImFwcG5hbWUiOiJkYW5na3lob2NwaGFuIn0sInVzZXJfaW5mbyI6ImVKeHRVajF2Z3pBUS9TdklRNmNvTVpBVWxhbHB1blJvMVVwUkpxVEl3UzYyZ0hNVWJGUlU5Yi8zY093a3JSaDVIOGQ3NS9zbTNkRHRXd2FWMVlwYnFFaE9ucEtVM3EreWxNd2NLYlVSZ1BEMlZOaFlzQXlpVndVeWVwZUZwZlNUZVZYTEduMUUxZk5Ma3U2eWRSek1TZ0JYb3g5czB3U3BGTnlnZHUxRnRkUk02cExreTRjekFLekY3NTVwa2ljMFNXZVhrQXdrK25hWk4yS3dnRzFjbWlWVUVWUnlERnBta1pFWDBDaTRCT1VhZXVXaVhzY0ViQ3hKNHdNZEozQ094cW01Mno5em83dnR5UTZPaXVIbW4rUzJpelN1eWlxc3RLeUhFZkxWT20wczFxaEpIbWRCd1F4bXFqalRabHdEMlh5UW9IWHVRUGlObWJKbFg0NG9wUm9Ya3REL2hCUlRxSk9mQTVWNEF0UEdLUjR6SzBBM1o5Z2pUajJLenpGMExnQ2hXYkdneTJLUlVMcnkyU3VsbFRtemI2ejFvR2laYWhBNVNudndsL2ZZR2NzRm1IbHA3Rnh3TysrdnI0ZkhvcTUzaHZCUm5GclZkVXJEdmhHOXdGSEp6eSs1cS9WUSIsInJldHVybnVybCI6Imh0dHBzOi8vZGttaC5jdHUuZWR1LnZuL2h0cWwvc2luaHZpZW4vaGluZGV4LnBocCIsInVzZXIiOnsiaGRkdF90aGFvX3RhYyI6IkNRIiwibmFtX2hvY190aGFvX3RhYyI6MjAyNSwiaG9jX2t5X3RoYW9fdGFjIjoxfSwiZGV2aWNlX3R5cGUiOiJ3ZWIiLCJhcHBfbmFtZSI6IkRBTkdLWUhPQ1BIQU4iLCJzc29fc2Vzc2lvbl9pZHgiOiI2MGJmNzI1YS1jMjVkLTQ2NTYtYWQzNi03MDI4NjE0MzQwMzkifQ.qJGLdODXSFCp-W9AbKSmCO-7PTSg_oH1LbeI-AtgwQQ"

# Giả lập Browser (Header quan trọng để không bị chặn)
headers = {
    "Authorization": f"Bearer {access_token}",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "application/json, text/plain, */*",
    "Referer": "https://dkmh.ctu.edu.vn/",
    "Origin": "https://dkmh.ctu.edu.vn",
    "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
    "Connection": "keep-alive"
}

base_url = "https://dkmhback.ctu.edu.vn/api/v1/dangkyhocphan/sinhvien/danhmuchocphan"

# Danh sách để chứa kết quả
all_data = []

print("🚀 Bắt đầu đào dữ liệu từ các tiền tố + 001 đến 999...")

PREFIXES = [
    "ML", "QP", "TC", "KN",
    "TN", "CT", "CN", "KC",
    "NN", "AQ", "KC"
]

for prefix in PREFIXES:
    print(f"\n🔍 Đang quét nhóm: {prefix}xxx")

    for i in range(1, 1000):
        ma_hoc_phan = f"{prefix}{i:03d}"

        params = {
            "dkmh_tu_dien_nien_khoa_nam_hoc": "2025",
            "dkmh_tu_dien_hoc_ky_ma": "2",
            "dkmh_tu_dien_hoc_phan_ma": ma_hoc_phan
        }

        try:
            response = requests.get(
                base_url,
                headers=headers,
                params=params,
                timeout=10
            )

            if response.status_code == 200:
                data = response.json()

                # API CTU thường trả code + data rỗng → check kỹ
                if data and data.get("data") and data["data"].get("data"):
                    print(f"[OK] {ma_hoc_phan}")
                    all_data.append({
                        "ma_request": ma_hoc_phan,
                        "data": data
                    })
                else:
                    print(f"[Trống] {ma_hoc_phan}")
            else:
                print(f"[Lỗi {response.status_code}] {ma_hoc_phan}")

        except Exception as e:
            print(f"[Exception] {ma_hoc_phan}: {str(e)}")

        # nghỉ để tránh bị rate-limit
        time.sleep(random.uniform(0.5, 1.5))

# Ghi file JSON
output_file = os.path.join("public/data", "ket_qua_dkmh_full.json")

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(all_data, f, ensure_ascii=False, indent=2)

print(f"\n✅ Hoàn tất! Đã lưu dữ liệu vào '{output_file}'")
print(f"📦 Tổng số học phần lấy được: {len(all_data)}")