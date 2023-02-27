import { createAtom } from "../fable_modules/fable-library.4.0.0-theta-018/Util.js";

export let throttleTimer = createAtom(false);

export function throttle(time, callback) {
    if (throttleTimer()) {
    }
    throttleTimer(true);
    setTimeout(() => {
        callback();
        throttleTimer(false);
    }, time);
}

