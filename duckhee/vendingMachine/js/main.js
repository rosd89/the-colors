

var coke = new Product("coke", 500);
var sprite = new Product("sprite", 1000);
var fanta = new Product("fanta", 700);
var hotsix = new Product("hotsix", 800);
var coffee = new Product("coffee", 300);

var vm = new VendingMachine();

vm.registerProduct(coke);
vm.registerProduct(sprite);
vm.registerProduct(fanta);
vm.registerProduct(hotsix);
vm.registerProduct(coffee);

vm.addQuantityInInventory(coke, 29);
vm.addQuantityInInventory(sprite, 29);
vm.addQuantityInInventory(fanta, 29);
vm.addQuantityInInventory(hotsix, 29);
vm.addQuantityInInventory(coffee, 29);


vm.addProductInDisplayedSpace(coke);
console.log(vm.showInvetory());
