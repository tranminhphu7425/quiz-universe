var itemList = {
  sp001: {
    name: "Sách giáo khoa lớp 1",
    price: 15000,
    img: "images/sp001.jpg",
  },
  sp002: {
    name: "Sách giáo khoa lớp 2",
    price: 15000,
    img: "images/sp002.jpg",
  },
  sp003: {
    name: "Sách giáo khoa lớp 3",
    price: 15000,
    img: "images/sp003.jpg",
  },
};

function addCart(code) {
  var number = document.getElementById(code).value;

  if (window.localStorage.getItem(code) == null) {
    if (number > 100) {
      alert("Số lượng không được lớn hơn 100");
      window.localStorage.setItem(code, 100);
    } else {
      window.localStorage.setItem(code, number);
    }
  } else {
    var newnumber =
      parseInt(window.localStorage.getItem(code)) + parseInt(number);
    if (newnumber > 100) {
      alert("Số lượng không được lớn hơn 100");
      window.localStorage.setItem(code, 100);
    } else {
      window.localStorage.setItem(code, newnumber);
    }
  }
}

function showCart() {
  var tongtien = 0;

  for (var i = 0; i < window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    var munber = window.localStorage.getItem(key);
    var item = itemList[key];
    var node = document.createElement("tr");
    tongtien += item.price * munber;
    node.innerHTML = `
        <td><img src="${item.photo}" alt=""></td>
    <td>${item.name}</td>
    <td>${number}</td>
    <td>${item.price}</td>
         
        `;
        document.getElementById("cart").appendChild(node);
  }
}


function validForm(){


    var email = document.getElementById("email").value;
    var emailReg = /^[a-zA-Z0-9._-]+@[aA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(!emailReg.test(email)){
        alert("Email không hợp lệ");
        return false;
    }
    var phone = document.getElementById("phone").value;
    var phoneReg = /^[0-9]{10}$/;
    if(!phoneReg.test(phone)){
        alert("Số điện thoại không hợp lệ");
        return false;
    }
    var address = document.getElementById("address").value;
    if(address.length < 10){
        alert("Địa chỉ không hợp lệ");
        return false;
    }








    return true;
}




function checkValid(){
    var mssv = document.getElementById("mssv").value;
  
    var mssvReg = /^[BC]\d{7}$/;

    if(!mssvReg.test(mssv)){
        alert("MSSV không hợp lệ");
        return false;
    }

    var name = document.getElementById("name").value;
    if(name.length < 5){
        alert("Tên không hợp lệ");
        return false;
    }
    

    return true;
}