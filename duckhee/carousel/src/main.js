var obj = {
  width: '640px',
  height: '400px',
  margin: '0 auto',
  image: ['http://placehold.it/640X400/555', 'http://placehold.it/640X400/666'],
};

function Carousel(obj) {
  this.width = obj.width || '800px';
  this.height = obj.height || '600px';
  this.margin = obj.margin || '0 auto';

  var root = document.getElementById('root'),
    slideWrap = createAddedClassTag('div', 'slideWrap'),
    i,
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
}

// class가 있는 태그 생성
function createAddedClassTag(tag, className) {
  var tag = document.createElement(tag);
  tag.className = className;
  return tag;
}

var test = new Carousel(obj);
