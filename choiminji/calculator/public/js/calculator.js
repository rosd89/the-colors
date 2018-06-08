var Calculator = (function() {
  var EXPRESSION = [];
  
  var BUTTON_TYPE = {
    number : "number",
    operator : "operator",
    ac : "AC",
    equal : "equal"
  };
  var AC_BUTTON = "AC";
  var EQUAL_BUTTON = "=";
  var OPERATOR_BUTTON = {
    plus : "+",
    minus : "-",
    multiply : "*",
    division : "/"
  };

  var temporaryExpression = "";
  var container;

  var addClickEvent = function() {
    var clickedButton = container.querySelectorAll(".button ul li");
    
    clickedButton.forEach(function(v, i) {
      clickedButton[i].addEventListener("click", function(e) {
        var target = e.target;
        var key = target.getAttribute("data-key");

        clickButton(key)
      })
    })
  };

  var clickButton = function(key) {
    if (key === null) warn("빈값입니다.");

    switch (key){
      case AC_BUTTON :
        clearAll();
        break;
      case EQUAL_BUTTON :
        getResult();
        break;
      default :
        var keyType = validation.isNumber(Number(key)) ? BUTTON_TYPE.number : BUTTON_TYPE.operator;
        var invalid;

        if (EXPRESSION.length > 0) invalid = checkDuplicate(keyType);
        else invalid = false;
        
        if (!invalid) {
          var value = checkValue(key, keyType);
          if (value) addExpression(value);
          // printDisplay(value); 
        } else {
          warn("같은 타입의 버튼은 한번씩만!");
          return;
        }
        
    }
  };

  var checkDuplicate = function(keyType) {
    var lastElemType = ( validation.isNumber(Number(EXPRESSION[EXPRESSION.length -1])) ) ? BUTTON_TYPE.number : BUTTON_TYPE.operator;
    console.log("checkDuplicate---",lastElemType, keyType)
    return lastElemType === keyType;
  }

  var checkValue = function(key, keyType) {
    // if ( EXPRESSION.length === 0 && keyType === BUTTON_TYPE.operator ) {
    //   warn("첫 입력은 숫자!");
    //   return false;
    // }

    switch (keyType) {
      case BUTTON_TYPE.operator :
        return {
          prevExpression : temporaryExpression,
          currExpression : key
        };
        break;
      default : // BUTTON_TYPE.number
        temporaryExpression += Number(key);
        return false;
    }
  };

  var addExpression = function(value) {
    console.log("value : ", typeof value, value);
    EXPRESSION.push(value["prevExpression"], value["currExpression"]);
    console.log(EXPRESSION, value);
    temporaryExpression = "";
  };

  var printDisplay = function(key) {
    var expression = EXPRESSION.slice();
    var expressionCurr = (validation.isNumber(key)) ? "" : expression.pop();

    var expressionHTML = container.querySelector(".calculation");
    var expressionCurrHTML = container.querySelector(".calculation_curr");

    expressionHTML.innerText = expression.join(" ");
    expressionCurrHTML.innerText = expressionCurr;
  }

  var clearAll = function() {  };  
  var getResult = function() {  };

  return function(target){
    container = document.querySelector(target);
    addClickEvent();
  };
})();

var warn = function(msg) {
  var msgBox = document.querySelector("#msg");
  msgBox.innerText = msg;
  console.log(msg);
};


var validation = (function() {
  var isObject = function(obj) {
    return obj !== null && typeof obj === 'object' && obj.toString() === '[object Object]';
  }

  var isString = function(str) {
    return str !== null && typeof str === 'string'
  }

  var isArr = function(arr) {
    return arr !== null && typeof arr === 'object' && Array.isArray(arr);
  }
  
  var isBoolean = function(boolean) {
    return boolean !== null && typeof boolean === 'boolean';
  }

  var isNumber = function(num) {
    return num != null && typeof num === 'number' && !isNaN(num);
  }

  return {
    isObject : isObject,
    isString : isString,
    isArr : isArr,
    isBoolean : isBoolean,
    isNumber : isNumber
  }
})();