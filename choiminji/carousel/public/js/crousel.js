var WRAP = document.getElementById('wrap')

var SlideElement = function(imgValue, lastIdx) {
  if (arguments.length !== 2) {
    warn('개별 슬라이드 생성 인자값 잘못! 이미지 주소 + 마지막index값 필요!');
    return;
  }
  console.log(Number(lastIdx));
  this.index = lastIdx;
  this.imgValue = imgValue;
};

var Slide = function(userOption){
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
  
  this.SLIDE_LIST = [];
  this.lastIdx = 0;
  this.container;


  var optValid = this.validateOption(userOption);

  if (optValid) {
    var option = Object.assign({}, DEFAULT_OPTION, userOption);
    this.option = option;
    this.init();
  } else {
    warn('option 값을 확인하세요.');
    return;
  };
}

Slide.prototype = {
  init : function() {
    this.createSlide();
    this.addSlideList(this.option.slideList);

    if (this.option.arrow) this.createArrow();
    /*
    this.currentIdx = 0;
    this.slideLength = this.option.slideLength.length;
    if (this.option.dot) this.createDot(this.slideLength);
    
    */
  },

  createSlide : function() {
    var self = this;
    self.container = createDOM('div', self.option.idName+' slideWrap');
    var slideWrap = createDOM('ul', 'slide');
    
    self.container.appendChild(slideWrap);
    self.render();
  },

  createArrow : function() {
    console.log("arrow run")
    var self = this;
    var prevArrow = createDOM('button', 'arrow prev', 'PREV');
    var nextArrow = createDOM('button', 'arrow next', 'NEXT');
    self.container.appendChild(prevArrow);
    self.container.appendChild(nextArrow);
  }, 

  addSlideList : function(slideList) {
    var self = this;
    slideList.forEach(function(v){
      self.add(v);
    });
  },

  add : function(slideElem) {
    var self = this;
    var slideCountVaild = self.validateSlideCount();
    if ( slideCountVaild ) {
      var slideElement = new SlideElement(slideElem, self.lastIdx);
      self.SLIDE_LIST.push(slideElement);
      self.lastIdx++;
    } else {
      warn("슬라이드는 최대 10개 등록 가능");
      return;
    }
    self.render();
  },
  
  delete : function(idx) {
    var self = this;
    var isValid = self.circulateSlideList(function(v) {
      if ( v.index === idx) return true;
    })
    
    if (isValid) {
      self.circulateSlideList(function(v) {
        if ( v.index === idx ) {
          self.SLIDE_LIST.splice(idx,1);
          return true;
        }
      })

      self.render();
    } else {
      warn("잘못된 index!");
      return;
    }
  },

  render : function() {
    var self = this;
    var slideWrap = self.container.querySelector(".slide")
    slideWrap.innerHTML = '';
    self.circulateSlideList(function(v){
      var element = createDOM('li', 'slide-elem');
      var elementImg = createDOM('img', '', v.imgValue);
      element.appendChild(elementImg);
      slideWrap.appendChild(element);
    })

    WRAP.appendChild(self.container);
    console.log(self.SLIDE_LIST);
  },

  circulateSlideList(callback) {
    var self = this;
    self.SLIDE_LIST.some(callback);
  },

  validateSlideCount : function() {
    var count = this.SLIDE_LIST.length;
    return count < 10;
  },

  validateOption : function(option) {
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
  if (className) element.className = className;
  
  if (tagName === 'img' && innerTxt) {
    element.src = innerTxt;
  } else if (innerTxt) {
    element.innerText = innerTxt;
  }

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