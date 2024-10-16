const userController = {
  index: (req, res) => {
    const { status, keyword } = req.query;
    //   const userAgent = req.headers["user-agent"];
    const userAgent = req.get("user-agent");
    res.cookie("email", "hoainam@gmail.com", {
      maxAge: 86400,
      path: "/",
      httpOnly: true,
    });
    const email = req.cookies.email;
    res.set("abc", "xyz");
    res.send(`
              <h1>Danh sách người dùng</h1>
              <h2>Status: ${status}</h2>
              <h2>Keyword: ${keyword}</h2>
              <h2>User Agent: ${userAgent}</h2>
              <h2>Email: ${email}</h2>
              `);
  },
  add: (req, res) => {
    res.send("<h1>Them nguoi dung </h1>");
  },
  active: (req, res) => {
    const id = req.params.id;
    res.send(`<h1>kich hoat nguoi dung ${id}</h1>`);
  },
  courses: (req, res) => {
    res.send("<h1>Danh sach khoa hoc</h1>");
  },
  coursesActive: (req, res) => {
    res.send("<h1>Danh sach khoa hoc kich hoat</h1>");
  },
  coursesPending: (req, res) => {
    res.send("<h1>Danh sach khoa hoc chua kich hoat</h1>");
  },
};

export default userController;
