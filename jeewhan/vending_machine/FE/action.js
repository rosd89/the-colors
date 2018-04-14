const selectAndProductCreator = target => {
  const { classList: [type], dataset } = target;
  const { session, products } = vm.store;
  const selectNumber = Number(
    type === "select" ? session.select : dataset.productid
  );
  const product = products[selectNumber];

  if (!product) return false;
  if (!product.stock) return false;
  if (product.price > session.change) return false;

  return { type, payload: selectNumber };
};

const addCreator = target => {
  const [name, price, isHot, stock] = target.parentElement.children;

  if (
    !name.value ||
    !price.valueAsNumber ||
    !stock.valueAsNumber ||
    vm.store.products.length === 30
  )
    return false;

  return {
    type,
    payload: {
      name: name.value,
      price: price.valueAsNumber,
      isHot: Boolean(isHot.value),
      stock: stock.valueAsNumber
    }
  };
};

const fillCreator = target => {
  const { products: p } = vm.store;
  const id = Number(target.parentElement.children[0].valueAsNumber);
  let stock = target.parentElement.children[1].valueAsNumber;

  if (!p[id]) return false;
  stock = p[id].stock + stock > 30 ? 30 - p[id].stock : stock;

  return { type, payload: { id, stock } };
};

vm.action = ({ target }) => {
  console.dir(target);

  const { classList: [type], innerText, dataset } = target;

  if (!vm.store.power && type !== "power") return false;

  switch (type) {
    case "money":
      if (!isNaN(Number(innerText)))
        return { type, payload: Number(innerText) };
      break;
    case "number":
      if (!isNaN(Number(innerText))) return { type, payload: innerText };
      break;
    case "change":
      return { type, payload: null };
    case "select":
    case "product":
      return selectAndProductCreator(target);
    case "add":
      return addCreator(target);
    case "remove":
      const id = target.previousElementSibling.valueAsNumber;
      return !vm.store.products[id] ? false : { type, payload: id };
    case "power":
      return { type, payload: target.innerText === "true" ? false : true };
    case "fill":
      return fillCreator(target);
  }

  return false;
};
