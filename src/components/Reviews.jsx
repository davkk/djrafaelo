import { Record } from "../fable_modules/fable-library.4.0.0-theta-018/Types.js";
import { array_type, record_type, string_type, int32_type } from "../fable_modules/fable-library.4.0.0-theta-018/Reflection.js";
import { fromValue, array, string, int, object } from "../fable_modules/Thoth.Json.10.0.0/Decode.fs.js";
import { uncurry } from "../fable_modules/fable-library.4.0.0-theta-018/Util.js";
import { Show, For, createSignal } from "solid-js";
import { ChevronRight, ChevronLeft, Star } from "./Icons.jsx";
import { toArray } from "../fable_modules/fable-library.4.0.0-theta-018/Seq.js";
import { rangeDouble } from "../fable_modules/fable-library.4.0.0-theta-018/Range.js";
import { join } from "../fable_modules/fable-library.4.0.0-theta-018/String.js";

export class ReviewType extends Record {
    constructor(stars, content, name) {
        super();
        this.stars = (stars | 0);
        this.content = content;
        this.name = name;
    }
}

export function ReviewType$reflection() {
    return record_type("Reviews.ReviewType", [], ReviewType, () => [["stars", int32_type], ["content", string_type], ["name", string_type]]);
}

export class Props extends Record {
    constructor(items) {
        super();
        this.items = items;
    }
}

export function Props$reflection() {
    return record_type("Reviews.Props", [], Props, () => [["items", array_type(ReviewType$reflection())]]);
}

export const reviewDecoder = (path_2) => ((v) => object((get$) => {
    let objectArg, objectArg_1, objectArg_2;
    return new ReviewType((objectArg = get$.Required, objectArg.Field("stars", uncurry(2, int))), (objectArg_1 = get$.Required, objectArg_1.Field("content", string)), (objectArg_2 = get$.Required, objectArg_2.Field("name", string)));
}, path_2, v));

export const propsDecoder = (path_1) => ((v) => object((get$) => {
    let objectArg;
    return new Props((objectArg = get$.Required, objectArg.Field("items", (path, value) => array(uncurry(2, reviewDecoder), path, value))));
}, path_1, v));

export function tryDecode(value, decoder, callback) {
    const matchValue = fromValue("$", decoder, value);
    if (matchValue.tag === 1) {
        throw new Error(`Failed to decode ${"value"}: ${matchValue.fields[0]}`);
    }
    else {
        return () => callback(matchValue.fields[0]);
    }
}

export const patternInput$004040 = createSignal(0);

export const setCurrentReview = patternInput$004040[1];

export const currentReview = patternInput$004040[0];

export function Review($props) {
    const stars = <For each={toArray(rangeDouble(1, 1, $props.review.stars))}>
        {(_arg, _arg_1) => <Star></Star>}
    </For>;
    const name = <h4 class="inline-flex items-center gap-2 text-sub text-base sm:text-lg md:text-2xl font-serif tracking-wide before:content-['•']">
        {$props.review.name}
    </h4>;
    return <div class="text-center opactiy-0 transition-all transform -translate-y-1 scale-90 origin-left animate-slide-up animate-once">
        <p class="paragraph">
            {`"${$props.review.content}"`}
        </p>
        <div class="inline-flex items-center gap-2 text-accent text-xl md:text-2xl">
            {stars}
            {name}
        </div>
    </div>;
}

export function Reviews($props) {
    return tryDecode($props.props, uncurry(2, propsDecoder), (props_1) => {
        const buttonClasses = "text-accent text-4xl transition-transform ease-out duration-200 absolute bottom-full sm:static";
        const buttonLeft = <button class={`${buttonClasses} sm:hover:-translate-x-1 left-0`}
            role={join(" ", ["button"])}
            onClick={(_arg) => {
                let x, m;
                setCurrentReview((x = ((currentReview() - 1) | 0), (m = (props_1.items.length | 0), ((x % m) + m) % m)));
            }}>
            <ChevronLeft></ChevronLeft>
        </button>;
        const buttonRight = <button class={`${buttonClasses} sm:hover:translate-x-1 right-0`}
            role={join(" ", ["button"])}
            onClick={(_arg_1) => {
                let x_1, m_1;
                setCurrentReview((x_1 = ((currentReview() - 1) | 0), (m_1 = (props_1.items.length | 0), ((x_1 % m_1) + m_1) % m_1)));
            }}>
            <ChevronRight></ChevronRight>
        </button>;
        return <div class="relative flex flex-col justify-center items-center gap-5 h-[33vh] max-h-[500px] p-5">
            <div class="max-w-[1000px] w-full absolute top-0 sm:top-1/2 left-1/2 flex gap-10 md:gap-32 h-fit transform -translate-x-1/2 sm:-translate-y-1/2 pt-8">
                {buttonLeft}
                <For each={props_1.items}>
                    {(review, index) => <Show when={currentReview() === index()}>
                        <Review review={review}></Review>
                    </Show>}
                </For>
                {buttonRight}
            </div>
        </div>;
    });
}

export default ((props) => <Reviews props={props}></Reviews>);

