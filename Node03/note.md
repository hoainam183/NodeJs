# Các bước làm việc với Sequelize CLI
- Cài đặt sequelize: npm i sequelize
- Cài đặt sequelize-cli: npm i --save-dev sequelize-cli
- Khởi tạo: npx sequelize-sli init

File: config/config.json -> Config database theo các môi trường khác nhau

## Migration là gì? 
- File xây dựng cấu trúc của các table trong Database
- Khi làm việc với Database -> Không thao tác trực tiếp trên CSDL mà sẽ thông qua các file migration

- Tác dụng: 
+ Bảo mật
+ Quản lí CSDL giữa các thành viên trong Team

## Tạo Model bằng CLI 
npx-sequelize-cli model:generate --name TenModel --attributes tenfield1: kieudulieu, tenfield2: kieudulieu

Ví dụ: npx sequelize-cli model:generate --name Customer --attributes id:number, name:string

## Chạy Migrate
nps sequelize-cli db:migrate

## Undo Migrate
Khôi phục phiên bản trước của database

npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all -> Reset Database về trạng thái chưa có bảng nào

## Tạo riêng Migration (Áp dụng khi sửa cấu trúc bảng)
npx sequelize migration:generate --name=ten_migartion

## Đăng nhập thông qua mạng xã hội

- Sử dụng thông tin tài khoản mạng xã hội để lấy user --> Insert vào database --> Xác thực login trên thông tin đó

# 2 bước triển khai

- Tạo link chuyển hướng tới mạng xã hội để đưng nhập
- Xử lí lấy dữ liệu và insert dữ liệu vào database sau khi đăng nhập xong trên mạng xã hội (Khi đăng nhập xong, chuyển hướng về callback url)