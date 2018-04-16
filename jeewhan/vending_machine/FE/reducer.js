const generator = f => immer.default(vm.store, f);

const fetcher = async newStore => {
  return await fetch("http://localhost:3000/", {
    body: JSON.stringify(newStore),
    method: "POST"
  }).then(res => res.json());
};

const money = payload =>
  generator(({ session }) => {
    session.change += payload;
  });

const number = payload =>
  generator(({ session }) => {
    if (!session.select) session.select = payload;
    else if (session.select.length === 2)
      session.select = session.select[1] + payload;
    else session.select += payload;
  });

const change = payload =>
  generator(({ session }) => {
    session.change = 0;
  });

const selectAndProduct = payload => {
  clearTimeout(vm.store.timer);

  const newStore = generator(({ products, session, log, timer }) => {
    const { price } = products[payload];
    const today = dateFns.format(new Date(), "YYMMDD");
    products[payload].stock -= 1;
    session.change -= price;
    log.daily[today] ? (log.daily[today] += price) : (log.daily[today] = price);
    log.products[payload].revenue += price;
  });

  newStore.timer = setTimeout(() => {
    vm.store = generator(({ session }) => {
      session.change = 0;
    });
    vm.render(vm.store);
  }, 5000);

  return newStore;
};

const add = payload =>
  generator(({ products, log }) => {
    products.push(payload);
    log.products.push({ name: payload.name, revenue: 0 });
  });

const remove = payload =>
  generator(({ products, log }) => {
    products.splice(payload, 1);
    log.products.splice(payload, 1);
  });

const power = payload =>
  generator(({ power }) => {
    power = payload;
  });

const fill = payload =>
  generator(({ products }) => {
    products[payload.id].stock += payload.stock;
  });

const updater = {
  money,
  number,
  change,
  select: selectAndProduct,
  product: selectAndProduct,
  add,
  remove,
  power,
  fill
};

vm.reducer = ({ type, payload }) => {
  const newStore = updater[type](payload);

  return fetcher(newStore)
    ? (vm.store = newStore)
    : (console.error(newStore), {});
};
