# Xác thực người dùng
- Xác minh thông tin người dùng (email, pasword) có hợp lệ hay không
+ Hợp lệ: Lưu thông tin vào session hoặc token(jwt)
+ Không hợp lệ: Thông báo lỗi

- Mật khẩu: Mã hóa 1 chiều
+ Cách cũ: md5(), sha1() --> Không an toàn
SELECT * FROM users WHERE email = '....' and password = md5('123456')
+ Hiện tại: hash bcrypt --> An toàn
    Truy vấn theo email để trả về password hash trong database 
     