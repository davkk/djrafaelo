import { min, comparePrimitives, max, createAtom } from "../fable_modules/fable-library.4.0.0-theta-018/Util.js";

export const sliderContainer = document.getElementById("slider");

export const rails = document.getElementById("slider-rails");

export const arrow = document.getElementById("slider-arrow");

export let initX = createAtom(0);

export let currX = createAtom(0);

export let pressed = createAtom(false);

export function setCursor(value) {
    sliderContainer.setAttribute("style", `cursor: ${value}`);
}

export function setTranslate(value) {
    rails.setAttribute("style", `transform: translateX(${value}px)`);
}

export function dragStart(ev) {
    pressed(true);
    const railsLeft = rails.getBoundingClientRect().left;
    const matchValue = ev.type;
    if (matchValue === "mousedown") {
        initX(ev.pageX - railsLeft);
    }
    else if (matchValue === "touchstart") {
        initX(ev.touches[0].pageX - railsLeft);
    }
    setCursor("grabbing");
}

export function dragMove(ev) {
    if (!pressed()) {
    }
    else {
        const matchValue = ev.type;
        if (matchValue === "mousemove") {
            currX(ev.pageX);
        }
        else if (matchValue === "touchmove") {
            currX(ev.touches[0].pageX);
        }
        const deltaX = currX() - initX();
        const railsRect = rails.getBoundingClientRect();
        const sliderRect = sliderContainer.getBoundingClientRect();
        const maxDragX = sliderRect.width - railsRect.width;
        const newTranslate = max(comparePrimitives, maxDragX, min(comparePrimitives, 0, deltaX));
        setTranslate(newTranslate);
        if (railsRect.left < 0) {
            arrow.setAttribute("style", "opacity: 0");
        }
        else {
            arrow.setAttribute("style", "opacity: 1");
        }
    }
}

export function dragEnd(ev) {
    pressed(false);
    setCursor("grab");
}

sliderContainer.addEventListener("mousedown", (ev) => {
    dragStart(ev);
});

sliderContainer.addEventListener("touchstart", (ev) => {
    dragStart(ev);
});

sliderContainer.addEventListener("mousemove", (ev) => {
    dragMove(ev);
});

sliderContainer.addEventListener("touchmove", (ev) => {
    dragMove(ev);
});

sliderContainer.addEventListener("mouseup", (ev) => {
    dragEnd(ev);
});

sliderContainer.addEventListener("touchend", (ev) => {
    dragEnd(ev);
});

sliderContainer.addEventListener("mouseleave", (ev) => {
    dragEnd(ev);
});

sliderContainer.addEventListener("touchcancel", (ev) => {
    dragEnd(ev);
});

