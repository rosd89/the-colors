// 04.06 pm 5:07 ~ pm 6:30
const CONDITION = { ICE: "ICE", HOT: "HOT" };

class Item {
	constructor(name, price, condition, count, display) {
		this.name = name;
		this.price = price;
		this.condition = condition;
		this.count = count;
		this.display = display;
	}
};

const Inventory = (()=> {
	const ITEM_LIST = [];

	return class {
		add (name, price, condition = CONDITION.ICE, count = 0, display = false) {
			if ( !name ) {
				vmError("상품명 누락");
				return;
			}
			if ( !price ) {
				vmError("가격은 필수옵션!");
				return;
			} else if ( price && isNaN(price) ) { 
				vmError("가격은 숫자만 입력하기");
				return;
			}
			if ( isNaN(count) ) {
				vmError("재고량은 숫자만 입력하기");
				return;
			}
			ITEM_LIST.forEach(v => {
				if ( v.name === name ) {
					vmError("중복된 상품이 있습니다. 상품명을 다시 입력해주세요");
					return;
				}
			})
	
			const item = new Item(name, price, condition, count, display);
			ITEM_LIST.push(item);
			console.log(ITEM_LIST);
		}
	}
})();


const vmError = msg => {
	console.log("Vending Machine Error : "+msg);
	// ui 작업 시 추가
}

const VM1 = new Inventory();
