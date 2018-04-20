

var coke = new Product("coke", 500);
var sprite = new Product("sprite", 1000);
var fanta = new Product("fanta", 700);
var hotsix = new Product("hotsix", 800);
var coffee = new Product("coffee", 300);
var coffee2 = new Product("coffee2", 200);
var coffee3 = new Product("coffee3", 200);

var vm = new VendingMachine();

vm.registerProduct(coke);
vm.registerProduct(sprite);
vm.registerProduct(fanta);
vm.registerProduct(hotsix);
vm.registerProduct(coffee);
vm.registerProduct(coffee2);
vm.registerProduct(coffee3);

vm.addQuantityInInventory(coke, 3);
vm.addQuantityInInventory(sprite, 3);
vm.addQuantityInInventory(fanta, 3);
vm.addQuantityInInventory(hotsix, 3);
vm.addQuantityInInventory(coffee, 3);
vm.addQuantityInInventory(coffee2, 3);
vm.addQuantityInInventory(coffee3, 3);

vm.addProductInDisplayedSpace(coke);
vm.addProductInDisplayedSpace(coke);
vm.addProductInDisplayedSpace(sprite);
vm.addProductInDisplayedSpace(sprite);
vm.addProductInDisplayedSpace(hotsix);
vm.addProductInDisplayedSpace(hotsix);
vm.addProductInDisplayedSpace(hotsix);
vm.addProductInDisplayedSpace(hotsix);
vm.addProductInDisplayedSpace(hotsix);
vm.addProductInDisplayedSpace(coffee);
vm.addProductInDisplayedSpace(coffee);
vm.addProductInDisplayedSpace(coffee);

console.log(vm.showInvetory());

vm.clickInsertMoney();
vm.selectedItemPayment();
vm.returnMoney();
vm.submitRegister();
vm.submitDisplayedProduct();
