
const paymentItem = {}

const checkItem = (self) => {
  const itemList = document.querySelector("#vendingMachine .itemList ul").children;    
  for ( let i = 0; i < itemList.length; i++) {
    itemList[i].classList.remove("select");
  }
  self.classList.add("select");
  paymentItem.name = self.dataset.name;
  additionalProcess(false);
}

const checkCash = (self, division) => {
  const selectItem = document.querySelector("#vendingMachine .itemList ul li.select");
  const cashList = document.querySelector("#vendingMachine .paymentBox .cash ul").children;
  const paymentBox = document.querySelector("#vendingMachine .paymentBox");
  if (!selectItem) {
    alert("상품 선택이 먼저!");
    return;
  } else {
    for ( let i = 0; i < cashList.length; i++) {
      cashList[i].classList.remove("select");
    }
    if(division === "CASH") paymentBox.classList.add("isCash");
    else paymentBox.classList.remove("isCash");

    self.classList.add("select");
    paymentItem.division = division;
  }
};

const inputCash = _ => {
  const selectItem = document.querySelector("#vendingMachine .itemList ul li.select");
  const changesText = document.querySelector("#vendingMachine .changes .num");

  const itemList = VM1.getItemList();
  const itemName = selectItem.dataset.name;
  const itemOption = {};
  itemList.some( v => {
    if ( v.name === itemName ) {
      itemOption.price = v.price;
      return true;
    }
  }) 

  if (paymentItem.division === "CASH") { // 현금결제
    let input = document.querySelector("#vendingMachine .inputCash input");
    const changes = parseInt(input.value - itemOption.price);
    
    if ( changes < 0 ) {
      alert("금액 부족!");
      return;
    } else {
      editItem(selectItem, "GUEST");
      changesText.innerText = changes;
      input.value = changes;
    }
  } else { // 카드결제
    editItem(selectItem, "GUEST");  
    changesText.innerText = "카드결제";
  }
  
  // const paymentBox = document.querySelector("#vendingMachine .paymentBox");
  // const cashList = document.querySelector("#vendingMachine .paymentBox .cash ul").children;
  // paymentBox.classList.remove("isCash");
  // for ( let i = 0; i < cashList.length; i++) {
  //   cashList[i].classList.remove("select");
  // }

  alert(`${itemName} 반환!`);

  // if (paymentItem.division === "CASH") additionalProcess(true);
}

/*
const additionalProcess = opt => {
  // clearTimeout(returnChanges);
  console.log(opt);
  const listItem = document.querySelector("#vendingMachine .itemList ul li");
  const changes = document.querySelector("#vendingMachine .changes .num").innerText;
  const returnChanges = setTimeout(function() {
    alert(changes);
  }, 5000);

  if (opt === "false") {
    console.log("---"+opt);
    console.log("---"+returnChanges);
    // clearTimeout(returnChanges);
  }
  // listItem.addEventListener("click", funciton(){
  //   clearTimeout(returnChanges);
  //   console.log("???");
  // })
}
*/