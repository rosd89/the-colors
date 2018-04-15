var Product = (function(){
  var id = 0;
  function Product(name, price) {
    if(isStringName()) {
      try {
        throw new Error("name을 문자로 입력해주세요.");
      } catch (e) {
        alert(e.message);
        return false;
      }
    }
    if(isNumberPrice()) {
      try {
        throw new Error("price을 숫자(양수, 정수)로 입력해주세요.");
      } catch (e) {
        alert(e.message);
        return false;
      }
    }
    this.id = id++;
    this.name = name;
    this.price = price;
    this.totalQuantity = 0;
    this.soldQuantity = 0;
    this.status = false;

    function isNumberPrice ()  {
      return typeof price !== 'number' || isNaN(price) || price <= 0 || price - Math.floor(price) != 0 ;
    }

    function isStringName () {
      return typeof name !== 'string' || Object.prototype.toString.call(name) != '[object String]';
    }
  }

  return Product;

})();
