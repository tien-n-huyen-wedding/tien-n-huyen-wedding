# Hướng Dẫn Setup Google Sheets cho Lời Chúc

## Bước 1: Tạo Google Sheet

1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một sheet mới với tên "Wedding Wishes"
3. Tạo các cột như sau:
   - A1: `id` (ID duy nhất)
   - B1: `name` (Tên người gửi)
   - C1: `message` (Lời chúc)
   - D1: `timestamp` (Thời gian gửi)

## Bước 2: Tạo Google Apps Script

1. Trong Google Sheet, chọn **Extensions** > **Apps Script**
2. Xóa code mặc định và thay thế bằng code sau:

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

// Function to get all wishes
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

## Bước 3: Deploy Google Apps Script

1. Trong Apps Script editor, click **Deploy** > **New deployment**
2. Chọn type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. Click **Deploy**
6. Copy URL được tạo ra (sẽ có dạng: `https://script.google.com/macros/s/SCRIPT_ID/exec`)

## Bước 4: Cấu hình trong Website

1. Tạo file `.env.local` trong thư mục gốc của project:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. Thay `YOUR_SCRIPT_ID` bằng ID thực tế từ bước 3

**Lưu ý**:
- Nếu không cấu hình Google Script URL, website sẽ sử dụng dữ liệu mẫu để demo
- Lời chúc sẽ được lưu tạm thời trong browser và hiển thị ngay lập tức
- Để lưu trữ lâu dài, cần setup Google Sheets theo hướng dẫn trên

## Bước 5: Test

1. Chạy website: `npm run dev`
2. Truy cập section lời chúc
3. Thử gửi một lời chúc test
4. Kiểm tra Google Sheet xem có dữ liệu mới không

## Lưu ý Quan Trọng

- **Miễn phí**: Google Sheets và Apps Script đều miễn phí
- **Giới hạn**: Apps Script có giới hạn 6 phút execution time và 20,000 requests/ngày
- **Bảo mật**: URL Apps Script có thể truy cập công khai, nhưng chỉ có thể ghi dữ liệu qua POST request
- **Backup**: Dữ liệu được lưu trực tiếp trong Google Sheet, có thể export/backup dễ dàng

## Troubleshooting

### Lỗi CORS
Nếu gặp lỗi CORS, thêm vào đầu file Apps Script:

```javascript
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}
```

### Lỗi Permission
- Đảm bảo đã share Google Sheet với tài khoản Google Apps Script
- Kiểm tra quyền execute trong Apps Script deployment
