import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import flash from "connect-flash"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routerIndex from "./routes/index.js";
import routerUsers from "./routes/users.js";
import authMiddleware from "./middlewares/auth.Middleware.js";
const app = express();

// Khởi tạo session
app.use(session({
  secret: 'f8',
  name: 'f8_session_id'
}
))

// Khởi tạo connect flash
app.use(flash());

app.use(cookieParser()); // Đọc cookie từ phía client

app.use(bodyParser.urlencoded());
app.use(bodyParser.json())

//static file
app.use(express.static('public'))
app.set("view engine", "ejs"); // Thiết lập template engine sử dụng
app.set("views", "./views"); // Thiết lập đường dẫn tới folder view
app.use(expressEjsLayouts)
app.set('layout', 'layouts/layout')

// Router
app.use(cookieParser()); // Đọc cookie từ phía client
app.use(routerIndex);
app.use("/users", authMiddleware, routerUsers);
app.use((req, res) => {
  res.send("Page not found");
});
const port = 8080;
const hostname = "localhost";
app.listen(port, hostname, () => {
  console.log("Dang chay server voi port: ", port);
});
