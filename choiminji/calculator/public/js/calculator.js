var OPERATOR = {
  plus : "+",
  minus : "-",
  multiply : "*",
  division : "/"
};

var ETC = {
  esc : "Escape",
  enter : "Enter",
  backspace : "Backspace"
}

var Calculator = (function() {
  var EXPRESSION = [];
  
  var KEY_TYPE = {
    number : "number",
    operator : "operator",
    ac : "AC",
    equal : "="
  };
  
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

        controller(key, clickedKeyType)
      })
    })
  };

  var addKeyEvent = function() {
    var inputBox = container.querySelector(".calculation_curr input");
    
    inputBox.onkeydown = function(event) {
      var keyValue = event.key;
      clickedKeyType = checkKeyType(keyValue);

      if ( clickedKeyType ) controller(keyValue, clickedKeyType);

      event.preventDefault();
    };
  }
  
  var controller = function(key, clickedKeyType) {
    switch (clickedKeyType){
      case KEY_TYPE.ac :
        clearAll();
        printDisplay();
        break;
      case ETC.backspace :
        clearOnce();
        printDisplay();
        break;
      case KEY_TYPE.equal :
        var invalid = checkDuplicate();
        if (invalid) {
          addExpression();          
          var postfixArray = infixToPostfix(EXPRESSION);
          var calculationResult = calculatePostfix(postfixArray);

          printResult(calculationResult);
        }
        break;
      case KEY_TYPE.number :
        var invalid = checkDuplicate();
        if (invalid) {
          inputNumber(key);
          printDisplay();
        }
        break;
      case KEY_TYPE.operator :
        var invalid = checkDuplicate();
        if (invalid) {
          addExpression(key);
          printDisplay();
        }
        break;
      default : 
        warn("key type 오류");
        return false;
    }
  };

  var checkKeyType = function(key) {
    if (key === null) {
      warn("빈값입니다.");
      return false;
    }

    if ( key === KEY_TYPE.ac || key === ETC.esc ) {
      return KEY_TYPE.ac;

    } else if ( key === KEY_TYPE.equal || key === ETC.enter ) {
      return KEY_TYPE.equal;

    } else if ( key === ETC.backspace) {
      return ETC.backspace;

    } else if ( validation.isNumber(Number(key)) ) {
      return KEY_TYPE.number;

    } else if ( key === OPERATOR.plus || key === OPERATOR.minus || key === OPERATOR.multiply || key === OPERATOR.division ) {
      return KEY_TYPE.operator;

    } else {
      return false;
    };
  };

  var inputNumber = function(key) {
    temporaryExpression += Number(key);
  };

  var addExpression = function(key) {
    if (key && temporaryExpression) {
      EXPRESSION.push(temporaryExpression, key);
    } else if ( key && !temporaryExpression) {
      EXPRESSION.push(key);
    } else {
      EXPRESSION.push(temporaryExpression);
    }
    
    temporaryExpression = "";
    warn(EXPRESSION)
  };

  var checkDuplicate = function() {
    var returnVal = true;

    switch (clickedKeyType) {
      case KEY_TYPE.operator : 
      case KEY_TYPE.equal : 
        if (temporaryExpression === "" && isNaN(EXPRESSION[EXPRESSION.length-1])) returnVal = false;
        break;

      case KEY_TYPE.number :
        if (!isNaN(EXPRESSION[EXPRESSION.length-1])) {
          returnVal = false;
          warn("숫자는 한번만!")
        }
        break;
      default :
        break;
    }
    
    return returnVal;
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
  
  var printResult = function(result) {
    var expression = EXPRESSION.slice();
    var expressionHTML = container.querySelector(".calculation");
    var expressionCurrHTML = container.querySelector(".calculation_curr input");
    
    expressionHTML.innerText = expression.join(" ");
    expressionCurrHTML.value = result;
    expressionCurrHTML.focus();
  }

  var clearAll = function() {
    EXPRESSION = [];
    temporaryExpression = "";
  };  

  var clearOnce = function() {
    if (temporaryExpression) {
      temporaryExpression = temporaryExpression.slice(0, -1);
    } else {
      EXPRESSION.pop();
    }
  }

  var infixToPostfix = function(exp) {
    var expression = exp;
  
    var postfixArray = []; // 최종 후위표현식 담을 리스트
    var stack = []; // 연산자 가중치에 따라 담을 리스트
  
    var precedence = function(operator) {
      switch (operator) {
        case OPERATOR.multiply:
        case OPERATOR.division:
          return 3;
        case OPERATOR.plus:
        case OPERATOR.minus:
          return 2;
        default:
          return 0;
      }
    }
  
    expression.forEach(function(v, i) {
      if ( !isNaN(v) ) {
        postfixArray.push(v);
        
      } else if ( v === OPERATOR.plus || v === OPERATOR.minus || v === OPERATOR.multiply || v === OPERATOR.division ) {
  
        if (!stack.length) {
          stack.push(v);
  
        } else {
          var topElem = stack[stack.length - 1];
          if ( precedence(v) >  precedence(topElem) ) {
            stack.push(v);
          } else if ( precedence(v) <= precedence(topElem) ){
            postfixArray.push(stack.pop());
            stack.push(v);
          }
        }
  
      }
    })
  
    for ( var i =0 ; i <= stack.length; i++ ){
      postfixArray.push(stack.pop());
    }
    
    return postfixArray;
  }
  
  var calculatePostfix = function(postfixArray) {
    var stack = [];
  
    postfixArray.forEach(function(v){
      if ( !isNaN(v) ) {
        stack.push(v);
        
      } else {
        var v2 = Number(stack.pop());
        var v1 = Number(stack.pop());
  
        switch (v) {
          case OPERATOR.plus :
            stack.push(v1 + v2);
            break;
          case OPERATOR.minus :
            stack.push(v1 - v2);
            break;
          case OPERATOR.multiply : 
            stack.push(v1 * v2);
            break;
          case OPERATOR.division :
            stack.push(v1 / v2);
            break;
          default :
            break;
        }
      }
    })
  
    if ( Number.isInteger(stack[0]) ) {
      return stack[0];
    } else {
      return +Number(stack[0]).toFixed(5);
    }
  };


  return function(target){
    container = document.querySelector(target);
    addClickEvent();
    addKeyEvent();
    printDisplay();
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