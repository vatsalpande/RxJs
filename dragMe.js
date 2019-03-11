(function IIFE() {
  function dragMe() {
    const { fromEvent, operators } = rxjs;
    const { map, takeUntil, concatAll } = operators;
    const dragMeBtn = document.querySelector("#dragMe");
    const dragContainer = document.querySelector("#dragContainer");
    const documentMouseUp = fromEvent(dragContainer, "mouseup");
    const dragMeMouseDown = fromEvent(dragMeBtn, "mousedown");
    const documentMouseMove = fromEvent(dragContainer, "mousemove");
    const documentMouseUpDownStream = documentMouseMove.pipe(
      takeUntil(documentMouseUp)
    );
    dragMeMouseDown
      .pipe(
        map(() => documentMouseUpDownStream),
        concatAll()
        //map(item => )
      )
      .subscribe(item => {
        dragMeBtn.style.left = `${item.pageX}px`;
        dragMeBtn.style.top = `${item.pageY}px`;
        console.info(item);
      });
  }
  dragMe();
})();
