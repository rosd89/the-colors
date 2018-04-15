const buyable = (price, stock, { session }) =>
  session.change < price || !stock ? "unavailable" : "product";

const template = store =>
  `
  <section class="products">
    ${store.products.map(({ name, price, isHot, stock }, i, o) => {
      const status = buyable(price, stock, store);
      return `
        <div>
          <span class="${status}" data-productid=${i}>상품명 : ${name}</span>
          <span class="${status}" data-productid=${i}>ID : ${i}.</span>
          <span class="${status}" data-productid=${i}>가격 : ${price}</span>
          <span class="${status}" data-productid=${i}>냉온여부 : ${isHot}</span>
          <span class="${status}" data-productid=${i}>재고 : ${stock}</span>
        </div>`;
    })}
  </section>

  <hr>

  <section class="payment">
    <span class="change">
      ${store.session.change}
    </span>

    <div class="money">
      <button class="money">100</button>
      <button class="money">500</button>
      <button class="money">1000</button>
      <button class="money">5000</button>
      <button class="money">10000</button>
      <button class="money">50000</button>
    </div>
  </section>

  <hr>

  <section class="selection">
    <span class="selection_select">
      ${store.session.select}
    </span>

    <div class="selection_select_button">
      <button type="button" class="number">1</button>
      <button type="button" class="number">2</button>
      <button type="button" class="number">3</button>
      <button type="button" class="number">4</button>
      <button type="button" class="number">5</button>
      <button type="button" class="number">6</button>
      <button type="button" class="number">7</button>
      <button type="button" class="number">8</button>
      <button type="button" class="number">9</button>
      <button type="button" class="number">0</button>
      <button type="button" class="select">선택</button>
    </div>
  </section>

  <hr>

  <section class="admin">
    <div>
      <input type="number" min="0" max="30" step="1" placeholder="상품번호">
      <input type="number" min="0" max="30" step="1" placeholder="재고">
      <button type="button" class="fill">충전</button>
    </div>

    <div>
      <input type="text" placeholder="이름">
      <input type="number" min="0" step="100" placeholder="가격">
      <select>
        <option value="true">Hot</option>
        <option value="false">Ice</option>
      </select>
      <input type="number" min="0" max="30" step="1" placeholder="재고">
      <button type="button" class="add">추가</button>
    </div>

    <div>
      <input type="number" min="0" max="30" step="1" placeholder="상품번호">
      <button type="button" class="remove">제거</button>
    </div>

    <hr>

    <button type="button" class="power">${store.power}</button>
  </section>

  <hr>

  <section class="log">
    <div class="log_daily">
      ${Object.keys(store.log.daily).map(
        d => `<span>${d} : ${store.log.daily[d]}</span><br>`
      )}
    </div>

    <hr>

    <div class="log_products">
      ${store.log.products.map(
        ({ name, revenue }) => `<span>${name} : ${revenue}</span><br>`
      )}
    </div>
  </section>
  `.replace(/,/g, "");

const renderer = t => ($(".vm").innerHTML = t);
vm.render = _.pipe(template, renderer);
