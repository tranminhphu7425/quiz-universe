var itemList = {
  sp001: {
    name: "Sữa Chua Vị Kiwi",
    price: 21000,
    photo: "images/sanpham/kiwi.jpg",
  },
  sp002: {
    name: "Sữa Chua Vị Xoài",
    price: 22000,
    photo: "images/sanpham/mango.jpg",
  },
  sp003: {
    name: "Sữa Chua Vị Dưa lưới",
    price: 23000,
    photo: "images/sanpham/cantaloupe.jpg",
  },
  sp004: {
    name: "Sữa Chua Vị Mâm Xôi",
    price: 24000,
    photo: "images/sanpham/blackberry.jpg",
  },
  sp005: {
    name: "Sữa Chua Vị Dâu Tây",
    price: 25000,
    photo: "images/sanpham/strawberry.jpg",
  },
  sp006: {
    name: "Sữa Chua Vị Việt Quất",
    price: 26000,
    photo: "images/sanpham/blueberry.jpg",
  },
  sp007: {
    name: "Sữa Chua Vị Bưởi",
    price: 27000,
    photo: "images/sanpham/grapes.jpg",
  },
  sp008: {
    name: "Sữa Chua Vị Táo Xanh",
    price: 28000,
    photo: "images/sanpham/green-apple.jpg",
  },
  sp009: {
    name: "Sữa Chua Vị Dứa",
    price: 29000,
    photo: "images/sanpham/pineapple.jpg",
  },
};




document
  .getElementById("searchText")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      search();
    }
  });

function search() {
  var input = document.getElementById("searchText").value;
  console.log("Searching for:", input);
}

function formValidate() {
  var input = document.getElementById("searchText").value;
  if (input === "") {
    alert("Please enter a search term");
    return false;
  }
  return true;
}


function frmValiddate5() {
  var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  var email = document.getElementById("email").value;
  if (emailReg.test(email) == false) {
    alert("Please enter a valid email address");
    return false;
  }
  var password = document.getElementById("password").value;
  if (password.length < 8) {
    alert("Password should be at least 8 characters long");
    return false;
  }

  var hoten = document.getElementById("hoten").value;
  if (hoten.length < 4) {
    alert("Name should be at least 4 characters long");
    return false;
  }

  var noidung = document.getElementById("noidung").value;
  if (noidung.length < 10) {
    alert("Content should be at least 10 characters long");
    return false;
  }
}

function addCart(code) {
  var number = document.getElementById(code).value;
  if (typeof localStorage[code] == "undefined") {
    window.localStorage.setItem(code, number); //thêm phần tử mới vào
  } else {
    if (number + window.localStorage.getItem(code) <= 100) {
      window.localStorage.setItem(
        code,
        parseInt(number) + parseInt(window.localStorage.getItem(code))
      );
    } else {
      alert("Sản phẩm đã đầy tổng số lượng cho phép"); 
      window.localStorage.setItem(code, 100);
    }
  }
}

function showCart() {
  var thanhtien = 0;
  console.log(localStorage);

  for (var i = 0; i < localStorage.length; i++) {
    var code = localStorage.key(i);
    var number = window.localStorage.getItem(code); //lấy phần tử ra
    var item = itemList[code];
    thanhtien += item.price * number;

    const node = document.createElement("tr");
    node.innerHTML = `
    <td><img src= "${item.photo}"/></td>
    <td>${item.name}</td>
    <td>${number}</td>
    <td>${item.price}</td>
    <td>${item.price * number}</td>
    <td><i class="fa-solid fa-trash" style="color: #ff0088;" onclick = "removeCart('${code}')"></i></td>`;
    document.querySelector("tbody").appendChild(node);
  }
  document.getElementById("thanhtien").innerText =
    "Tổng thành tiền (A) = " + thanhtien.toLocaleString("vi-VN") + " đ";
  document.getElementById("chietkhau").innerText =
    "Chiết khấu (B) = 0.1 * A = " +
    (thanhtien * 0.1).toLocaleString("vi-VN") +
    " đ";
  document.getElementById("thue").innerText =
    "Thuế (C) = 10% x (A - B) = " +
    (0.1 * (thanhtien - thanhtien * 0.1)).toLocaleString("vi-VN") +
    " đ";
  document.getElementById("tongdonhang").innerText =
    "Tổng đơn hàng = A - B + C = " +
    (
      thanhtien -
      thanhtien * 0.1 +
      0.1 * (thanhtien - thanhtien * 0.1)
    ).toLocaleString("vi-VN") +
    " đ";
}

showCart();

function removeCart(code) {
  if (typeof window.localStorage[code] !== "undefined") {
    window.localStorage.removeItem(code);
    document.querySelector("tbody").innerHTML = "";
    showCart();
  }
}
