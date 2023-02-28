module Parallax

open Browser
open Browser.Types

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

document.addEventListener (
    "scroll",
    (fun _ ->
        let parallaxRate = 0.2

        let translationValue (element: HTMLElement) =
            let initialElementTop =
                element.getBoundingClientRect().top
                + window.pageYOffset

            let triggerHeight =
                2. * window.innerHeight / 3.

            let translate =
                (triggerHeight
                 - element.getBoundingClientRect().top)
                |> max 0

            parallaxRate
            * (if initialElementTop < triggerHeight then
                   translate
                   + (initialElementTop - triggerHeight)
               else
                   translate)

        parallaxElements
        |> List.iter (fun element ->
            match element with
            | Left element ->
                element.setAttribute (
                    "style",
                    $"transform: translateX(-{translationValue element}px)"
                )
            | Right element ->
                element.setAttribute (
                    "style",
                    $"transform: translateX({translationValue element}px)"
                )
        )
    )
)
