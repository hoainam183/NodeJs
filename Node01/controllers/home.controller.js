const homeController = {
  index: (req, res) => {
    // Nhận sữ liệu từ request
    // Validate
    // Thao tác với Model(Database)
    // Xử lí logic nghiệp vụ
    // Trả về response: view, redirect, json

    // res.send(
    //     `<h1>Học Express không khó</h1>`
    // )
    const title = `<i>Hoc backend</i>`;
    const status = true;
    const users = ["user 1", "user2", "user3"];
    // set session
    req.session.message = "Hoc lap trinh khong kho";
    req.session.count = 1;
    delete req.session.count;// Xóa session count
    res.render("home/index", { title, status, users });
  },
  showProducts: (req, res) => {
    // res.send("<h1>Danh sách sản phẩm</h1>")

    // get session
    console.log(req.session.message);
    console.log(req.session.count);

    res.render("home/product", {
      layout: false,
    });
  },
};
export default homeController;

/*
Controller: Tương ứng với module
Action: Hàm thể hiện 1 chức năng trong 1 module
+ add
+ edit
+ delete
+ lists
*/
