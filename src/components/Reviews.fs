module Reviews

open Fable.Core
open Fable.Core.JsInterop
open Feliz.JSX.Solid
open Thoth.Json

[<CompiledNameAttribute("ReviewType")>]
type Review =
    {
        stars: int
        content: string
        name: string
    }

type Props = { items: Review array }

let reviewDecoder: Decoder<Review> =
    Decode.object (fun get ->
        {
            Review.stars = get.Required.Field "stars" Decode.int
            Review.content = get.Required.Field "content" Decode.string
            Review.name = get.Required.Field "name" Decode.string
        }
    )

let propsDecoder: Decoder<Props> =
    Decode.object (fun get ->
        {
            Props.items =
                get.Required.Field "items" (Decode.array reviewDecoder)
        }
    )

let tryDecode<'t> value decoder callback =
    match value |> Decode.fromValue "$" decoder with
    | Ok(decoded) -> fun () -> callback decoded
    | Error err -> failwith $"Failed to decode {nameof value}: {err}"

[<JSX.Component>]
let Review (review) =
    [
        Attr.className
            "transition-all transform -translate-y-1 scale-90 origin-bottom animate-slide-up animate-once"
        [
            Html.p
                [
                    Attr.className "paragraph"
                    Html.children [ Html.text $"\"{review.content}\"" ]
                ]

            [
                Attr.className
                    "flex items-center gap-1 text-accent text-xl md:text-2xl"
                [
                    Html.h4
                        [
                            Attr.className
                                "inline-flex items-center gap-2 text-sub text-lg md:text-2xl font-serif tracking-wide after:content-['•']"

                            Html.text review.name
                            |> List.singleton
                            |> Html.children
                        ]

                    Solid.For(
                        [| 1 .. review.stars |],
                        fun _ _ -> Icons.Star()
                    )
                ]
                |> Html.children
            ]
            |> Html.div
        ]
        |> Html.children
    ]
    |> Html.div

let currentReview, setCurrentReview =
    Solid.createSignal (0)

[<JSX.Component>]
let Button classes onClick icon =
    Html.button
        [
            Attr.className (
                "absolute top-0 sm:top-1/2 sm:-translate-y-1/2 text-accent text-4xl sm:text-5xl transition-transform ease-out duration-200 transform"
                + $" {classes}"
            )
            Attr.role "button"
            Ev.onClick onClick
            icon |> List.singleton |> Html.children
        ]

let inline private (%/) x m = (x % m + m) % m

[<JSX.Component>]
let Reviews (props: JsonValue) =
    tryDecode
        props
        propsDecoder
        (fun props ->
            [
                Attr.className
                    "relative flex justify-between items-center sm:mx-10 xl:mx-40 h-[80vh] sm:h-[20vh]"

                [
                    Icons.ChevronLeft()
                    |> Button
                        "left-0 hover:-translate-x-1"
                        (fun _ ->
                            setCurrentReview (
                                (currentReview () - 1)
                                %/ props.items.Length
                            )
                        )

                    [
                        Attr.className
                            "absolute top-0 sm:top-1/2 inset-x-10 sm:inset-x-24 lg:inset-x-56 transform sm:-translate-y-1/2"
                        Solid.For(
                            props.items,
                            (fun review index ->
                                Solid.Show(
                                    currentReview () = index (),
                                    Review review
                                )
                            )
                        )
                        |> List.singleton
                        |> Html.children

                    ]
                    |> Html.div

                    Icons.ChevronRight()
                    |> Button
                        "right-0 hover:translate-x-1"
                        (fun _ ->
                            setCurrentReview (
                                (currentReview () + 1)
                                %/ props.items.Length
                            )
                        )
                ]
                |> Html.children
            ]
            |> Html.div
        )

Reviews |> exportDefault
