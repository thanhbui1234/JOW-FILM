# API: Update Video

## Endpoint
- Method: `POST`
- Path: `/cms-api/v1/update-video`
- Auth: Yêu cầu `Authorization: Bearer <accessToken>` (Google OAuth2 access token)
- Content-Type: `application/json`

## Mô tả

Cập nhật metadata video trong DB. Chỉ cập nhật video thuộc user đang đăng nhập. Các field không truyền (null) sẽ giữ nguyên giá trị cũ.

## Request

### Headers
- `Content-Type: application/json`
- `Authorization: Bearer <accessToken>`

### Body

| Trường | Kiểu dữ liệu | Bắt buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `videoId` | number | Có | ID video cần cập nhật |
| `youtubeVideoId` | string | Không | ID video trên YouTube |
| `title` | string | Không | Tiêu đề |
| `description` | string | Không | Mô tả (truyền `""` để xóa) |
| `tags` | string[] | Không | Danh sách tag |
| `fileSize` | number | Không | Kích thước file gốc (bytes) |
| `status` | string | Không | `PROCESSING`, `UPLOADED`, `FAILED` |
| `privacyStatus` | string | Không | Trạng thái riêng tư YouTube |
| `category` | number | Không | Loại video nội bộ, số nguyên `1`–`4` (xem bảng bên dưới) |
| `visible` | boolean | Không | Hiển thị trên CMS |

**VideoCategory** — API chỉ nhận/trả số nguyên (`1`–`4`), không truyền tên enum:

| Giá trị | Tên tham chiếu | Mô tả |
| :---: | :--- | :--- |
| `1` | `WEDDING` | Đám cưới |
| `2` | `FUNERAL` | Lễ tang |
| `3` | `ENGAGEMENT` | Ăn hỏi |
| `4` | `OUTDOOR` | Dã ngoại |

Ví dụ:

```json
{
  "videoId": 345,
  "title": "Wedding Highlight 2026 - Updated",
  "category": 1,
  "visible": true,
  "tags": ["wedding", "highlight", "2026"]
}
```

Ví dụ cURL:

```bash
curl --location --request POST 'http://localhost:8686/cms-api/v1/update-video' \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <accessToken>' \
  --data-raw '{
    "videoId": 345,
    "title": "Wedding Highlight 2026 - Updated",
    "category": 1,
    "visible": true
  }'
```

## Response

### Success - HTTP 200

```json
{
  "cmdId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "cmdTime": 1760000000000,
  "triggerId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "method": "POST",
  "path": "/cms-api/v1/update-video",
  "data": {
    "videoId": 345,
    "title": "Wedding Highlight 2026 - Updated",
    "category": 1,
    "visible": true
  }
}
```

`data` echo các field đã gửi trong request.

### Error thường gặp

Thiếu `videoId`:

```json
{
  "cmdId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  "cmdTime": 1760000001234,
  "triggerId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
  "method": "POST",
  "path": "/cms-api/v1/update-video",
  "error": {
    "errorMsg": "videoId is required",
    "errorCode": -2026
  }
}
```

Video không tồn tại hoặc không thuộc user:

```json
{
  "cmdId": "6d24222e-ed95-4b4e-8aa4-32c83ceaa522",
  "cmdTime": 1760000005678,
  "triggerId": "6d24222e-ed95-4b4e-8aa4-32c83ceaa522",
  "method": "POST",
  "path": "/cms-api/v1/update-video",
  "error": {
    "errorMsg": "not found",
    "errorCode": 404
  }
}
```

`category` hoặc `status` không hợp lệ:

```json
{
  "cmdId": "c3d4e5f6-a7b8-9012-cdef-123456789012",
  "cmdTime": 1760000002345,
  "triggerId": "c3d4e5f6-a7b8-9012-cdef-123456789012",
  "method": "POST",
  "path": "/cms-api/v1/update-video",
  "error": {
    "errorMsg": "category is invalid",
    "errorCode": -2026
  }
}
```

Token không hợp lệ:

```json
{
  "cmdId": "9fc0fdfb-b312-4da4-b95f-95f6f9c9ab1f",
  "cmdTime": 1760000007777,
  "triggerId": "9fc0fdfb-b312-4da4-b95f-95f6f9c9ab1f",
  "method": "POST",
  "path": "/cms-api/v1/update-video",
  "error": {
    "errorMsg": "unauthorized",
    "errorCode": 401
  }
}
```
