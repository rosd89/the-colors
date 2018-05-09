var obj = {
  width: 320,
  height: 160,
  mode: 'center',
  // images: [
  //   'http://placehold.it/320X160/555',
  //   'http://placehold.it/320X160/666',
  // ],
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
      backgroundColor: 'red',
    };

    for (imageIndex in imageStyle) {
      slideWrap.style[imageIndex] = imageStyle[imageIndex];
    }

    root.appendChild(slideWrap);
    this.render();
  },
  addImages: function() {},
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
  },
};

// class가 있는 태그 생성
function createAddedClassTag(tag, className) {
  var tag = document.createElement(tag);
  tag.className = className;
  return tag;
}

var test = new Carousel(obj);

test.addImages();
