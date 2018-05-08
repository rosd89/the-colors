var obj = {
  width: '640px',
  height: '400px',
  margin: '0 auto',
  images: [
    'http://placehold.it/640X400/555',
    'http://placehold.it/640X400/666',
  ],
};

var root = document.getElementById('root'),
  slideWrap = createAddedClassTag('div', 'slideWrap'),
  slide = createAddedClassTag('div', 'slide'),
  slideList = createAddedClassTag('ul', 'slideList');

function Carousel(obj) {
  this.width = obj.width || '800px';
  this.height = obj.height || '600px';
  this.margin = obj.margin || '0 auto';
  this.images = obj.images || 'http://placehold.it/640X400/000';

  this.init();
}

Carousel.prototype = {
  init: function() {
    var i,
      css = {
        width: this.width,
        height: this.height,
        margin: this.margin,
        backgroundColor: 'red',
      };

    for (i in css) {
      slideWrap.style[i] = css[i];
    }

    root.appendChild(slideWrap);
    this.render();
  },
  addImages: function() {},
  render: function() {
    var docFragment = document.createDocumentFragment();
    this.images.forEach(function(e) {
      var li = createAddedClassTag('li', 'slideItem'),
        image = createAddedClassTag('img', 'slideImg');
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
