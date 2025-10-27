# Quick Setup - Google Sheets Integration

## 🚀 Setup nhanh để lưu lời chúc vào Google Sheets

### Bước 1: Tạo Google Sheet
1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo sheet mới tên "Wedding Wishes"
3. Tạo các cột: `id`, `name`, `message`, `timestamp`

### Bước 2: Tạo Google Apps Script
1. Trong Google Sheet: **Extensions** > **Apps Script**
2. Xóa code mặc định, paste code này:

```javascript
function doGet(e) {
  try {
    const action = e.parameter.action;

    if (action === 'get') {
      const wishes = getAllWishes();
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        wishes: wishes
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Invalid action'
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
  }
}

function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Validate data
    if (!data.name || !data.message) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Missing required fields'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
    }

    // Add new row
    const newRow = [
      Date.now().toString(), // id
      data.name,
      data.message,
      new Date().toISOString() // timestamp
    ];

    sheet.appendRow(newRow);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Wish saved successfully'
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
  }
}

function getAllWishes() {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const wishes = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      if (row[0]) { // Check if id exists
        wishes.push({
          id: row[0],
          name: row[1],
          message: row[2],
          timestamp: row[3]
        });
      }
    }

    return wishes;
  } catch (error) {
    console.error('Error getting wishes:', error);
    return [];
  }
}
```

### Bước 3: Deploy Apps Script
1. Click **Deploy** > **New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy URL (dạng: `https://script.google.com/macros/s/SCRIPT_ID/exec`)

### Bước 4: Cấu hình Website
1. Tạo file `.env.local` trong thư mục gốc:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. Thay `YOUR_SCRIPT_ID` bằng ID thực tế

### Bước 5: Test
1. Chạy `npm run dev`
2. Truy cập section "Lời Chúc"
3. Gửi thử một lời chúc
4. Kiểm tra Google Sheet xem có dữ liệu mới không

## ✅ Kết Quả
- Lời chúc sẽ được lưu trực tiếp vào Google Sheet
- Có thể xem và quản lý dữ liệu trong Google Sheets
- Website hiển thị trạng thái kết nối Google Sheets
