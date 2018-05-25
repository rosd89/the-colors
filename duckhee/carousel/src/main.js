(function () {
  function Carousel(obj) {
    if (obj.constructor !== Object) {
      console.warn('invalid obj');
    }
    if (obj.images.length <= 0 || obj.images.length >= 10) {
      console.warn('이미지 갯수가 올바르지 않습니다.');
    }
    this.width = obj.width || 800;
    this.height = obj.height || 600;
    this.mode = obj.mode || 'center';
    this.images = obj.images || ['http://placehold.it/320X160/000'];
    this.arrowButton = obj.arrowButton || 'default';
    this.arrowDistance = obj.arrowDistance || 10;
    this.autoPlay = obj.autoPlay || "off";
    this.direction = obj.direction || 'left';
    this.root = document.getElementById('root');
    this.slideWrap = createAddedClassTag('div', 'slideWrap');
    this.slide = createAddedClassTag('div', 'slide');
    this.slideList = createAddedClassTag('ul', 'slideList');
    this.indicatorWrap = createAddedClassTag('div', 'indicatorWrap');
    this.timer;
    this.isMoved = false;
  }

  Carousel.prototype = {
    init: function () {
      this.addDefaultStyle();
      this.addArrowButton(this.arrowDistance);
      this.render();
      this.event();
    },
    addDefaultStyle: function () {
      var imageIndex;
      var left;
      var right;
      var marginLeft;
      var imageStyle;

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

      imageStyle = {
        width: this.width + 'px',
        height: this.height + 'px',
        position: 'absolute',
        left: left,
        right: right,
        marginLeft: marginLeft ? marginLeft + 'px' : 0,
        backgroundColor: 'lavender',
      };

      for (imageIndex in imageStyle) {
        this.slideWrap.style[imageIndex] = imageStyle[imageIndex];
      }

      this.root.appendChild(this.slideWrap);
    },
    addImage: function (image) {
      this.images.push(image);
      if (obj.images.length >= 10) {
        console.warn('이미지 갯수가 올바르지 않습니다.');
      }
      /*slideList 안에 내용 모두 지운다.*/
      while (this.slideList.hasChildNodes()) {
        this.slideList.removeChild(this.slideList.firstChild);
      }
      this.render();
    },
    removeImage: function (index) {
      if (index < 0 || index >= this.images.length) {
        console.warn('index가 정확하지 않습니다.');
      }
      if (obj.images.length <= 1) {
        console.warn('이미지 갯수가 올바르지 않습니다.');
      }
      this.images.splice(index, 1);
      while (this.slideList.hasChildNodes()) {
        this.slideList.removeChild(this.slideList.firstChild);
      }
      this.render();
    },
    addArrowButton: function (distance) {
      this.makeArrowButton('left', distance);
      this.makeArrowButton('right', distance);
    },
    makeArrowButton: function (direction, distance) {
      var _this = this;
      var button = createAddedClassTag('button', direction + 'Arrow');
      var icon = createAddedClassTag('i', 'fas fa-arrow-circle-' + direction);
      button.appendChild(icon);
      _this.slideWrap.appendChild(button);
      direction === 'left' ?
        (button.style.left = distance + 'px') :
        (button.style.right = distance + 'px');
    },
    addIndicator: function () {
      var indicatorLength = this.images.length;
      while (this.indicatorWrap.hasChildNodes()) {
        this.indicatorWrap.removeChild(this.indicatorWrap.firstChild);
      }
      for (let index = 0; index < indicatorLength; index++) {
        var indicatorButton = createAddedClassTag('button', 'indicatorButton');
        var icon = createAddedClassTag('i', 'far fa-circle');
        indicatorButton.appendChild(icon);
        this.indicatorWrap.appendChild(indicatorButton);
      }
      this.slideWrap.appendChild(this.indicatorWrap);
    },
    moveSlide: function (direction) {
      var _this = this;
      var width = this.width;
      var movePosition = parseInt(this.slideList.style.left);
      if (direction === 'left') {
        movePosition = -movePosition;
        var moveFlag = movePosition + parseInt(width);
        var moveStart = setInterval(move, 1);

        function move() {
          if (movePosition === moveFlag) {
            _this.isMoved = !_this.isMoved;
            clearInterval(moveStart);
            var firstSlide = document.querySelector('.slideItem');
            var clone = firstSlide.cloneNode(true);
            _this.slideList.appendChild(clone);
            _this.slideList.removeChild(document.querySelector('.slideItem'));
            _this.slideList.style.left =
              parseInt(_this.slideList.style.left) + parseInt(width) + 'px';
          } else {
            movePosition++;
            _this.slideList.style.left = -movePosition + 'px';
          }
        }
      } else {
        var startDate = new Date();
        var moveFlag = movePosition + parseInt(width);
        var moveStart = setInterval(move, 1);

        function move() {
          if (movePosition === moveFlag) {
            _this.isMoved = !_this.isMoved;
            var endDate = new Date();
            var resultDate = endDate - startDate;
            _this.timer = resultDate;
            clearInterval(moveStart);
            var lastSlide = _this.slideList.lastChild;
            var clone = lastSlide.cloneNode(true);
            _this.slideList.insertBefore(clone, _this.slideList.firstChild);
            _this.slideList.removeChild(lastSlide);
            _this.slideList.style.left =
              parseInt(_this.slideList.style.left) - parseInt(width) + 'px';
          } else {
            movePosition++;
            _this.slideList.style.left = movePosition + 'px';
          }
        }
      }
    },
    render: function () {
      var docFragment = document.createDocumentFragment();
      this.images.forEach(function (e) {
        var li = createAddedClassTag('li', 'slideItem');
        var image = createAddedClassTag('img', 'slideImg');
        image.src = e;
        li.appendChild(image);
        docFragment.appendChild(li);
      });

      this.slideList.appendChild(docFragment);
      this.slide.appendChild(this.slideList);
      this.slideWrap.appendChild(this.slide);
      this.slideList.style.width =
        parseInt(this.width) * this.images.length + 'px';
      this.slideList.style.height = this.height;
      this.slideList.style.left = 0;

      var lastClone = document
        .querySelectorAll('.slideItem')[this.images.length - 1].cloneNode(true);
      this.slideList.insertBefore(lastClone, this.slideList.firstChild);
      this.slideList.style.left = -this.width + 'px';
      this.slideList.removeChild(this.slideList.lastChild);

      if (this.images.length === 1) {
        console.log(document.querySelector('.slideList').style);
        document.querySelector('.slideList').style.left = '0px';
      }
      this.addIndicator();
      this.autoSlide();
    },
    event: function () {
      var _this = this;
      document
        .querySelector('.leftArrow')
        .addEventListener('click', function (e) {
          if (!_this.isMoved) {
            _this.isMoved = !_this.isMoved;
            _this.moveSlide('left');
          }
        });
      document
        .querySelector('.rightArrow')
        .addEventListener('click', function (e) {
          if (!_this.isMoved) {
            _this.isMoved = !_this.isMoved;
            _this.moveSlide('right');
          }
        });
    },
    autoSlide: function () {
      var _this = this;
      if (this.autoPlay === "on") {
        setInterval(function () {
          document.querySelector('.' + _this.direction + 'Arrow').click();
        }, 100);
      }
    },
  };

  // class가 있는 태그 생성
  function createAddedClassTag(tag, className) {
    var tag = document.createElement(tag);
    tag.className = className;
    return tag;
  }
  
  return (Slide = Carousel);
})();

var obj = {
  width: 320,
  height: 160,
  mode: 'left',
  images: [
    'http://placehold.it/320X160/aa3dcc',
    'http://placehold.it/320X160/44dcaa',
    'http://placehold.it/320X160/c8212a',
    'http://placehold.it/320X160/bbbbbb',
  ],
  arrowButton: 'default',
  arrowDistance: 20,
  autoPlay: "off",
  direction: 'left',
};

var test = new Slide(obj);
test.init();
// 이미지 추가
test.addImage('http://placehold.it/320X160/000');
// 이미지 삭제
// test.removeImage(4);
