# 🚀 Google Apps Script Setup Guide

## 📋 Bước 1: Tạo Google Apps Script

1. **Truy cập Google Apps Script:**
   - Mở https://script.google.com
   - Đăng nhập bằng Google account

2. **Tạo project mới:**
   - Click "New Project"
   - Xóa code mặc định trong `Code.gs`

3. **Copy code:**
   - Mở file `GOOGLE-APPS-SCRIPT-CODE.js`
   - Copy toàn bộ code
   - Paste vào `Code.gs`

4. **Lưu project:**
   - Click "Save" (Ctrl+S)
   - Đặt tên: "Wedding Wishes API"

## 📋 Bước 2: Tạo Google Sheet

1. **Tạo Google Sheet mới:**
   - Mở https://sheets.google.com
   - Tạo sheet mới
   - Đặt tên: "Wedding Wishes"

2. **Lấy Sheet ID:**
   - Copy URL của sheet
   - Sheet ID là phần giữa `/d/` và `/edit`
   - Ví dụ: `https://docs.google.com/spreadsheets/d/1ABC123.../edit`
   - Sheet ID: `1ABC123...`

## 📋 Bước 3: Cấu hình Apps Script

1. **Kết nối với Sheet:**
   - Trong Apps Script, click "Resources" > "Libraries"
   - Hoặc sử dụng SpreadsheetApp.getActiveSpreadsheet()

2. **Test script:**
   - Chọn function `testScript`
   - Click "Run"
   - Cho phép permissions khi được hỏi

## 📋 Bước 4: Deploy Web App

1. **Deploy:**
   - Click "Deploy" > "New deployment"
   - Type: "Web app"
   - Description: "Wedding Wishes API"

2. **Cấu hình permissions:**
   - Execute as: "Me"
   - Who has access: "Anyone"
   - Click "Deploy"

3. **Lấy URL:**
   - Copy "Web app URL"
   - URL sẽ có dạng: `https://script.google.com/macros/s/SCRIPT_ID/exec`

## 📋 Bước 5: Cấu hình Website

1. **Tạo file .env.local:**
```bash
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. **Restart development server:**
```bash
npm run dev
```

## 🧪 Testing

### Test 1: Kiểm tra API
```bash
curl -X GET "YOUR_SCRIPT_URL"
```

### Test 2: Submit wish
```bash
curl -X POST "YOUR_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","message":"Test wish"}'
```

### Test 3: Get wishes
```bash
curl -X GET "YOUR_SCRIPT_URL?action=get"
```

## 🔧 Troubleshooting

### Lỗi CORS:
- Đảm bảo đã deploy với "Anyone" access
- Kiểm tra URL có đúng không

### Lỗi 403 Forbidden:
- Kiểm tra permissions của Google account
- Đảm bảo script đã được authorize

### Lỗi 404 Not Found:
- Kiểm tra URL deployment
- Đảm bảo script đã được deploy

### Lỗi 500 Internal Server Error:
- Kiểm tra Google Sheet có tồn tại không
- Kiểm tra permissions của Sheet

## 📊 Monitoring

1. **Xem logs:**
   - Apps Script > Executions
   - Xem chi tiết các lần chạy

2. **Xem data:**
   - Mở Google Sheet
   - Kiểm tra data đã được lưu chưa

3. **Test functions:**
   - `testScript()`: Test toàn bộ
   - `getWishesStats()`: Xem thống kê
   - `clearAllWishes()`: Xóa test data

## 🚀 Production Tips

1. **Backup data:**
   - Export Google Sheet định kỳ
   - Sử dụng Google Drive backup

2. **Monitor usage:**
   - Kiểm tra quota limits
   - Monitor execution time

3. **Security:**
   - Không share Sheet với người khác
   - Sử dụng service account nếu cần

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra logs trong Apps Script
2. Test từng function riêng lẻ
3. Kiểm tra permissions và URL
4. Thử deploy lại nếu cần
