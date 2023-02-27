module Throttle

open Fable.Core

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
