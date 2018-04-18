vm.flow = _.pipe(
  vm.action,
  _.if2(_.not)(console.error).else(_.hi, vm.reducer, vm.render)
);

document.addEventListener("DOMContentLoaded", () => {
  _.go(
    fetch("http://localhost:3000/"),
    res => res.json(),
    store => (vm.store = store),
    vm.render
  );

  $(".vm").addEventListener("click", vm.flow, {
    capture: true,
    passive: true
  });
});
