module Dragging

open Browser
open Browser.Types

let sliderContainer =
    document.getElementById "slider"

let rails =
    document.getElementById "slider-rails"

let mutable initX = 0.0
let mutable currX = 0.0
let mutable pressed = false

let setCursor (value: string) =
    sliderContainer.setAttribute ("style", $"cursor: {value}")

let setTranslate (value: float) =
    rails.setAttribute ("style", $"transform: translateX({value}px)")

let dragStart (ev: Event) =
    pressed <- true

    let railsLeft =
        rails.getBoundingClientRect().left

    match ev.``type`` with
    | "mousedown" -> initX <- (ev :?> MouseEvent).pageX - railsLeft
    | "touchstart" ->
        initX <-
            (ev :?> TouchEvent).touches[0].pageX
            - railsLeft
    | _ -> ()

    setCursor "grabbing"

let dragMove (ev: Event) =
    if not pressed then
        ()
    else

        match ev.``type`` with
        | "mousemove" -> currX <- (ev :?> MouseEvent).pageX
        | "touchmove" -> currX <- (ev :?> TouchEvent).touches[0].pageX
        | _ -> ()

        let deltaX = currX - initX

        let railsRect =
            rails.getBoundingClientRect ()

        let sliderRect =
            sliderContainer.getBoundingClientRect ()

        let maxDragX =
            sliderRect.width - railsRect.width

        let newTranslate =
            max maxDragX (min 0 deltaX)

        setTranslate (newTranslate)

let dragEnd (ev: Event) =
    pressed <- false
    setCursor "grab"

sliderContainer.addEventListener ("mousedown", dragStart)
sliderContainer.addEventListener ("touchstart", dragStart)

sliderContainer.addEventListener ("mousemove", dragMove)
sliderContainer.addEventListener ("touchmove", dragMove)

sliderContainer.addEventListener ("mouseup", dragEnd)
sliderContainer.addEventListener ("touchend", dragEnd)

sliderContainer.addEventListener ("mouseleave", dragEnd)
sliderContainer.addEventListener ("touchcancel", dragEnd)
