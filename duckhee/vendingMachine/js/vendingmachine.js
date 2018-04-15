var VendingMachine = (function(){
  function VendingMachine() {
    this.inventory = [];
    this.displayId = 0;
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

  /*
  // 진열 공간에 상품 추가
  VendingMachine.prototype.addDisplayedSpace = function (product, quantity, isHot) {
    var newProduct = Object.assign({}, product);
    var quantity = typeof quantity !== 'undefined' ? quantity : 0;

    if(quantity >= product.totalQuantity || quantity < 0) {
      console.warn('제품 수량을 정확히 입력해주세요.(0보다 작거나 창고 재고('+product.totalQuantity +'개)가 부족합니다.)');
      return false;
    }

    product.totalQuantity = product.totalQuantity -  quantity;

    // ice, hot 속성은 기본값으로 ice로
    var isHot = typeof isHot !== 'undefined' ? isHot : false;
    var isCheckedSpaceLength = (this.displayedSpace.length >= 30 ? false : true);

    if(isCheckedSpaceLength) {
      delete newProduct.totalQuantity;
      newProduct.id = this.displayedItemId++;
      newProduct.quantity = quantity;
      newProduct.isHot = isHot;
      this.displayedSpace.push(newProduct);
    } else {
      console.warn('진열 공간(30개)이 꽉 찼습니다.');
    }
  }

  // 진열 공간에 상품 제거
  VendingMachine.prototype.removeDisplayedSpace = function (id) {
    var targetIndex = this.displayedSpace.findIndex(function (item) {
      return id === item.id;
    });

    if(targetIndex === -1) {
      console.warn('삭제할 아이템이 없습니다.(id값을 제대로 입력해주세요)');
      return;
    }

    this.displayedSpace.splice(targetIndex, 1);
  }

  // 진열 공간에 상품 재고 추가
  VendingMachine.prototype.addQuantityDisplayedItem = function (id, quantity) {
    var targetIndex = this.displayedSpace.findIndex(function (item) {
      return id === item.id;
    });

    if(targetIndex === -1) {
      console.warn('재고 추가할 아이템이 없습니다.(id값을 제대로 입력해주세요)');
      return;
    }

    var quantity = typeof quantity !== 'undefined' ? quantity : 0;
    var thisItemName = this.displayedSpace[targetIndex].name;
    var inventoryItemIndex = this.inventory.findIndex(function(i) {
      return i.name === thisItemName;
    });
    var product = this.inventory[inventoryItemIndex];

    if(quantity > product.totalQuantity || quantity < 0) {
      console.warn('제품 수량을 정확히 입력해주세요.(0보다 작거나 창고 재고('+product.totalQuantity +'개)가 부족합니다.)');
      return false;
    }

    product.totalQuantity = product.totalQuantity -  quantity;
    this.displayedSpace[id].quantity += quantity;
  }

  // 진열 공간에 상품 재고 빼기
  VendingMachine.prototype.subtractQuantityDisplayedItem = function (id, quantity) {
    var targetIndex = this.displayedSpace.findIndex(function (item) {
      return id === item.id;
    });

    if(targetIndex === -1) {
      console.warn('재고 추가할 아이템이 없습니다.(id값을 제대로 입력해주세요)');
      return;
    }

    var quantity = typeof quantity !== 'undefined' ? quantity : 0;
    var thisItemName = this.displayedSpace[targetIndex].name;
    var inventoryItemIndex = this.inventory.findIndex(function(i) {
      return i.name === thisItemName;
    });
    var product = this.inventory[inventoryItemIndex];

    if(quantity > this.displayedSpace[id].quantity) {
      console.warn('제품 수량을 정확히 입력해주세요.(입력하신 재고보다 진열 된 상품 수량('+ this.displayedSpace[id].quantity +')이 적습니다.)');
      return false;
    }

    product.totalQuantity = product.totalQuantity + quantity;
    this.displayedSpace[id].quantity -= quantity;
  }

  // 진열 공간 확인
  VendingMachine.prototype.showDisplayedSpace = function (product) {
    console.log(this.displayedSpace);
  }

  // 진열 공간 음료 ice, hot 속성 변경
  VendingMachine.prototype.changeisHot = function (id) {
    var targetIndex = this.displayedSpace.findIndex(function (item) {
      return id === item.id;
    });

    if(targetIndex === -1) {
      console.warn('변경할 음료가 없습니다.(id값을 제대로 입력해주세요)');
      return;
    }

    this.displayedSpace[targetIndex].isHot = !this.displayedSpace[targetIndex].isHot;
  }*/

  return VendingMachine;

})();
