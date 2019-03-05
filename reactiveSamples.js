(function IIFE() {
  console.info(rxjs);
  const { fromEvent, operators, interval } = rxjs;
  const { map, filter, buffer, throttleTime } = operators;
  const doubleClickBtn = document.querySelector("#doubleClick");
  const tripleClickBtn = document.querySelector("#tripleClick");
  const doubleClick$ = fromEvent(doubleClickBtn, "click");
  const tripleClick$ = fromEvent(tripleClickBtn, "click");
  // const myInterval = interval(100);
  doubleClick$
    .pipe(
      buffer(throttleTime(5000)),
      map(item => item.length)
    )
    .subscribe(item => {
      document.querySelector("#infoText").innerHTML = item;
    });
  tripleClick$.subscribe(item => console.info(item));
})();
