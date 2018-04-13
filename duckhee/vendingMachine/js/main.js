var Product = (function(){

  var id = 0;

  function Product(name, price) {
    if(isStringName()) {
      try {
        throw new Error("name을 문자로 입력해주세요.");
      } catch (e) {
        alert(e.message);
        return false;
      }
    }
    if(isNumberPrice()) {
      try {
        throw new Error("price을 숫자(양수, 정수)로 입력해주세요.");
      } catch (e) {
        alert(e.message);
        return false;
      }
    }
    this.id = id++;
    this.name = name;
    this.price = price;
    this.totalQuantity = 0;
    this.soldQuantity = 0;
    this.status = false;

    function isNumberPrice ()  {
      return typeof price !== 'number' || isNaN(price) || price <= 0 || price - Math.floor(price) != 0 ;
    }

    function isStringName () {
      return typeof name !== 'string' || Object.prototype.toString.call(name) != '[object String]';
    }
  }

  return Product;

})();

var VendingMachine = (function(){
  function VendingMachine() {
    this.inventory = [];
    this.displayedSpace = [];
    this.displayedItemId = 0;
  }

  // 상품 등록하기
  VendingMachine.prototype.registerProduct = function (product) {
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

  // 등록된 상품 삭제하기
  VendingMachine.prototype.delelteRegisterProduct = function (product) {
    var targetIndex = this.inventory.findIndex(function (item) {
      return product.name === item.name;
    });

    console.log(targetIndex);

    this.inventory.splice(targetIndex, 1);
  }

  // 등록된 상품 보여주기
  VendingMachine.prototype.showRegisteredInvetory = function () {
    console.log(this.inventory);
    return this.inventory;
  }

  // 상품 재고 추가하기
  VendingMachine.prototype.addQuantity = function (product, quantity) {
    if(isProduct()) {
      console.warn("상품(" + product.name + ")이 없습니다.");
      return false;
    }

    if(isNumber(quantity)) {
      console.warn("재고 수량이(" + quantity + ")이 잘못 입력되었습니다.(양수, 정수로 입력해주세요)");
      return false;
    }

    var targetIndex = this.inventory.findIndex(function (item) {
      return product.name === item.name;
    });

    var curTotalQuantity = this.inventory[targetIndex].totalQuantity + quantity;

    if(curTotalQuantity >= 30) {
      console.warn("재고가 30개 이상은 들어가지 않습니다. 현 재고 : 30개 입니다.");
      this.inventory[targetIndex].totalQuantity = 30;
    } else {
      this.inventory[targetIndex].totalQuantity = curTotalQuantity;
    }
    console.log("현 재고 : " + this.showQuantity(product));
  }

  // 상품 재고 빼기
  VendingMachine.prototype.subtractQuantity = function (product, quantity) {
    if(isProduct()) {
      console.warn("상품(" + product.name + ")이 없습니다.");
      return false;
    }

    if(isNumber(quantity)) {
      console.warn("재고 수량이(" + quantity + ")이 잘못 입력되었습니다.(양수, 정수로 입력해주세요)");
      return false;
    }

    var targetIndex = this.inventory.findIndex(function (item) {
      return product.name === item.name;
    });

    var curTotalQuantity = this.inventory[targetIndex].totalQuantity - quantity;

    if(curTotalQuantity <= 0) {
      console.warn("재고가 0개 이하입니다. 현 재고 : 0개 입니다.");
      this.inventory[targetIndex].totalQuantity = 0;
    } else {
      this.inventory[targetIndex].totalQuantity = curTotalQuantity;
    }
    console.log("현 재고 : " + this.showQuantity(product));
  }

  // 상품 재고 확인하기
  VendingMachine.prototype.showQuantity = function (product) {
    return product.totalQuantity;
  }

  function isProduct(product) {
    return product instanceof Product;
  }
  function isNumber(number)  {
    return typeof number !== 'number' || isNaN(number) || number <= 0 || number - Math.floor(number) != 0 ;
  }

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
  }

  return VendingMachine;

})();

var coke = new Product("coke", 500);
var sprite = new Product("sprite", 1000);
var fanta = new Product("fanta", 700);

var vm = new VendingMachine();

vm.registerProduct(coke);
vm.registerProduct(sprite);
vm.registerProduct(fanta);

vm.addQuantity(sprite, 25);

vm.showRegisteredInvetory();

vm.addDisplayedSpace(sprite, 1);
vm.addDisplayedSpace(sprite, 3);
vm.addDisplayedSpace(sprite, 5);
vm.addDisplayedSpace(sprite, 15);



// vm.delelteRegisterProduct(coke);
// vm.showRegisteredInvetory();

// vm.addQuantity(sprite, 20);
// vm.showQuantity(sprite);
