var obj = {
  width: 320,
  height: 160,
  mode: 'center',
  images: [
    'http://placehold.it/320X160/aa3dcc',
    'http://placehold.it/320X160/44dcaa',
    'http://placehold.it/320X160/c8212a',
    'http://placehold.it/320X160/bbbbbb',
  ],
  arrowButton: 'default'
};

var root = document.getElementById('root');
var slideWrap = createAddedClassTag('div', 'slideWrap');
var slide = createAddedClassTag('div', 'slide');
var slideList = createAddedClassTag('ul', 'slideList');

function Carousel(obj) {
  if (obj.constructor !== Object) {
    console.warn('invalid obj');
  }
  this.width = obj.width || 800;
  this.height = obj.height || 600;
  this.mode = obj.mode || 'center';
  this.images = obj.images || ['http://placehold.it/320X160/000'];
  this.arrowButton = obj.arrowButton || 'default';

  this.init();
}

Carousel.prototype = {
  init: function() {
    var imageIndex;
    var top;
    var left;
    var right;
    var marginLeft;

    switch (this.mode) {
      case 'left':
        left = 0;
        right = 'auto';
        break;

      case 'center':
        left = '50%';
        marginLeft = -parseInt(this.width) / 2;
        break;

      case 'right':
        right = 0;
        left = 'auto';
        break;

      default:
        break;
    }

    var imageStyle = {
      width: this.width + 'px',
      height: this.height + 'px',
      position: 'absolute',
      left: left,
      right: right,
      marginLeft: marginLeft ? marginLeft + 'px' : 0,
      backgroundColor: 'lavender',
    };

    for (imageIndex in imageStyle) {
      slideWrap.style[imageIndex] = imageStyle[imageIndex];
    }

    root.appendChild(slideWrap);
    this.addArrowButton();
    this.addIndicator();
    this.render();
    this.event();
  },
  addImages: function() {},
  addArrowButton: function() {
    makeArrowButton('left',10);
    makeArrowButton('right',10);

    function makeArrowButton(direction, distance) {
      var button = createAddedClassTag('button', direction+'Arrow');
      var icon = createAddedClassTag('i', 'fas fa-arrow-circle-'+direction);
      button.appendChild(icon);
      slideWrap.appendChild(button);
      direction === 'left' ? button.style.left = distance + 'px' : button.style.right = distance+'px';
    }
  },
  addIndicator: function() {
    var indicatorLength = this.images.length;
    var indicatorWrap = createAddedClassTag('div', 'indicatorWrap');
    // var icon = createAddedClassTag('i', 'fas fa-circle');
    for (let index = 0; index < indicatorLength; index++) {
      // var indicatorButton = createAddedClassTag('button', 'indicatorButton' + index);
      var indicatorButton = createAddedClassTag('button', 'indicatorButton');
      var icon = createAddedClassTag('i', 'far fa-circle');
      indicatorButton.appendChild(icon);
      indicatorWrap.appendChild(indicatorButton);
    }
    slideWrap.appendChild(indicatorWrap);
  },
  moveSlide: function(direction) {
    if(direction === 'left') {
      var width = this.width;
      var movePosition = -parseInt(slideList.style.left);
      var moveFlag = movePosition + parseInt(width);
      var moveStart = setInterval(move, 5);
      function move() {
        if (movePosition === moveFlag) {
          clearInterval(moveStart);
          var firstSlide = document.querySelector('.slideItem');
          var clone = firstSlide.cloneNode(true);
          slideList.appendChild(clone);
          slideList.removeChild(document.querySelector('.slideItem'));
          slideList.style.left = (parseInt(slideList.style.left) + parseInt(width)) + 'px';
        } else {
          movePosition++;
          slideList.style.left = -movePosition + 'px';
        }
      }
    } else {
      var width = this.width;
      var movePosition = parseInt(slideList.style.left);
      var moveFlag = movePosition + parseInt(width);
      var moveStart = setInterval(move, 5);
      function move() {
        if (movePosition === moveFlag) {
          clearInterval(moveStart);
          var lastSlide = slideList.lastChild;
          var clone = lastSlide.cloneNode(true);
          slideList.insertBefore(clone, slideList.firstChild);
          slideList.removeChild(lastSlide);
          slideList.style.left = (parseInt(slideList.style.left) - parseInt(width)) + 'px';
        } else {
          movePosition++;
          slideList.style.left = movePosition + 'px';
        }
      }
    }
  },
  render: function() {
    var docFragment = document.createDocumentFragment();
    this.images.forEach(function(e) {
      var li = createAddedClassTag('li', 'slideItem');
      var image = createAddedClassTag('img', 'slideImg');
      image.src = e;
      li.appendChild(image);
      docFragment.appendChild(li);
    });

    slideList.appendChild(docFragment);
    slide.appendChild(slideList);
    slideWrap.appendChild(slide);

    slideList.style.width = parseInt(this.width) * this.images.length + 'px';
    slideList.style.height = this.height;
    slideList.style.left = 0;

    // var firstClone = document.querySelector('.slideItem').cloneNode(true);
    var lastClone = document.querySelectorAll('.slideItem')[this.images.length - 1].cloneNode(true);
    // slideList.appendChild(firstClone);
    slideList.insertBefore(lastClone, slideList.firstChild);
    slideList.style.left = -this.width + 'px';
    slideList.removeChild(slideList.lastChild);
  },
  event: function() {
    var _this = this;
    document.querySelector('.leftArrow').addEventListener('click', function(e) {
      _this.moveSlide('left');
    });
    document.querySelector('.rightArrow').addEventListener('click', function(e) {
      _this.moveSlide('right');
    });
  }
};

// class가 있는 태그 생성
function createAddedClassTag(tag, className) {
  var tag = document.createElement(tag);
  tag.className = className;
  return tag;
}

var test = new Carousel(obj);