module Hello

open Browser
open Browser.Types
open Fable.Core.JS

let element = document.getElementById "scroll-right"

let mutable throttleTimer = false

let throttle (time: int) (callback: unit -> unit) =
    if throttleTimer then
        ()

    throttleTimer <- true

    let _ =
        setTimeout
            (fun () ->
                callback ()
                throttleTimer <- false)
            time

    ()


document.addEventListener (
    "scroll",
    (fun _ ->
        (fun () ->
            element.setAttribute (
                "style",
                $"transform: translateX({0.1 * window.scrollY}px)"
            ))
        |> throttle 10)
)
