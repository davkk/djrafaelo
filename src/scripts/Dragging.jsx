import { min, comparePrimitives, max, createAtom } from "../fable_modules/fable-library.4.0.0-theta-018/Util.js";

export const sliderContainer = document.getElementById("slider");

export const rails = document.getElementById("slider-rails");

export let initX = createAtom(0);

export let currX = createAtom(0);

export let pressed = createAtom(false);

export function setCursor(value) {
    sliderContainer.setAttribute("style", `cursor: ${value}`);
}

export function dragStart(ev) {
    pressed(true);
    initX(ev.pageX - rails.getBoundingClientRect().left);
    setCursor("grabbing");
}

export function setTranslate(value) {
    rails.setAttribute("style", `transform: translateX(${value}px)`);
}

export function dragMove(ev) {
    if (!pressed()) {
    }
    else {
        ev.preventDefault();
        currX(ev.pageX);
        const deltaX = currX() - initX();
        const railsRect = rails.getBoundingClientRect();
        const sliderRect = sliderContainer.getBoundingClientRect();
        const maxDragX = sliderRect.width - railsRect.width;
        const newTranslate = max(comparePrimitives, maxDragX, min(comparePrimitives, 0, deltaX));
        setTranslate(newTranslate);
    }
}

export function dragEnd(_arg) {
    pressed(false);
    setCursor("grab");
}

sliderContainer.addEventListener("mousedown", (ev) => {
    dragStart(ev);
});

sliderContainer.addEventListener("mousemove", (ev) => {
    dragMove(ev);
});

sliderContainer.addEventListener("mouseup", (arg00$0040) => {
    dragEnd(arg00$0040);
});

sliderContainer.addEventListener("mouseleave", (arg00$0040) => {
    dragEnd(arg00$0040);
});

