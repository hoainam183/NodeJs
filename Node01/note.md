# Session
- Phiên làm việc của trình duyệt
- Dữ liệu của session nằm ở server 

Để server biết được phiên làm việc  --> Dùng cookie chứa sessionId

Request -> Cookie (sessionId) -> Server đọc cookie -> Lấy nội dung của session -> Response

# Cách làm việc với Request Response

View(Giao diện) -> Thêm vào http get
- Logic cần xử lí -> Thêm vào post put patch delete -> Redirect về get
