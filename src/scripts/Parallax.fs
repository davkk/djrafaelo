module Parallax

open Browser
open Browser.Types
open Fable.Core
open Fable.Core.JsInterop


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
        let parallaxRate = 0.2

        let translationValue (element: HTMLElement) =
            let parallax =
                parallaxRate
                * (window.pageYOffset + window.innerHeight
                   - element.offsetTop)

            let offset =
                parallaxRate
                * (element.offsetTop - window.innerHeight)

            if offset < 0 then parallax + offset else parallax

        let transitionStyle =
            "transition: all 100ms ease-out"

        let observerOptions =
            let opts =
                createEmpty<IntersectionObserverOptions>

            opts.rootMargin <- "20% 0px"
            opts

        (fun () ->
            parallaxElements
            |> List.iter (fun element ->
                let rec observer =
                    IntersectionObserver.Create(
                        (fun entries _ ->
                            entries
                            |> Array.iter (fun entry ->
                                if entry.isIntersecting then
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
                        ),
                        observerOptions
                    )

                element
                |> Parallax.bind observer.observe
            )
        )
        |> throttle 10
    )
)
