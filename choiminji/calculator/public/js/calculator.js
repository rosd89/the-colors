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
  var ETC_BUTTON = {
    esc : "Escape",
    enter : "Enter",
    backspace : "Backspace"
  }

  var temporaryExpression = "";
  var clickedKeyType = "";
  var container;

  var addClickEvent = function() {
    var clickedButton = container.querySelectorAll(".button ul li");
    
    clickedButton.forEach(function(v, i) {
      clickedButton[i].addEventListener("click", function(event) {
        var target = event.target;
        var key = target.getAttribute("data-key");
        clickedKeyType = checkKeyType(key);

        clickButton(key, clickedKeyType)
      })
    })
  };

  var addKeyEvent = function() {
    var inputBox = container.querySelector(".calculation_curr input");
    
    inputBox.onkeydown = function(event) {
      var keyValue = event.key;
      clickedKeyType = checkKeyType(keyValue);

      if ( clickedKeyType ) clickButton(keyValue, clickedKeyType);

      event.preventDefault();
    };
  }

  var checkKeyType = function(key) {
    if (key === null) {
      warn("빈값입니다.");
      return false;
    }

    if ( key === KEY_TYPE.ac || key === ETC_BUTTON.esc ) {
      return KEY_TYPE.ac;

    } else if ( key === KEY_TYPE.equal || key === ETC_BUTTON.enter ) {
      return KEY_TYPE.equal;

    } else if ( key === ETC_BUTTON.backspace) {
      return ETC_BUTTON.backspace;

    } else if ( validation.isNumber(Number(key)) ) {
      return KEY_TYPE.number;

    } else if ( key === OPERATOR_BUTTON.plus || key === OPERATOR_BUTTON.minus || key === OPERATOR_BUTTON.multiply || key === OPERATOR_BUTTON.division ) {
      return KEY_TYPE.operator;

    } else {
      return false;
    };
  };
  
  var clickButton = function(key, clickedKeyType) {
    switch (clickedKeyType){
      case KEY_TYPE.ac :
        clearAll();
        printDisplay();
        break;
      case KEY_TYPE.equal :
        var invalid = checkDuplicate();
        console.log("invalid equal ", invalid)
        if (invalid) {
          addExpression();
          getResult();
        }
        break;
      case ETC_BUTTON.backspace :
        clearOnce();
        printDisplay();
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


  var inputNumber = function(key) {
    temporaryExpression += Number(key);
  };

  var addExpression = function(key) {
    var addExp = key ? [temporaryExpression, key] : temporaryExpression;
    EXPRESSION.push(addExp);
    temporaryExpression = "";
    warn(EXPRESSION)
  };

  var checkDuplicate = function() {
    console.log("checkDuplicate", clickedKeyType, temporaryExpression);
    if (clickedKeyType === KEY_TYPE.operator && temporaryExpression === "") {
      return false;
    } else if ( clickedKeyType === KEY_TYPE.equal && temporaryExpression === "" ) {
      return false;
    }else {
      return true;
    }
  };

  var printDisplay = function() {
    var expression = EXPRESSION.slice();
    var expressionCurr = temporaryExpression;

    var expressionHTML = container.querySelector(".calculation");
    var expressionCurrHTML = container.querySelector(".calculation_curr input");

    expressionHTML.innerText = expression.join(" ");
    expressionCurrHTML.value = expressionCurr;
    expressionCurrHTML.focus();
  };
  

  var clearAll = function() {
    EXPRESSION = [];
    temporaryExpression = "";
  };  

  var clearOnce = function() {
    temporaryExpression = temporaryExpression.slice(0, -1);
  }

  var getResult = function() {
    infixToPostfix(EXPRESSION);
  };

  return function(target){
    container = document.querySelector(target);
    addClickEvent();
    addKeyEvent();
    printDisplay();
  };
})();

var infixToPostfix = function(exp) {
  var expression = exp;
  console.log("test", expression);
}
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