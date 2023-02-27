import { Union } from "../fable_modules/fable-library.4.0.0-theta-018/Types.js";
import { union_type, class_type } from "../fable_modules/fable-library.4.0.0-theta-018/Reflection.js";
import { iterate, append, map } from "../fable_modules/fable-library.4.0.0-theta-018/List.js";
import { toList } from "../fable_modules/fable-library.4.0.0-theta-018/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.0.0-theta-018/Range.js";
import { comparePrimitives, max, createAtom } from "../fable_modules/fable-library.4.0.0-theta-018/Util.js";
import { some } from "../fable_modules/fable-library.4.0.0-theta-018/Option.js";

export class Parallax extends Union {
    constructor(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Left", "Right"];
    }
}

export function Parallax$reflection() {
    return union_type("Parallax.Parallax", [], Parallax, () => [[["element", class_type("Browser.Types.HTMLElement", void 0, HTMLElement)]], [["element", class_type("Browser.Types.HTMLElement", void 0, HTMLElement)]]]);
}

export function ParallaxModule_bind(f, x) {
    if (x.tag === 1) {
        const x_2 = x.fields[0];
        return f(x_2);
    }
    else {
        const x_1 = x.fields[0];
        return f(x_1);
    }
}

export function nodeListToList(elements) {
    return map((i) => elements.item(i), toList(rangeDouble(0, 1, elements.length - 1)));
}

export const parallaxElements = (() => {
    const left = map((arg) => (new Parallax(0, [arg])), nodeListToList(document.getElementsByClassName("parallax-left")));
    const right = map((arg_1) => (new Parallax(1, [arg_1])), nodeListToList(document.getElementsByClassName("parallax-right")));
    return append(left, right);
})();

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

document.addEventListener("scroll", (_arg) => {
    const parallaxRate = 0.25;
    const translationValue = (element) => max(comparePrimitives, 0, parallaxRate * ((window.innerHeight / 3) - element.getBoundingClientRect().top));
    const transitionStyle = "transition: all 80ms ease-out";
    throttle(10, () => {
        iterate((element_1) => {
            if (element_1.tag === 1) {
                const element_3 = element_1.fields[0];
                element_3.setAttribute("style", `transform: translateX(${translationValue(element_3)}px); ${transitionStyle}`);
            }
            else {
                const element_2 = element_1.fields[0];
                console.log(some(translationValue(element_2)));
                element_2.setAttribute("style", `transform: translateX(-${translationValue(element_2)}px); ${transitionStyle}`);
            }
        }, parallaxElements);
    });
});

