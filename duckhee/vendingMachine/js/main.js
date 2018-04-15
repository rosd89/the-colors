

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
