// console.log("Back-end");
/*
Client -> HTTP(request, response) -> Server
*/
// Import 1 file, thư viện khác -> Sử dụng require() -> CommonJs
/*
NodeJs sẽ có sẵn 1 số thư viện không cần cài đặt
- http
- fs 
- path
*/

// const { log } = require("console");
import http from "http";
import parse from "url-parse";
import {getName, getEmail} from "./untils/function.js"

console.log(getEmail(),getName());

const hostname = "localhost";
const port = 8080;
const server = http.createServer((req, res) => {

  // request: Yeu cau tu phia Client gui len
  const url = parse(req.url, true);
  // console.log(url.pathname);

  const path = url.pathname;
  const userAgent = req.headers["user-agent"];
  const method = req.method;
  let content;
  if (path === "/") {
    content = `
    <h1>Học NodeJs </h1>
    <h2>Status: </h2>
    <h2>Keyword: </h2>`;
  } else if (path === "/san-pham") {
    const {status,keyword} = url.query;
    // console.log(url);
    
    content = content = `
    <h1>Danh sách sản phẩm</h1>
    <h2>Status: ${status}</h2>
    <h2>Keyword: ${keyword} </h2>`;
  } else if (path === "/khoa-hoc") {
    content = "<h1>Danh sach khoa hoc </h1>";
  } else {
    content = "<h1>Page not found </h1>";
  }
  // response: Phan hoi tu server ve Client

  res.setHeader("abc", "xyz");
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // res.statusCode=404;
  // res.setHeader("Set-Cookie","name=hoainam;path=/;max-age=86400;HttpOnly")
  const cookie = req.headers["cookie"];
  res.end(content);
});
server.listen(port, hostname, () => {
  console.log("server dang chay voi port = " + port);
});
