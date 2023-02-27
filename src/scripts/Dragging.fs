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

let dragStart (ev: Event) =
    pressed <- true

    initX <-
        (ev :?> MouseEvent).pageX
        - rails.getBoundingClientRect().left

    setCursor "grabbing"

let setTranslate (value: float) =
    rails.setAttribute (
        "style",
        $"transform: translateX({value}px)"
    )

let dragMove (ev: Event) =
    if not pressed then
        ()
    else
        ev.preventDefault ()

        currX <- (ev :?> MouseEvent).pageX

        let deltaX = currX - initX

        let railsRect = rails.getBoundingClientRect()
        let sliderRect = sliderContainer.getBoundingClientRect()

        let maxDragX =
            sliderRect.width
            - railsRect.width

        let newTranslate =
            max maxDragX (min 0 deltaX)

        setTranslate(newTranslate)

let dragEnd (_: Event) =
    pressed <- false
    setCursor "grab"

sliderContainer.addEventListener ("mousedown", dragStart)
sliderContainer.addEventListener ("mousemove", dragMove)
sliderContainer.addEventListener ("mouseup", dragEnd)
sliderContainer.addEventListener ("mouseleave", dragEnd)
