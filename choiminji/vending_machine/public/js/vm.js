const Items = (() => {
	const ITEM_LIST = new Map();

	return class {
		constructor () {
			//
		}
		add (itemName, option) {
			if ( !itemName ) throw "상품명 누락";
			if ( typeof option !== "object") throw "상품 옵션 형식 오류";
			if ( !option.PRICE ) throw "가격은 필수옵션!"
			else if ( option.PRICE && isNaN(option.PRICE) ) throw "가격은 숫자만 입력하기";
			if ( isNaN(option.COUNT) ) throw "재고량은 숫자만 입력하기";

			const defaultOption = {
				CONDITION : "ICE",
				COUNT : 0,
				SHOW : false
			};

			const itemOption = Object.assign(defaultOption, option);

			if ( ITEM_LIST.get(itemName) ) throw "중복된 상품이 있습니다. 상품명을 다시 입력해주세요";
			ITEM_LIST.set(itemName, itemOption);
		}
	}
})();

const VM1 = new Items();
