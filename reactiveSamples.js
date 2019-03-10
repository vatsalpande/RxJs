(function IIFE() {
  console.info(rxjs);
  const { fromEvent, operators } = rxjs;
  const { map, filter, delay, bufferWhen, debounceTime } = operators;
  const doubleClickBtn = document.querySelector("#doubleClick");
  const tripleClickBtn = document.querySelector("#tripleClick");
  const doubleClick$ = fromEvent(doubleClickBtn, "click");
  const tripleClick$ = fromEvent(tripleClickBtn, "click");
  // const myInterval = interval(100);
  /**
   *
   * {....->......-> .. -> ...->.... -> .......->..->} ( Stream of Clicks)
   *      [Buffer(throttle(duration))]
   * { ...-> ....... -> -> ....->.....->.........-> -> }
   *  [Map To Length]
   *  [ 1 ...........2.......1.......1............2]
   *    [Filter length less than 2 ]
   *  [.............2.............................2]
   */
  const debouncedClicksStream = doubleClick$.pipe(debounceTime(250));
  const bufferClickStream = doubleClick$.pipe(
    bufferWhen(() => debouncedClicksStream)
  );
  const bufferedClicksFilteredStream = bufferClickStream.pipe(
    map(item => {
      console.info(item);
      return item.length;
    }),
    filter(item => item == 2)
  );
  bufferedClicksFilteredStream.subscribe(() => {
    document.querySelector("#infoText").innerHTML = "Double Click Happened";
  });
  bufferedClicksFilteredStream.pipe(delay(1000)).subscribe(() => {
    document.querySelector("#infoText").innerHTML = "-";
  });
  tripleClick$.subscribe(item => console.info(item));
})();
