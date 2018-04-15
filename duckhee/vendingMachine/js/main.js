

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

vm.addQuantityInInventory(coke, 29);
vm.addQuantityInInventory(sprite, 29);
vm.addQuantityInInventory(fanta, 29);
vm.addQuantityInInventory(hotsix, 29);
vm.addQuantityInInventory(coffee, 29);
vm.addQuantityInInventory(coffee2, 29);
vm.addQuantityInInventory(coffee3, 29);

vm.addProductInDisplayedSpace(coke);
vm.addProductInDisplayedSpace(coke);
vm.addProductInDisplayedSpace(coke);
vm.addProductInDisplayedSpace(coke);
vm.addProductInDisplayedSpace(coke);
vm.addProductInDisplayedSpace(fanta);
vm.addProductInDisplayedSpace(fanta);
vm.addProductInDisplayedSpace(fanta);
vm.addProductInDisplayedSpace(fanta);
vm.addProductInDisplayedSpace(fanta);
vm.addProductInDisplayedSpace(sprite);
vm.addProductInDisplayedSpace(sprite);
vm.addProductInDisplayedSpace(sprite);
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
vm.addProductInDisplayedSpace(coffee);
vm.addProductInDisplayedSpace(coffee);
vm.addProductInDisplayedSpace(coffee2);
vm.addProductInDisplayedSpace(coffee2);
vm.addProductInDisplayedSpace(coffee2);
vm.addProductInDisplayedSpace(coffee2);
vm.addProductInDisplayedSpace(coffee2);
vm.addProductInDisplayedSpace(coffee3);
vm.addProductInDisplayedSpace(coffee3);
vm.addProductInDisplayedSpace(coffee3);
vm.addProductInDisplayedSpace(coffee3);
vm.addProductInDisplayedSpace(coffee3);
console.log(vm.showInvetory());
