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
