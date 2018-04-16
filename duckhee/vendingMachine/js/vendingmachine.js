var VendingMachine = (function(){
  function VendingMachine() {
    this.inventory = [];
    this.displayId = 0;
    this.balance = 0;
  }

  VendingMachine.prototype = {
    registerProduct: registerProduct,
    showInvetory: showInvetory,
    deleteRegisteredProduct: deleteRegisteredProduct,
    addQuantityInInventory: addQuantityInInventory,
    subtractQuantityInInventory: subtractQuantityInInventory,
    showProductQuantity: showProductQuantity,
    addProductInDisplayedSpace: addProductInDisplayedSpace,
    subtractProductInDisplayedSpace: subtractProductInDisplayedSpace,
    clickInsertMoney: clickInsertMoney,
  }

  // 상품 등록하기
  function registerProduct(product) {
    // some 함수 : 하나라도 같으면 true
    var checkName = this.inventory.some(function (item) {
      return item.name === product.name;
    });

    if(checkName) {
      console.warn("이름(" + product.name + ")이 같은 상품이 있습니다.");
      return false;
    } else {
      this.inventory.push(product);
    }
  }
  // 등록된 상품 inventory 보여주기
  function showInvetory() {
    return this.inventory;
  }
  // 등록된 상품 삭제하기
  function deleteRegisteredProduct(id) {
    var targetIndex = findIndexById.call(this,id);
    console.log(targetIndex);
    this.inventory.splice(targetIndex, 1);
    return this.inventory;
  }
  // 등록된 상품 재고 추가하기
  function addQuantityInInventory(product, quantity) {
    if(!isProduct(product)) {
      console.warn("상품(" + product.name + ")이 없습니다.");
      return false;
    }

    if(isNumber(quantity)) {
      console.warn("재고 수량이(" + quantity + ")이 잘못 입력되었습니다.(양수, 정수로 입력해주세요)");
      return false;
    }

    var targetIndex = findIndexByName.call(this, product);
    // this.inventory[targetIndex].totalQuantity 줄이면 undefined?
    var curTotalQuantity = this.inventory[targetIndex].totalQuantity + quantity;

    if(curTotalQuantity >= 30) {
      console.warn("재고가 30개 이상은 들어가지 않습니다. 현 재고 : 30개 입니다.");
      this.inventory[targetIndex].totalQuantity = 30;
    } else {
      this.inventory[targetIndex].totalQuantity = curTotalQuantity;
    }
    return "현 재고 : " + this.showProductQuantity(product);
  }
  // 등록된 상품 재고 빼기
  function subtractQuantityInInventory(product, quantity) {
    if(isProduct()) {
      console.warn("상품(" + product.name + ")이 없습니다.");
      return false;
    }

    if(isNumber(quantity)) {
      console.warn("재고 수량이(" + quantity + ")이 잘못 입력되었습니다.(양수, 정수로 입력해주세요)");
      return false;
    }

    var targetIndex = findIndexByName.call(this, product);
    var curTotalQuantity = this.inventory[targetIndex].totalQuantity - quantity;

    if(curTotalQuantity <= 0) {
      console.warn("재고가 0개 이하입니다. 현 재고 : 0개 입니다.");
      this.inventory[targetIndex].totalQuantity = 0;
    } else {
      this.inventory[targetIndex].totalQuantity = curTotalQuantity;
    }
    return "현 재고 : " + this.showProductQuantity(product);
  }
  // 등록된 상품 재고 확인하기
  function showProductQuantity(product) {
    return product.totalQuantity;
  }
  // 상품 진열 하기
  function addProductInDisplayedSpace(product) {
    if(document.querySelectorAll(".displaySpace__item").length >= 30) {
      console.warn("진열 자리가 꽉 찼습니다.");
      return false;
    }
    var targetIndex = findIndexByName.call(this, product);
    if(this.inventory[targetIndex].isSame <= 0) {
        console.warn("중복 진열 자리가 없습니다.");
        return false;
    }
    this.inventory[targetIndex].isSame--;
    var displayedList = document.querySelector(".displaySpace__list");
    var displayedItem = document.createElement("li");
    var productName = document.createElement("span");
    var productPrice = document.createElement("button");


    displayedItem.classList.add("displaySpace__item");
    displayedItem.setAttribute("data-id", this.displayId++);
    productName.classList.add("name");
    productName.append(product.name);
    displayedItem.append(productName);
    productPrice.classList.add("btn");
    productPrice.append(product.price);
    displayedList.append(displayedItem);
    displayedItem.append(productPrice);
  }
  // 상품 진열 제거
  function subtractProductInDisplayedSpace(id) {
    var displayedItem = document.querySelectorAll(".displaySpace__item");
    var targetIndex = Array.prototype.findIndex.call(displayedItem,(function (item) {
      return id === Number.parseInt(item.dataset.id);
    }));

    if(targetIndex === -1) {
      console.warn("일치하는 상품이 없습니다.");
      return false;
    } else {
      displayedItem[targetIndex].remove();
      var inventoryTargetIndex = this.inventory.findIndex(function (item) {
        return displayedItem[targetIndex].textContent === item.name;
      });

      this.inventory[inventoryTargetIndex].isSame++;
    }
  }
  // 재화 입력
  function clickInsertMoney() {
    var _this = this;
    document.querySelector(".insertMoney").addEventListener("click", function(e) {
      // if(e.target.className === "insertMoney__inputMoney")
      if(e.target.className == "insertMoney__btn") {
        var targetMoney = Number.parseInt(e.target.childNodes[0].textContent);
        _this.balance += targetMoney;
        document.querySelector(".insertMoney__cur__money--state").textContent = _this.balance;
      }
    });
  }

  //////////////////////////////////////////////////

  // id값으로 index찾기
  function findIndexById(id) {
    var targetIndex = this.inventory.findIndex(function (item) {
      return id === item.id;
    });
    return targetIndex;
  }
  // name값으로 index찾기
  function findIndexByName(product) {
    var targetIndex = this.inventory.findIndex(function (item) {
      return product.name === item.name;
    });
    return targetIndex;
  }
  // 상품 확인
  function isProduct(product) {
    return product instanceof Product;
  }
  // 숫자 확인(정수, 양수)
  function isNumber(number)  {
    return typeof number !== 'number' || isNaN(number) || number <= 0 || number - Math.floor(number) != 0 ;
  }

  return VendingMachine;
})();
