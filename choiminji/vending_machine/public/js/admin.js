const VM1 = new Inventory();

// admin add event
const submitBtn = document.querySelector("#submit");
const inputContent = document.querySelector("#input .content");
submitBtn.addEventListener("click", e => {
    VM1.add(
        inputContent.querySelector(".name input").value, 
        inputContent.querySelector(".price input").value, 
        inputContent.querySelector(".condition select").value, 
        inputContent.querySelector(".count input").value, 
        inputContent.querySelector(".display select").value
    );
});

const editItem = (_ => {
    const adminEdit = self => {

        const item = self.parentElement.parentElement;
        const itemName = self.dataset.name;
        const itemOption = {
            price : item.querySelector(".price input").value, 
            condition : item.querySelector(".condition select").value, 
            count : item.querySelector(".count input").value, 
            display : item.querySelector(".display select").value,
            division : DIVISION.ADMIN
        }
        VM1.edit(itemName, itemOption);
    };
    const guestEdit = self => {
        const itemName = self.dataset.name;
        const itemOption = {};
        const itemList = VM1.getItemList();
        itemList.some( v => {
            if ( v.name === itemName ) {
            itemOption.price = v.price;
            itemOption.condition = v.condition;
            itemOption.count = v.count - 1;
            itemOption.display = v.display;
            return true;
            }
        });

        VM1.edit(itemName, itemOption);
    }
    return (self, division) => {
        if (division === DIVISION.ADMIN) adminEdit(self);
        else guestEdit(self);
    };
})();

const searchBtn = document.querySelector("#output .search button");
searchBtn.addEventListener("click", e => {
    const searchName = document.querySelector("#output .search input").value;
    if (!searchName.trim()) { 
        vmError("검색어 입력하기");
        return;
    }
    VM1.check(searchName);
})
