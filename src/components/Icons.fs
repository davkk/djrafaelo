module Icons

open Fable.Core

[<JSX.Component>]
let Star () =
    JSX.jsx
        $"""
        import {{ AiFillStar }} from 'solid-icons/ai';
        <AiFillStar />
    """

[<JSX.Component>]
let ChevronLeft () =
    JSX.jsx
        $"""
        import {{ BsChevronLeft }} from 'solid-icons/bs'
        <BsChevronLeft />
    """

[<JSX.Component>]
let ChevronRight () =
    JSX.jsx
        $"""
        import {{ BsChevronRight }} from 'solid-icons/bs'
        <BsChevronRight />
    """
