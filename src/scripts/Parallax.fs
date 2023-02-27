module Parallax

open Browser
open Browser.Types
open Fable.Core


type Parallax =
    | Left of element: HTMLElement
    | Right of element: HTMLElement

module Parallax =
    let bind f x =
        match x with
        | Left x -> f x
        | Right x -> f x

let nodeListToList (elements: NodeListOf<Element>) =
    [ 0 .. elements.length - 1 ]
    |> List.map (fun i -> elements.item i :?> HTMLElement)

let parallaxElements =
    let left =
        document.getElementsByClassName "parallax-left"
        |> nodeListToList
        |> List.map Left

    let right =
        document.getElementsByClassName "parallax-right"
        |> nodeListToList
        |> List.map Right

    left @ right

let mutable throttleTimer = false

let throttle (time: int) (callback: unit -> unit) =
    if throttleTimer then
        ()

    throttleTimer <- true

    let _ =
        JS.setTimeout
            (fun () ->
                callback ()
                throttleTimer <- false
            )
            time

    ()


document.addEventListener (
    "scroll",
    (fun _ ->
        let parallaxRate = 0.25

        let translationValue (element: HTMLElement) =
            (parallaxRate
             * (window.innerHeight / 3.
                - element.getBoundingClientRect().top))
            |> max 0


        let transitionStyle =
            "transition: all 80ms ease-out"

        (fun () ->
            parallaxElements
            |> List.iter (fun element ->
                match element with
                | Left element ->
                    element.setAttribute (
                        "style",
                        $"transform: translateX(-{translationValue element}px); {transitionStyle}"
                    )
                | Right element ->
                    element.setAttribute (
                        "style",
                        $"transform: translateX({translationValue element}px); {transitionStyle}"
                    )
            )
        )
        |> throttle 10
    )
)
