var inputButtons = document.querySelector('.inputButton');
var showOutput = document.querySelector('.output');
var expresstion = '';

inputButtons.addEventListener('click', function(e) {
  inputClick(e);
});

showOutput.addEventListener('keydown', function(e) {
  inputKeyDown(e);
});

function inputClick(e) {
  var keyValue = e.target.value;
  var prevValue = getValue();
  var checkFinalThing = prevValue ? prevValue[prevValue.length - 1] : false;

  if (keyValue === 'AC') {
    clearOutput();
    return false;
  } else if (keyValue === '=') {
    expresstion = showOutput.value;
    clearOutput();
    return false;
  } else if (!keyValue) {
    return false;
  } else if (checkValidExpresstion(checkFinalThing, keyValue)) {
    return false;
  }

  showOutput.value += keyValue;
  showOutput.focus();
}

function inputKeyDown(e) {
  if (e.key === '=' || e.key === 'Enter') {
    console.warn('keypress =, Enter');
    e.preventDefault();
  } else if (e.key === 'Escape') {
    clearOutput();
  } else if (validateKeyup(e)) {
    e.returnValue = false;
    console.warn('input invalid key');
  }
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
