import { chromium } from "playwright";
import fs from "fs";
import { log } from "console";

const TOKEN =
  "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2RrbWhiYWNrLmN0dS5lZHUudm4vYXBpL2F1dGgvZmFzdF9sb2dpbiIsImlhdCI6MTc2NzI0ODY3NywiZXhwIjoxNzY3MjkxODc3LCJuYmYiOjE3NjcyNDg2NzcsImp0aSI6IngxT0dzemV5blg2U3pPUm8iLCJzdWIiOiI1OTQxNCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJpc19tb2JpbGUiOmZhbHNlLCJwaGFuSGVNYWNEaW5oIjp7Im5hbWUiOiLEkMSDbmcga8O9IGjhu41jIHBo4bqnbiIsImFwcG5hbWUiOiJkYW5na3lob2NwaGFuIn0sInVzZXJfaW5mbyI6ImVKeHRVcnRPd3pBVS9aWElBMVBWT2tsTElCT2xMQXdna0twT2taQWJtOWhxY2wwMWRrU0UrSGR1SExzdEtLUFA0L3JjeHpkcCsvYWpZVkJacmJpRml1VGtNVW5wN1NwTHljeVJVaHNCQ0c5UGhZMEZ5eUI2VVNDak4xbFlTaitaVnpXczFrZFVQVDBuNlM1Yng4R3NCSEExK01IV2RaQkt3UTFxMTE1MGtKcEpYWko4ZVQ4Q3dCcDhkMHlUUEtGSk9qdUhaQ0RSdDh1OEVZTUZiT1BTTEtHS29KSkQwREtMakR5RFJzRTVLTmZRS1JmMVVpWmdRNU0wM3RPaEF1ZG9uS3E3L1ZNM3V0bWViTytvR0s3K0pOZTlTT05hV1lXUmxvZmVRZU83MWNaaUd3ZVN4M2RCd1F4bXFqalRaaGdEMmJ5VG9IWHVRUGlKbWJKaFg0NG9wUm9Ha3REL2hCUlRxSk9QZ1VvOGdXbmpGSStaRmFDYk0rd2pUajJLNitoYkY0RFFyRmpRWmJGSUtGMzU3SlhTeW96c0syczhLQnFtYWtTTzB1Nzk1VDIweG5JQlpsNGFPeGZjenJ2TDl2QlkxT1hPRUQ2S1U2UGFWbW40cUVVbnNGVHk4d3U1bWZWUSIsInJldHVybnVybCI6Imh0dHBzOi8vZGttaC5jdHUuZWR1LnZuL2h0cWwvc2luaHZpZW4vaGluZGV4LnBocCIsInVzZXIiOnsiaGRkdF90aGFvX3RhYyI6IkNRIiwibmFtX2hvY190aGFvX3RhYyI6MjAyNSwiaG9jX2t5X3RoYW9fdGFjIjoxfSwiZGV2aWNlX3R5cGUiOiJ3ZWIiLCJhcHBfbmFtZSI6IkRBTkdLWUhPQ1BIQU4iLCJzc29fc2Vzc2lvbl9pZHgiOiJmMGM3YmM0My1kMDNhLTQ4ZjktYTYzMi1kODI0MWQzOGExNzMifQ.fIY8FkJIjWBk1X3pGS9bag7unYeU80Z1McQRdX2CfsM"; // token của bạn

function buildUrl(maHocPhan) {
  return `https://dkmhback.ctu.edu.vn/api/v1/dangkyhocphan/sinhvien/danhmuchocphan` +
    `?dkmh_tu_dien_nien_khoa_nam_hoc=2025` +
    `&dkmh_tu_dien_hoc_ky_ma=2` +
    `&dkmh_tu_dien_hoc_phan_ma=${maHocPhan}`;
}

async function fetchHocPhan(page, maHocPhan) {
  const url = buildUrl(maHocPhan);
  console.log(`➡ GET ${url}`);

  const response = await page.request.get(url, {
    headers: {
      accept: "application/json",
      authorization: TOKEN,
      origin: "https://dkmhfe.ctu.edu.vn",
      referer: "https://dkmhfe.ctu.edu.vn/",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36",
    },
  });

  if (!response.ok()) {
    console.log(`⛔ ${maHocPhan} HTTP ${response.status()}`);
    return null;
  }

  const json = await response.json();

  if (json?.data?.length > 0) {
    console.log(`✔ Có dữ liệu ${maHocPhan}`);
    return json.data;
  }

  console.log(`✘ Không có dữ liệu ${maHocPhan}`);
  return null;
}

async function crawl() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    locale: "vi-VN",
    viewport: { width: 1280, height: 800 },
  });

  const page = await context.newPage();
  const result = [];

  // test 1 mã trước
  const testData = await fetchHocPhan(page, "CT100");
  console.log(testData);
  
  if (testData) result.push(...testData);

  // nếu muốn crawl nhiều mã
  /*
  for (let i = 1; i <= 600; i++) {
    const ma = `CT${String(i).padStart(3, "0")}`;
    const data = await fetchHocPhan(page, ma);
    if (data) result.push(...data);
    await page.waitForTimeout(300);
  }
  */

  fs.writeFileSync(
    "hocphan.json",
    JSON.stringify(result, null, 2),
    "utf-8"
  );

  console.log(`\n✅ Đã lưu ${result.length} bản ghi`);

  await browser.close();
}

crawl();
