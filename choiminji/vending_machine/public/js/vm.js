// 04.06 pm 5:07 ~ pm 6:30
const CONDITION = ["ICE", "HOT"];

class Item {
	constructor(name, price, condition, count, display) {
		this.name = name;
		this.price = price;
		this.condition = condition;
		this.count = count;
		this.display = display;
	}

	getPrice () { return this.price; }
	getCondition () { return this.condition; }
	getCount () { return this.count; }
	getDisplay () { return this.display; }
};

class Inventory {
	constructor () {
		this.ITEM_LIST = [];
	}

	add (name, price, condition = CONDITION[0], count = 0, display = false) {
		if ( !name ) vmError("상품명 누락");
		if ( !price ) vmError("가격은 필수옵션!");
		else if ( price && isNaN(price) ) vmError("가격은 숫자만 입력하기");
		if ( isNaN(count) ) vmError("재고량은 숫자만 입력하기");

		const item = new Item(name, price, condition, count, display);
		console.log(item);

		this.ITEM_LIST.forEach(v => {
			if ( v.name === name ) vmError("중복된 상품이 있습니다. 상품명을 다시 입력해주세요");
		})

		this.ITEM_LIST.push(item);
		console.log(this.ITEM_LIST);
	}
}

const vmError = msg => {
	// try {
	// 	throw new Error(msg);
	// } catch (e) {
	// 	console.log("Vending Machine Error : "+e);
	// }
}

const VM1 = new Inventory();
