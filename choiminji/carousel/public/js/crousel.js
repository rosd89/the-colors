var SlideElement = function(imgValue) {
  if (imgValue == null) { 
    warn('이미지 주소값이 없습니다');
    return;
  }

};

var Slide = (function () {
  this.SLIDE_LIST = [];
  var DEFAULT_OPTION = {
    width : 1000,
    height : 600,
    autoPlay : false,
    direction : 'default',  // default, left, right
    speed : 300,
    arrow : true,
    dot : true
  };
  Object.freeze(DEFAULT_OPTION);  
  
  return function(userOption){
    var optValid = this.optionValidation(userOption);
    if (optValid) {
      var option = Object.assign({}, DEFAULT_OPTION, userOption);
      this.option = option;
      this.init();
    } else {
      warn('option 값을 확인하세요.');
      return;
    };
  }
})();

Slide.prototype = {
  init : function() {
    this.container = document.getElementById(this.option.idName);
    this.addSlideList(this.option.slideList);


    /*
    this.currentIdx = 0;
    this.slideLength = this.option.slideLength.length;
    if (this.option.dot) this.createDot(this.slideLength);
    if (this.option.arrow) this.createArrow();
    */
  },
  addSlideList : function(slideList) {
    slideList.forEach(function(v){
      this.add(v);
    });
  },
  add : function(slideElem) {
    var slideElement = new SlideElement(slideElem)
  },
  render : function() {
    // option.slideList.forEach(function(v,i){
    //   var elementDOM = createDOM("li", "slide-img", i);

    //   this.container.appendChild(element);
    // })
  },
  optionValidation : function(option) {
    var optValid = validation.isObject(option);
    var idNameValid = true;
    var slideListValid = true;
    var widthValid = true;
    var heightValid = true;
    var autoPlayValid = true;
    var directionValid = true;
    var speedValid = true;
    var arrowValid = true;
    var dotValid = true;
    
    if (option.idName) idNameValid = validation.isString(option.idName);
    if (option.slideList) slideListValid = validation.isArr(option.slideList);
    if (option.width) widthValid = validation.isNumber(option.width);
    if (option.height) heightValid = validation.isNumber(option.height);
    if (option.autoPlay) autoPlayValid = validation.isBoolean(option.autoPlay);
    if (option.direction) directionValid = validation.isString(option.direction);
    if (option.speed) speedValid = validation.isNumber(option.speed);
    if (option.arrow) arrowValid = validation.isBoolean(option.arrow);
    if (option.dot) dotValid = validation.isBoolean(option.dot);

    return idNameValid && slideListValid && widthValid && heightValid && autoPlayValid && directionValid && speedValid && arrowValid && dotValid;
  }
}

var createDOM = function(tagName, className, innerTxt) {
  var element = document.createElement(tagName);
  element.className = className;
  element.innerText = innerTxt;
  return element;
}

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

var warn = function(msg) {
  console.log(msg);
};