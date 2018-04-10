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

const Inventory = ( _ => {
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

		render () {
			console.log(ITEM_LIST);
			let listHTML = "";
			ITEM_LIST.forEach( (v,k) => {
				listHTML += `<li class="col">
	<div class="cell w25 name">${v.name}</div>
	<div class="cell w20 price"><input type="text" value="${v.price}"></div>
	<div class="cell w15 condition">
		<select>
			<option value="ICE" ${(v.condition === "ICE")?"selected='selected'":""}>ICE</option>
			<option value="HOT" ${(v.condition === "HOT")?"selected='selected'":""}>HOT</option>
		</select>
	</div>
	<div class="cell w15 count"><input type="text" value="${v.count}"></div>
	<div class="cell w15 display">
		<select>
			<option value="true" ${v.display === "true"?"selected='selected'":""}>진열O</option>
			<option value="false" ${v.display === "false"?"selected='selected'":""}>진열X</option>
		</select>
	</div>
	<div class="cell w10 btn"><button class="edit" data-name="${v.name}" onclick="editItem(this);">수정</button></div>
</li>`.trim();
			})

			document.querySelector("#output .content").innerHTML = listHTML;

		}
		
		add (name, price = 0, condition = CONDITION.ICE, count = 0, display = false) {
			if ( !name ) {
				vmError("상품명 누락");
				return;
			}

			const duplication = ITEM_LIST.some(v => {
				if ( v.name === name ) return true;
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

			this.render();
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

						return true;
					}
				})
			}
			this.render();
		}
	}
})();


const vmError = msg => {
	console.log("Vending Machine Error : "+msg);
	
	const errorBox = document.querySelector("#errorBox");
	errorBox.classList.add("on");
	errorBox.innerText = msg;
	setTimeout( _ => {
		errorBox.classList.remove("on");
		errorBox.innerText = "Error Message";
	}, 3000)
}
