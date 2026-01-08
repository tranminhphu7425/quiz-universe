import requests
import json
import time
import random
import os

# Token bác đưa nè
access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RrbWhiYWNrLmN0dS5lZHUudm4vYXBpL2F1dGgvZmFzdF9sb2dpbiIsImlhdCI6MTc2NzQwNzU5OCwiZXhwIjoxNzY3NDUwNzk4LCJuYmYiOjE3Njc0MDc1OTgsImp0aSI6IndETWxKcFdXSmxTZmhjQ0IiLCJzdWIiOiI1OTQxNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJpc19tb2JpbGUiOmZhbHNlLCJwaGFuSGVNYWNEaW5oIjp7Im5hbWUiOiLEkMSDbmcga8O9IGjhu41jIHBo4bqnbiIsImFwcG5hbWUiOiJkYW5na3lob2NwaGFuIn0sInVzZXJfaW5mbyI6ImVKeHRVcnRPd3pBVS9aWElBMVBWT2tsTElCT2xMQXdna0twT2taQWJtOWhxY2wwMWRrU0UrSGR1SExzdEtLUFA0L3JjeHpkcCsvYWpZVkJacmJpRml1VGtNVW5wN1NwTHljeVJVaHNCQ0c5UGhZMEZ5eUI2VVNDak4xbFlTaitaVnpXczFrZFVQVDBuNlM1Yng4R3NCSEExK01IV2RaQkt3UTFxMTE1MGtKcEpYWko4ZVQ4Q3dCcDhkMHlUUEtGSk9qdUhaQ0RSdDh1OEVZTUZiT1BTTEtHS29KSkQwREtMakR5RFJzRTVLTmZRS1JmMVVpWmdRNU0wM3RPaEF1ZG9uS3E3L1ZNM3V0bWViTytvR0s3K0pOZTlTT05hV1lXUmxvZmVRZU83MWNaaUd3ZVN4M2RCd1F4bXFqalRaaGdEMmJ5VG9IWHVRUGlKbWJKaFg0NG9wUm9Ha3REL2hCUlRxSk9QZ1VvOGdXbmpGSStaRmFDYk0rd2pUajJLNitoYkY0RFFyRmpRWmJGSUtGMzU3SlhTeW96c0syczhLQnFtYWtTTzB1Nzk1VDIweG5JQlpsNGFPeGZjenJ2TDl2QlkxT1hPRUQ2S1U2UGFWbW40cUVVbnNGVHk4d3U1bWZWUSIsInJldHVybnVybCI6Imh0dHBzOi8vZGttaC5jdHUuZWR1LnZuL2h0cWwvc2luaHZpZW4vaGluZGV4LnBocCIsInVzZXIiOnsiaGRkdF90aGFvX3RhYyI6IkNRIiwibmFtX2hvY190aGFvX3RhYyI6MjAyNSwiaG9jX2t5X3RoYW9fdGFjIjoxfSwiZGV2aWNlX3R5cGUiOiJ3ZWIiLCJhcHBfbmFtZSI6IkRBTkdLWUhPQ1BIQU4iLCJzc29fc2Vzc2lvbl9pZHgiOiI4Y2E3YWRmMy1lZDQwLTRjODctOGVmZS03OTY4OGI0NWY0MGYifQ.CBj9EwvnVRFC-XX5r2ogopTN6UCrnVykTrJmw43VY8Q"

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
    "NS", "TS", "MT",
    "KT", "KL", "XH", "FL",
    "SG", "SP"
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
output_file = os.path.join("public", "ket_qua_dkmh_full1.json")

with open(output_file, "w", encoding="utf-8") as f:
    json.dump(all_data, f, ensure_ascii=False, indent=2)

print(f"\n✅ Hoàn tất! Đã lưu dữ liệu vào '{output_file}'")
print(f"📦 Tổng số học phần lấy được: {len(all_data)}")