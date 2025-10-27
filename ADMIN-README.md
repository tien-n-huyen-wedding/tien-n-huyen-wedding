# Wedding Admin Page

## Overview
The admin page allows you to generate personalized wedding invitation URLs and QR codes for your guests. You can customize the invitation content and create shareable links or QR codes.

## Access
Visit `/admin` on your wedding website to access the admin panel.

## Features

### 1. Invitation Settings
- **Wedding Package**: Choose from different ceremony/party packages
  - `mainParty`: Main wedding ceremony and party at Gia Huy Palace
  - `bridePartySectionOne`: Bride's family ceremony and party (First session)
  - `bridePartySectionTwo`: Bride's family ceremony and party (Second session)
- **Guest Name**: Customize the name that appears in the invitation
- **Invitation Text**: Opening text of the invitation
- **Second Invitation Text**: Additional text before venue information
- **Thanks Text**: Thank you message at the end of the invitation

### 2. URL Generation
- Automatically generates a personalized URL with query parameters
- URL format: `https://tien-n-huyen-wedding.github.io/?package=mainParty&guestName=GuestName&invitationText=Text&invitationSecondText=Text&thanksText=Text`
- Copy button to easily share the URL

### 3. QR Code Generator
- Generates beautiful QR codes with your wedding logo
- Circular design with customizable text
- Copy QR code to clipboard or download as image
- Direct link to open invitation in new tab

## URL Parameters

| Parameter | Description | Example Values |
|-----------|-------------|----------------|
| `package` | Wedding package/ceremony type | `mainParty`, `bridePartySectionOne`, `bridePartySectionTwo` |
| `guestName` | Name to display in invitation | `Bạn Mến Yêu`, `Anh Minh`, `Chị Lan` |
| `invitationText` | Opening invitation text | `Trân trọng kính mời:` |
| `invitationSecondText` | Additional invitation text | `Đến dự buổi tiệc\nChung vui cùng gia đình chúng tôi tại` |
| `thanksText` | Thank you message | `Sự hiện diện của quý khách\nlà niềm vinh hạnh lớn cho chúng tôi.` |

## How to Use

1. **Select Package**: Choose the appropriate wedding package for your guest
2. **Enter Guest Name**: Type the guest's name as it should appear in the invitation
3. **Customize Invitation Text**: Modify the opening, second, and thanks text as needed
4. **Copy URL**: Use the copy button to get the personalized URL
5. **Generate QR Code**: The QR code updates automatically
6. **Share**: Send the URL or QR code to your guest via message, email, or print

## Examples

### Example 1: Main Party Guest
- Package: `mainParty`
- Guest Name: `Anh Minh`
- URL: `https://tien-n-huyen-wedding.github.io/?package=mainParty&guestName=Anh%20Minh`

### Example 2: Bride's Family Guest with Custom Text
- Package: `bridePartySectionOne`
- Guest Name: `Chị Lan`
- Invitation Text: `Kính mời:`
- Second Text: `Đến dự lễ vu quy\nTại nhà gái`
- Thanks Text: `Cảm ơn sự hiện diện của quý khách`
- URL: `https://tien-n-huyen-wedding.github.io/?package=bridePartySectionOne&guestName=Ch%E1%BB%8B%20Lan&invitationText=K%C3%ADnh%20m%E1%BB%9Di%3A&invitationSecondText=%C4%90%E1%BA%BFn%20d%E1%BB%B1%20l%E1%BB%85%20vu%20quy%5CnT%E1%BA%A1i%20nh%C3%A0%20g%C3%A1i&thanksText=C%E1%BA%A3m%20%C6%A1n%20s%E1%BB%B1%20hi%E1%BB%87n%20di%E1%BB%87n%20c%E1%BB%A7a%20qu%C3%BD%20kh%C3%A1ch`

## Technical Details

- The admin page uses the existing QR code generator component
- URL parameters are processed by the main page to customize the invitation
- Guest names and custom messages are stored in localStorage for persistence
- QR codes are generated with the wedding logo and circular design
- All URLs point to the main wedding website with personalized content

## Browser Compatibility

- Modern browsers with clipboard API support
- Fallback copy functionality for older browsers
- Responsive design works on desktop and mobile devices
