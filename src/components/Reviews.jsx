import { Record } from "../fable_modules/fable-library.4.0.0-theta-018/Types.js";
import { array_type, record_type, string_type, int32_type } from "../fable_modules/fable-library.4.0.0-theta-018/Reflection.js";
import { fromValue, array, string, int, object } from "../fable_modules/Thoth.Json.10.0.0/Decode.fs.js";
import { uncurry } from "../fable_modules/fable-library.4.0.0-theta-018/Util.js";
import { Show, createSignal, For } from "solid-js";
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
        const err = matchValue.fields[0];
        throw new Error(`Failed to decode ${"value"}: ${err}`);
    }
    else {
        const decoded = matchValue.fields[0];
        return () => callback(decoded);
    }
}

export function Review($props) {
    return <div class="transition-all transform -translate-y-1 scale-90 origin-bottom animate-slide-up animate-once">
        <p class="paragraph">
            {`"${$props.review.content}"`}
        </p>
        <div class="flex items-center gap-1 text-accent text-xl md:text-2xl">
            <h4 class="inline-flex items-center gap-2 text-sub text-lg md:text-2xl font-serif tracking-wide after:content-['•']">
                {$props.review.name}
            </h4>
            <For each={toArray(rangeDouble(1, 1, $props.review.stars))}>
                {(_arg, _arg_1) => <Star></Star>}
            </For>
        </div>
    </div>;
}

export const patternInput$004079$002D140 = createSignal(0);

export const setCurrentReview = patternInput$004079$002D140[1];

export const currentReview = patternInput$004079$002D140[0];

export function Button($props) {
    return <button class={"absolute top-0 sm:top-1/2 sm:-translate-y-1/2 text-accent text-4xl sm:text-5xl transition-transform ease-out duration-200 transform" + (` ${$props.classes}`)}
        role={join(" ", ["button"])}
        onClick={$props.onClick}>
        {$props.icon}
    </button>;
}

export function Reviews($props) {
    return tryDecode($props.props, uncurry(2, propsDecoder), (props_1) => <div class="relative flex justify-between items-center sm:mx-10 xl:mx-40 h-[80vh] sm:h-[20vh]">
        <Button classes="left-0 hover:-translate-x-1"
            onClick={(_arg) => {
                let x, m;
                setCurrentReview((x = ((currentReview() - 1) | 0), (m = (props_1.items.length | 0), ((x % m) + m) % m)));
            }}
            icon={<ChevronLeft></ChevronLeft>}></Button>
        <div class="absolute top-0 sm:top-1/2 inset-x-10 sm:inset-x-24 lg:inset-x-56 transform sm:-translate-y-1/2">
            <For each={props_1.items}>
                {(review, index) => <Show when={currentReview() === index()}>
                    <Review review={review}></Review>
                </Show>}
            </For>
        </div>
        <Button classes="right-0 hover:translate-x-1"
            onClick={(_arg_1) => {
                let x_1, m_1;
                setCurrentReview((x_1 = ((currentReview() + 1) | 0), (m_1 = (props_1.items.length | 0), ((x_1 % m_1) + m_1) % m_1)));
            }}
            icon={<ChevronRight></ChevronRight>}></Button>
    </div>);
}

export default ((props) => <Reviews props={props}></Reviews>);

