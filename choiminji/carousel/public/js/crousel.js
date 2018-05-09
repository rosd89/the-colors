var SlideElement = function(option) {

};

var Slide = (function () {
  var SLIDE_LIST = [];

  var DEFAULT_OPTION = {
    autoPlay : false,
    direction : 'default',  // default, left, right
    speed : 300,
    arrow : true,
    dot : true
  };
  Object.freeze(DEFAULT_OPTION);

  var optionValidation = function(option) {
    var optValid = validation.isObject(option);
    var [idNameValid, slideListValid, autoPlayValid, directionValid, speedValid, arrowValid, dotValid] = [true,true,true,true,true,true,true];
    
    if (option.idName) idNameValid = validation.isString(option.idName);
    if (option.slideList) slideListValid = validation.isArr(option.slideList);
    if (option.autoPlay) autoPlayValid = validation.isBoolean(option.autoPlay);
    if (option.direction) directionValid = validation.isString(option.direction);
    if (option.speed) speedValid = validation.isNumber(option.speed);
    if (option.arrow) arrowValid = validation.isBoolean(option.arrow);
    if (option.dot) dotValid = validation.isBoolean(option.dot);

    return idNameValid && slideListValid && autoPlayValid && directionValid && speedValid && arrowValid && dotValid;
  }

  return function(userOption){
    var optValid = optionValidation(userOption);
    if (optValid) {
     var option = Object.assign({}, DEFAULT_OPTION, userOption);
    };
  }
})();

var validation = (function() {
  var isObject = function(obj) {
    return obj !== null && typeof obj === 'object' && obj.toString() === '[object Object]';
  }

  var isString = function(str) {
    return typeof str === 'string'
  }

  var isArr = function(arr) {
    return arr !== null && typeof arr === 'object' && Array.isArray(arr);
  }
  
  var isBoolean = function(boolean) {
    console.log("--------"+boolean);
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
