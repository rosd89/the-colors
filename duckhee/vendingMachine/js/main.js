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

    var targetProduct = this.inventory[targetIndex];
    var curTotalQuantity = targetProduct.totalQuantity + quantity;

    if(curTotalQuantity >= 30) {
      console.warn("재고가 30개 이상은 들어가지 않습니다. 현 재고 : 30개 입니다.");
      targetProduct.totalQuantity = 30;
    } else {
      targetProduct.totalQuantity = curTotalQuantity;
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

    var targetProduct = this.inventory[targetIndex];
    var curTotalQuantity = targetProduct.totalQuantity - quantity;

    if(curTotalQuantity <= 0) {
      console.warn("재고가 0개 이하입니다. 현 재고 : 0개 입니다.");
      targetProduct.totalQuantity = 0;
    } else {
      targetProduct.totalQuantity = curTotalQuantity;
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

  return VendingMachine;

})();

var coke = new Product("coke", 500);
var sprite = new Product("sprite", 1000);

var vm = new VendingMachine();

vm.registerProduct(coke);
vm.registerProduct(sprite);

vm.showRegisteredInvetory();

vm.delelteRegisterProduct(coke);
vm.showRegisteredInvetory();

vm.addQuantity(sprite, 20);
vm.showRegisteredInvetory();

vm.showQuantity(sprite);
