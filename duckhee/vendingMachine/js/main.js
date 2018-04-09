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
    this.inventory.map(function (item, index){
      if(product.name === item.name) {
        try {
          throw new Error("이름(" + item.name + ")이 같은 상품이 있습니다.");
        } catch (e) {
          alert(e.message);
          return false;
        }
      }
    });

    this.inventory.push(product);
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
      try {
        throw new Error("Product(" + product.name + ")이 없습니다.");
      } catch (e) {
        alert(e.message);
        return false;
      }
    }
    var targetIndex = this.inventory.findIndex(function (item) {
      return product.name === item.name;
    });

    this.inventory[targetIndex].totalQuantity += quantity;
  }

  function isProduct(product) {
    return product instanceof Product;
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

vm.addQuantity(sprite, 100);
vm.showRegisteredInvetory();
