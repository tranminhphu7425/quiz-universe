import requests
import json
import time
import random
import os
from datetime import datetime

def load_existing_codes(json_file: str) -> set:
    """Load danh sách mã học phần từ file JSON"""
    if not os.path.exists(json_file):
        print(f"❌ Không tìm thấy file {json_file}")
        return set()
    
    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)
    
    codes = set()
    for item in data:
        if "ma_request" in item:
            codes.add(item["ma_request"])
    
    print(f"📂 Đã tìm thấy {len(codes)} mã học phần trong file cũ")
    return codes

def crawl_course(ma_hoc_phan: str, headers: dict, base_url: str) -> dict:
    """Crawl một học phần"""
    params = {
        "dkmh_tu_dien_nien_khoa_nam_hoc": "2025",
        "dkmh_tu_dien_hoc_ky_ma": "2",
        "dkmh_tu_dien_hoc_phan_ma": ma_hoc_phan
    }
    
    try:
        response = requests.get(base_url, headers=headers, params=params, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data and data.get("data") and data["data"].get("data"):
                return {"ma_request": ma_hoc_phan, "data": data, "last_updated": datetime.now().isoformat()}
        return None
    except Exception as e:
        print(f"  ❌ Lỗi: {e}")
        return None

def main():
    # Token
    access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RrbWhiYWNrLmN0dS5lZHUudm4vYXBpL2F1dGgvZmFzdF9sb2dpbiIsImlhdCI6MTc3NjA5MjQ0MSwiZXhwIjoxNzc2MTM1NjQxLCJuYmYiOjE3NzYwOTI0NDEsImp0aSI6IkMzcWNyZXRNUUpNcDVSS1kiLCJzdWIiOiI1OTQxNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJpc19tb2JpbGUiOmZhbHNlLCJwaGFuSGVNYWNEaW5oIjp7Im5hbWUiOiLEkMSDbmcga8O9IGjhu41jIHBo4bqnbiIsImFwcG5hbWUiOiJkYW5na3lob2NwaGFuIn0sInVzZXJfaW5mbyI6ImVKeHRVajF2Z3pBUS9TdklRNmNvTVpBVWxhbHB1blJvMVVwUkpxVEl3UzYyZ0hNVWJGUlU5Yi8zY093a3JSaDVIOGQ3NS9zbTNkRHRXd2FWMVlwYnFFaE9ucEtVM3EreWxNd2NLYlVSZ1BEMlZOaFlzQXlpVndVeWVwZUZwZlNUZVZYTEduMUUxZk5Ma3U2eWRSek1TZ0JYb3g5czB3U3BGTnlnZHUxRnRkUk02cExreTRjekFLekY3NTVwa2ljMFNXZVhrQXdrK25hWk4yS3dnRzFjbWlWVUVWUnlERnBta1pFWDBDaTRCT1VhZXVXaVhzY0ViQ3hKNHdNZEozQ094cW01Mno5em83dnR5UTZPaXVIbW4rUzJpelN1eWlxc3RLeUhFZkxWT20wczFxaEpIbWRCd1F4bXFqalRabHdEMlh5UW9IWHVRUGlObWJKbFg0NG9wUm9Ya3REL2hCUlRxSk9mQTVWNEF0UEdLUjR6SzBBM1o5Z2pUajJLenpGMExnQ2hXYkdneTJLUlVMcnkyU3VsbFRtemI2ejFvR2laYWhBNVNudndsL2ZZR2NzRm1IbHA3Rnh3TysrdnI0ZkhvcTUzaHZCUm5GclZkVXJEdmhHOXdGSEp6eSs1cS9WUSIsInJldHVybnVybCI6Imh0dHBzOi8vZGttaC5jdHUuZWR1LnZuL2h0cWwvc2luaHZpZW4vaGluZGV4LnBocCIsInVzZXIiOnsiaGRkdF90aGFvX3RhYyI6IkNRIiwibmFtX2hvY190aGFvX3RhYyI6MjAyNSwiaG9jX2t5X3RoYW9fdGFjIjoxfSwiZGV2aWNlX3R5cGUiOiJ3ZWIiLCJhcHBfbmFtZSI6IkRBTkdLWUhPQ1BIQU4iLCJzc29fc2Vzc2lvbl9pZHgiOiI2MGJmNzI1YS1jMjVkLTQ2NTYtYWQzNi03MDI4NjE0MzQwMzkifQ.qJGLdODXSFCp-W9AbKSmCO-7PTSg_oH1LbeI-AtgwQQ"
    
    headers = {
        "Authorization": f"Bearer {access_token}",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json, text/plain, */*",
        "Referer": "https://dkmh.ctu.edu.vn/"
    }
    
    base_url = "https://dkmhback.ctu.edu.vn/api/v1/dangkyhocphan/sinhvien/danhmuchocphan"
    
    # Load mã cũ
    json_file = "public/data/ket_qua_dkmh_full.json"
    existing_codes = load_existing_codes(json_file)
    
    if not existing_codes:
        print("Không có mã nào để crawl!")
        return
    
    # Load dữ liệu cũ
    with open(json_file, "r", encoding="utf-8") as f:
        old_data = json.load(f)
    
    # Tạo map để cập nhật
    data_map = {item["ma_request"]: item for item in old_data if "ma_request" in item}
    
    print(f"\n🚀 Bắt đầu crawl lại {len(existing_codes)} học phần...")
    
    new_data = []
    success = 0
    failed = 0
    
    for idx, ma in enumerate(sorted(existing_codes), 1):
        print(f"[{idx}/{len(existing_codes)}] Đang crawl {ma}...", end=" ")
        
        result = crawl_course(ma, headers, base_url)
        
        if result:
            data_map[ma] = result
            success += 1
            print("✅ Thành công")
        else:
            failed += 1
            print("❌ Thất bại (giữ nguyên dữ liệu cũ)")
        
        # Lưu sau mỗi 20 request
        if idx % 20 == 0:
            temp_data = list(data_map.values())
            with open(json_file + ".tmp", "w", encoding="utf-8") as f:
                json.dump(temp_data, f, ensure_ascii=False, indent=2)
            print(f"  💾 Đã lưu checkpoint tại {idx}")
        
        time.sleep(random.uniform(0.3, 0.8))
    
    # Lưu kết quả cuối cùng
    final_data = list(data_map.values())
    with open(json_file, "w", encoding="utf-8") as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Hoàn tất!")
    print(f"📊 Thành công: {success}, Thất bại: {failed}")
    print(f"📦 Tổng số bản ghi: {len(final_data)}")

if __name__ == "__main__":
    main()