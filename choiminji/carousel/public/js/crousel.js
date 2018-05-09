var SlideElement = function(opt) {

};

var Slide = (function () {
  var SLIDE_LIST = [];

  var DEFAULT_OPTION = {
    autoPlay : false,
    direction : "default",  // default, left, right
    speed : 300,
    arrow : true,
    dot : true
  };
  Object.freeze(DEFAULT_OPTION);

  return function(user_option){
    var opt_valid = validation.isObject(user_option);
    if (opt_valid) {
     var option = Object.assign({}, DEFAULT_OPTION, user_option);
    }
  }
})();

var validation = (function() {
  var isString = function(str) {
    return typeof(str) !== "string"
  }
  
  var isObject = function(obj) {
    return obj !== null && typeof obj === "object" && obj.toString() === "[object Object]";
  }
  return {
    isObject : isObject
  }
})();
