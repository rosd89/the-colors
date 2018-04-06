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
        throw new Error("이름(" + item.name + ")이 같은 상품이 있습니다.");
      }
    });

    this.inventory.push(product);
  }

  VendingMachine.prototype.showInventory = function () {
    console.log(this.inventory);
    return this.inventory;
  }

  return VendingMachine;

})();

var coke = new Product("coke", 500);
var sprite = new Product("sprite", 1000);

var vm = new VendingMachine();

vm.registerProduct(coke);
vm.registerProduct(sprite);

vm.showInventory();
