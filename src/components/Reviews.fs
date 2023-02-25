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

let currentReview, setCurrentReview =
    Solid.createSignal (0)

[<JSX.Component>]
let Review (review) =
    let stars =
        Solid.For([| 1 .. review.stars |], (fun _ _ -> Icons.Star()))

    let name =
        Html.h4
            [
                Attr.className
                    "inline-flex items-center gap-2 text-sub text-base sm:text-lg md:text-2xl font-serif tracking-wide before:content-['•']"

                Html.text review.name
                |> List.singleton
                |> Html.children
            ]

    [
        Attr.className
            "text-center opactiy-0 transition-all transform -translate-y-1 scale-90 origin-left animate-slide-up animate-once"
        Html.children
            [
                Html.p
                    [
                        Attr.className "paragraph"
                        Html.children [ Html.text $"\"{review.content}\"" ]
                    ]
                [
                    Attr.className
                        "inline-flex items-center gap-2 text-accent text-xl md:text-2xl"
                    Html.children [ stars; name ]
                ]
                |> Html.div

            ]
    ]
    |> Html.div

let inline private (%/) x m = (x % m + m) % m

[<JSX.Component>]
let Reviews (props: JsonValue) =
    tryDecode
        props
        propsDecoder
        (fun props ->
            let buttonClasses =
                "text-accent text-4xl transition-transform ease-out duration-200 absolute bottom-full sm:static"

            let buttonLeft =
                Html.button
                    [
                        Attr.className
                            $"{buttonClasses} sm:hover:-translate-x-1 left-0"
                        Attr.role "button"
                        Ev.onClick (fun _ ->
                            setCurrentReview (
                                (currentReview () - 1)
                                %/ props.items.Length
                            )
                        )
                        Icons.ChevronLeft()
                        |> List.singleton
                        |> Html.children
                    ]

            let buttonRight =
                Html.button
                    [
                        Attr.className
                            $"{buttonClasses} sm:hover:translate-x-1 right-0"
                        Attr.role "button"
                        Ev.onClick (fun _ ->
                            setCurrentReview (
                                (currentReview () - 1)
                                %/ props.items.Length
                            )
                        )
                        Icons.ChevronRight()
                        |> List.singleton
                        |> Html.children
                    ]

            let reviews =
                Solid.For(
                    props.items,
                    (fun review index ->
                        Solid.Show(currentReview () = index (), Review review)
                    )
                )

            [
                Attr.className
                    "relative flex flex-col justify-center items-center gap-5 h-[33vh] max-h-[500px] p-5"
                Html.children
                    [
                        [
                            Attr.className
                                "max-w-[1000px] w-full absolute top-0 sm:top-1/2 left-1/2 flex gap-10 md:gap-32 h-fit transform -translate-x-1/2 sm:-translate-y-1/2 pt-8"
                            Html.children [ buttonLeft; reviews; buttonRight ]
                        ]
                        |> Html.div
                    ]
            ]
            |> Html.div
        )

Reviews |> exportDefault
