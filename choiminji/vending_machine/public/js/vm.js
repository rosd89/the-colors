const CONDITION = { ICE: "ICE", HOT: "HOT" };
const DISPLAY_MAX = 30;

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
		optionValidation (option) {
			let invalid = true;

			if ( typeof option !== "object") {
				vmError("option 입력 형식 오류!");
				invalid = false;
				return;
			}

			if ( option.price && isNaN(option.price) ) { 
				vmError("가격은 숫자만 입력하기");
				invalid = false;
				return;
			}

			if ( option.count && isNaN(option.count) ) {
				vmError("재고량은 숫자만 입력하기");
				invalid = false;
				return;
			}
			

			let displayCount = 0;
			ITEM_LIST.forEach(v => {
				if (v.display) displayCount++;
			})

			if (displayCount > DISPLAY_MAX) {
				vmError("상품 진열을 최대 "+DISPLAY_MAX+"개입니다");
				invalid = false;
				return;
			}

			if (invalid) return invalid;
		}

		add (name, price = 0, condition = CONDITION.ICE, count = 0, display = false) {
			if ( !name ) {
				vmError("상품명 누락");
				return;
			}

			let duplication = false;
			ITEM_LIST.some(v => {
				if ( v.name === name ) duplication = true;
			})

			if ( duplication ) {
				vmError("중복된 상품이 있습니다. 상품명을 다시 입력해주세요");
				return;
			}

			const itemOption = {
				price : price,
				condition : condition,
				count : count,
				display: display
			};

			const invalid = this.optionValidation(itemOption);
			if ( invalid ) {
				const item = new Item(name, price, condition, count, display);
				ITEM_LIST.push(item);
			}
			
			console.log("ITEM_LIST :");
			console.log(ITEM_LIST);
		}

		edit (name, option) {
			const invalid = this.optionValidation(option);
			if (invalid) {
				ITEM_LIST.some(v => {
					if ( v.name === name ) {
						if (option.price) v.price = option.price;
						if (option.condition) v.condition = option.condition;
						if (option.count) v.count = option.count;
						if (option.display) v.display = option.display;
					}
				})
			}
			console.log(ITEM_LIST);
		}
	}
})();


const vmError = msg => {
	console.log("Vending Machine Error : "+msg);
	// ui 작업 시 추가
}

const VM1 = new Inventory();
VM1.add("item1", "800");
