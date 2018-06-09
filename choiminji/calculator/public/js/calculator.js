var Calculator = (function() {
  var EXPRESSION = [];
  
  var KEY_TYPE = {
    number : "number",
    operator : "operator",
    ac : "AC",
    equal : "="
  };
  var OPERATOR_BUTTON = {
    plus : "+",
    minus : "-",
    multiply : "*",
    division : "/"
  };

  var temporaryExpression = "";
  var clickedKeyType = "";
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
    clickedKeyType = checkKeyType(key);
    console.log("keyType ---", clickedKeyType);

    switch (clickedKeyType){
      case KEY_TYPE.ac :
        clearAll();
        printDisplay();
        break;
      case KEY_TYPE.equal :
        getResult();
        break;
      case KEY_TYPE.number :
        var invalid = checkDuplicate();
        if (invalid) {
          inputNumber(key);
          printDisplay();
        }
        break;
      default : // KEY_TYPE.operator
        var invalid = checkDuplicate();
        if (invalid) {
          addExpression(key);
          printDisplay();
        }
    }
  };

  var checkKeyType = function(key) {
    if (key === null) {
      warn("빈값입니다.");
      return false;
    }

    if ( key === KEY_TYPE.ac ) {
      return KEY_TYPE.ac;
    } else if ( key === KEY_TYPE.equal ) {
      return KEY_TYPE.equal;
    } else if ( validation.isNumber(Number(key)) ) {
      return KEY_TYPE.number;
    } else {
      return KEY_TYPE.operator;
    }
  };

  var inputNumber = function(key) {
    temporaryExpression += Number(key);
  };

  var addExpression = function(key) {
    EXPRESSION.push(temporaryExpression, key);
    temporaryExpression = "";
  };

  var checkDuplicate = function() {
    if (clickedKeyType === KEY_TYPE.operator && temporaryExpression === "") {
      return false;
    } else {
      return true;
    }
  }

  var printDisplay = function() {
    var expression = EXPRESSION.slice();
    var expressionCurr = temporaryExpression;

    var expressionHTML = container.querySelector(".calculation");
    var expressionCurrHTML = container.querySelector(".calculation_curr");

    expressionHTML.innerText = expression.join(" ");
    expressionCurrHTML.innerText = expressionCurr;
  }
  

  var clearAll = function() {
    EXPRESSION = [];
    temporaryExpression = "";
  };  

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