var inputButtons = document.querySelector('.inputButton');
var showOutput = document.querySelector('.output');
var expresstion = '';

showOutput.addEventListener('keydown', function(e) {
  inputKeyDown(e);
});

inputButtons.addEventListener('click', function(e) {
  inputClick(e);
});

// 키보드 입력시
function inputKeyDown(e) {
  var keyValue = e.key;
  var prevValue = getValue();
  var checkFinalThing = prevValue ? prevValue[prevValue.length - 1] : false;

  if (!checkFinalThing && isNaN(keyValue)) {
    console.log("처음부터 연산자는 안된다.");
    e.preventDefault();
    return false;
  }
  if (e.key === '=' || e.key === 'Enter') {
    showOutput.value = calculate();
    e.preventDefault();
  } else if (e.key === 'Escape') {
    clearOutput();
  } else if (validateKeyup(e)) {
    e.returnValue = false;
    console.warn('input invalid key');
  } else if (checkValidExpresstion(checkFinalThing, keyValue)) {
    if (keyValue !== "Backspace") {
      console.log("2번연속 연산자는 안된다.");
      e.preventDefault();
      return false;
    }
  }
}

// 마우스 클릭 시
function inputClick(e) {
  var keyValue = e.target.value;
  var prevValue = getValue();
  var checkFinalThing = prevValue ? prevValue[prevValue.length - 1] : false;

  if(!checkFinalThing && isNaN(keyValue)) {
    console.log("처음부터 연산자는 안된다.");
    return false;
  }

  if (keyValue === 'AC') {
    clearOutput();
    return false;
  } else if (keyValue === '=') {
    // calculate();
    // clearOutput();
    showOutput.value = calculate();
    return false;
  } else if (!keyValue) {
    return false;
  } else if (checkValidExpresstion(checkFinalThing, keyValue)) {
    console.log("2번연속 연산자는 안된다.");
    return false;
  }

  showOutput.value += keyValue;
  showOutput.focus();
}

// 입력받은 값(중위연산자)를 후위연산식으로 변견
function fromInfixToPostfix() {
  var listExp = [];
  var stack = [];
  var weight = 0;
  
  expresstion = showOutput.value;
  expresstion = expresstion.match(/\d+|\D+/g);

  // 마지막이 연산자일 경우 제거
  if (isNaN(expresstion[expresstion.length - 1])) {
    console.log(expresstion[expresstion.length - 1]);
    expresstion.pop();
  }

  for(i = 0; i <= expresstion.length; i++) {
    switch (expresstion[i]) { // 연산자 우선 순위
      case '*':
        weight = 2;
        break;
      case '/':
        weight = 2;
        break;
      case '+':
        weight = 1;
        break;
      case '-':
        weight = 1;
        break;
      default:
        weight = 0;
        break;
    }

    // 연산자, 피연산자에 따른 분기 (후위연산식 만들기)
    if(!isNaN(expresstion[i])) {
      listExp.push(expresstion[i]);
    } else if(!stack.length) {
      stack.push(expresstion[i]);
    } else {
      if(weight == 1) { // + , - 일때
        for(j = 0; j <= stack.length; j++) {
          listExp.push(stack.pop());
        }
        stack.push(expresstion[i]);
      } else if(weight == 2) { // * , / 일떄
        if(stack[stack.length-1] === "*" || stack[stack.length-1] === "/") { // stack 최상위가 *, / 일때
          for(j = 0; j <= stack.length; j++) {
            listExp.push(stack.pop());
          }
          stack.push(expresstion[i]);
        } else { // stack 최상위가 +, - 일때
          stack.push(expresstion[i]);
        }
      }
    }
  }

  for(i = 0; i <= stack.length; i++) {
    listExp.push(stack.pop());
  }

  return listExp;
}

// 후위 연산식으로 계산하기
function calculate() {
  var stack = [];
  var listExp = [];
  var postFixArray = fromInfixToPostfix(); // 후위 연산식 배열

  // 숫자일때 스택에 반환, 연산자일때 스택에서 2개를 꺼내서(pop) 계산 후 다시 담기(push)
  for(i = 0; i <= postFixArray.length; i++) {
    if(!isNaN(postFixArray[i])) { // 숫자일떄
      stack.push(postFixArray[i]);
    } else {
      switch (postFixArray[i]) {
        case "+":
          stack.push(add(stack.pop(), stack.pop()));
          break;
        case "-":
          stack.push(subtract(stack.pop(), stack.pop()));
          break;
        case "*":
          console.log(stack);
          stack.push(multiply(stack.pop(), stack.pop()));
          break;
        case "/":
          stack.push(divide(stack.pop(), stack.pop()));
          break;
        default:
          break;
      }
    }
  }
  return stack[0];
}

// 더하기
function add(a, b) {
  return Number(b) + Number(a);
}

// 뺄셈
function subtract(a, b) {
  return Number(b) - Number(a);
}

// 곱셈
function multiply(a, b) {
  return Number(b) * Number(a);
}

// 나누기
function divide(a, b) {
  return Number(b) / Number(a);
}

// 값 지우기
function clearOutput() {
  showOutput.value = '';
  showOutput.focus();
  return false;
}

// 값 추출
function getValue() {
  return showOutput.value;
}

// 연속된 연산자 나올시 체크(true일때)
function checkValidExpresstion(checkFinalThing, keyValue) {
  return isNaN(checkFinalThing) && isNaN(keyValue);
}

// 아래 key 값이 아닌것들이 입력될때
function validateKeyup(e) {
  return (
    e.key !== '0' &&
    e.key !== '1' &&
    e.key !== '2' &&
    e.key !== '3' &&
    e.key !== '4' &&
    e.key !== '5' &&
    e.key !== '6' &&
    e.key !== '7' &&
    e.key !== '8' &&
    e.key !== '9' &&
    e.key !== '*' &&
    e.key !== '+' &&
    e.key !== '/' &&
    e.key !== '-' &&
    e.key !== 'Backspace'
  );
}