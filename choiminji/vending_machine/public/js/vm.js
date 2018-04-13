const CONDITION = { ICE: "ICE", HOT: "HOT" };
const DIVISION = { GUEST: "GUEST", ADMIN: "ADMIN"};
const INCREASE = { PLUS: "PLUS", MINUS: "MINUS"};
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
	const ITEM_LOG = [];

	return class {
		optionValidation (option) {
			let invalid = true;

			if ( typeof option !== "object") {
				vmError("option 입력 형식 오류!");
				invalid = false;
				return;
			}
			/*  
			재고 목록에서 삭제 후 검색, 등록
			edit에서 재고량, 가격 수정했을 때 유효성 검사... !!! 
			*/
			if ( isNaN(option.price) || Number.isInteger(option.price) || option.price < 0 || option.price - Math.floor(option.price) != 0 ) {
				console.log("isNaN : " + isNaN(option.price));
				console.log("integer : " + !Number.isInteger(option.price));
				console.log("<0 : " + option.price < 0);
				console.log( option.price - Math.floor(option.price));
				vmError("가격은 0보다 큰 정수 값!");
				invalid = false;
				return;
			}

			if ( isNaN(option.count) || Number.isInteger(option.count) || option.count < 0 || option.count - Math.floor(option.count) > 0 ){
				vmError("재고량은 0보다 큰 정수 값!");
				invalid = false;
				return;
			} 

			let displayCount = 0;
			ITEM_LIST.forEach(v => {
				if (v.display) displayCount++;
			})

			if (displayCount > DISPLAY_MAX) {
				vmError("상품 진열을 최대 "+DISPLAY_MAX+"개!");
				invalid = false;
				return;
			}

			if (invalid) return invalid;
		}

		render () {
			console.log(ITEM_LIST);
			console.log(ITEM_LOG);

			let listHTML = "";
			ITEM_LIST.forEach( (v,k) => {
				listHTML += `
<li class="col">
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
	<div class="cell w10 btn"><button class="edit" data-name="${v.name}" onclick="editItem(this,'${DIVISION.ADMIN}');">수정</button></div>
</li>`.trim();
			})

			document.querySelector("#output .content ul").innerHTML = listHTML;

			let logHTML = "";
			ITEM_LOG.forEach( v => {
				logHTML += `
<li class="col">
	<div class="cell w25">${v.name}</div>
	<div class="cell w25">${v.price} | ${v.condition} | ${v.display}</div>
	<div class="cell w15">${v.count} | ${v.increase}</div>
	<div class="cell w20">${v.division}</div>
	<div class="cell w15">${v.date}</div>
</li>`.trim();
			})
			document.querySelector("#log .content ul").innerHTML = logHTML;

		}
		
		add (name, price = 0, condition = CONDITION.ICE, count = 0, display = false) {
			if ( !name ) {
				vmError("상품명 누락!");
				return;
			}

			const duplication = ITEM_LIST.some(v => {
				if ( v.name === name ) return true;
			})

			if ( duplication ) {
				vmError("중복된 상품 존재!");
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
				const item = new Item(name, Number(price), condition, Number(count), display);
				
				ITEM_LIST.push(item);
				this.search(item.name);
				this.addLog(item);
			}
			
			this.render();
		}

		edit (name, option) {
			const invalid = this.optionValidation(option);
			const compareCount = (prev, curr) => {
				if (prev > curr) return -(prev - curr);
				else return curr-prev;
			}
			let changeLogCount = 0;

			if (invalid) {
				ITEM_LIST.some(v => {
					if ( v.name === name ) {
						if ( !Number(option.count) && option.division === DIVISION.ADMIN ) {
							this.delete(name);
						} else {
							changeLogCount = compareCount(v.count, option.count);

							v.price = Number(option.price);
							v.condition = option.condition;
							v.count = Number(option.count);
							v.display = option.display;
						}
						return true;
					}
				})

				const toLogOption = option;
				toLogOption.name = name;
				toLogOption.count = changeLogCount;
				toLogOption.increase = (changeLogCount > 0) ? INCREASE.PLUS : INCREASE.MINUS;
				
				this.addLog(toLogOption);
				this.search(name);
			}
			
			this.render();
		}
		
		delete (name) {
			const thisIndex = ITEM_LIST.some( (v, k) => {
				if (v.name === name) {
					return k;
				}
			});
			ITEM_LIST.splice(Number(thisIndex),1);
		}

		search (name) {
			console.log("search");
			const thisCount = ITEM_LIST.forEach( v => {
				if (v.name === name ) return v.count;
			})
			console.log(name, thisCount);
			document.querySelector("#output .notice").innerHTML = `[ <strong>${name}</strong> ] -- 재고 <strong>${(thisCount) ? thisCount : 0}</strong>`;
		}

		addLog (item) {
			const today = new Date();
			if (item.count){
				ITEM_LOG.push({
					name: item.name, 
					price: item.price, 
					condition: item.condition, 
					count: item.count, 
					increase : (item.increase) ? item.increase : INCREASE.PLUS,
					display: item.display, 
					division: DIVISION.ADMIN, 
					date: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
				});
			}
		}
	}
})();


const vmError = msg => {
	console.log("Vending Machine Error : "+msg);
	
	const $errorMsg = document.querySelector("#errorMsg");
	$errorMsg.classList.add("on");
	$errorMsg.innerText = msg;
	setTimeout( _ => {
		$errorMsg.classList.remove("on");
		$errorMsg.innerText = "Error Message";
	}, 3000)
}
