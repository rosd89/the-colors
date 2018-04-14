vm.flow = _.pipe(
  vm.action,
  _.if2(_.not)(console.error).else(_.hi, vm.reducer, vm.render)
);

document.addEventListener("DOMContentLoaded", () => {
  Functional.go(
    fetch("http://localhost:3000/").then(res => res.json()),
    store => (vm.store = store),
    vm.render
  );

  $(".vm").addEventListener("click", vm.flow, {
    capture: true,
    passive: true
  });
});
