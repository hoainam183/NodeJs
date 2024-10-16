// Middleware chỉ là 1 hàm
// Lọc request trước cho request tiếp tục đi

const isLogin = true;
const authMiddleware = (req, res, next) => {
    if(!isLogin) {
        res.redirect("/dang-nhap");
        return;
    }
    next();
}

export default authMiddleware;