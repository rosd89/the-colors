var Product = (function(){
  function Product(name, price) {
    if(typeof name !== 'string' || Object.prototype.toString.call(name) != '[object String]') {
      try {
        throw new Error("name을 문자로 입력해주세요.");
      } catch (e) {
        alert(e.message);
        return false;
      }
    }
    if(typeof price !== 'number' || Object.prototype.toString.call(price) != '[object Number]' || isNaN(price)) {
      try {
        throw new Error("price을 숫자로 입력해주세요.");
      } catch (e) {
        alert(e.message);
        return false;
      }
    }
    this.name = name;
    this.price = price;
    this.totalQuantity = "";
    this.soldQuantity = "";
    this.status = false;
  }

  return Product;

})();

var VendingMachine = (function(){
  function VendingMachine() {
    this.inventory = [];
  }

  VendingMachine.prototype.addProduct = function (product) {
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

vm.addProduct(coke);
vm.addProduct(sprite);

vm.showInventory();
