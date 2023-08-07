import { Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const MakePaint = () => {
    const [paint, update] = useState({
        brandId: 0,
        name: "",
        colorId: 0,
        image: "",
        r: 0,
        g: 0,
        b: 0
    })
    const [brands, setBrands] = useState([])
    const [colors, setColors] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/brands`).then(res => res.json())
        .then((data) => {
            setBrands(data)
        })

        fetch(`http://localhost:8088/colors`).then(res => res.json())
        .then((data) => {
            setColors(data)
        })
    },
    []
    )

    // useEffect(() => {
    //     return 
    // },
    // []
    // )

    const componentToHex = (c) => {
        const hex = c.toString(16)
        return hex.length == 1 ? "0" + hex : hex
    }

    const rgbtoHex = (r,g,b) => {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
    }

    const hextoRGB = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null
    }

    const saveButton = (evt) => {
        evt.preventDefault()

        const sendMe = {
            brandId: paint.brandId,
            name: paint.name,
            colorId: paint.colorId,
            image: paint.image,
            r: paint.r,
            g: paint.g,
            b: paint.b
        }

        return fetch(`http://localhost:8088/paints`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendMe)
        }).then(res => res.json()).then(()=> {
            navigate("/home")
        })
    }

    return (
        <form id="new_paint_form">
            <Typography variant="h2">New Paint Form</Typography>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Paint name"
                        value={paint.name}
                        onChange={
                            (evt) => {
                                const copy = {...paint}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="brand">Paint Brand:</label>
                    <select id="brandBox" onChange={
                        (evt) => {
                            const copy = {...paint}
                            copy.brandId = parseInt(evt.target.value)
                            update(copy)
                        }
                    }>
                        <option value="0">Choose brand...</option>
                        {brands.map((brand) => {
                            return <option value={brand.id}>{brand.name}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="color">Paint Brand:</label>
                    <select id="colorBox" onChange={
                        (evt) => {
                            const copy = {...paint}
                            copy.colorId = parseInt(evt.target.value)
                            update(copy)
                        }
                    }>
                        <option value="0">Choose color...</option>
                        {colors.map((color) => {
                            return <option value={color.id}>{color.name}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="http//example.com/butt.jpg"
                        value={paint.image}
                        onChange={
                            (evt) => {
                                const copy = {...paint}
                                copy.image = evt.target.value
                                update(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hex">RGB Color picker</label>
                    <input
                        required autoFocus
                        type="color"
                        className="form-control"
                        value={rgbtoHex(paint.r,paint.g,paint.b)}
                        onChange={
                            (evt) => {
                                const copy = {...paint}
                                const combinedRGB = hextoRGB(evt.target.value)
                                copy.r = combinedRGB.r
                                copy.g = combinedRGB.g
                                copy.b = combinedRGB.b
                                update(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <Button onClick={(clickEvent)=>saveButton(clickEvent)} variant="contained" color="success">Save</Button>
        </form>
    )

}

//edit side
export const EditPaint = () => {
    const [paint, update] = useState({
        brandId: 0,
        name: "",
        colorId: 0,
        image: "",
        r: 0,
        g: 0,
        b: 0
    })
    const [brands, setBrands] = useState([])
    const [colors, setColors] = useState([])
    const navigate = useNavigate()
    const {paintId} = useParams()

    useEffect(()=> {
        fetch(`http://localhost:8088/paints?id=${paintId}`).then(res=>res.json()).then((data)=>{
            update(data[0])
        })

        fetch(`http://localhost:8088/brands`).then(res => res.json())
        .then((data) => {
            setBrands(data)
        })

        fetch(`http://localhost:8088/colors`).then(res => res.json())
        .then((data) => {
            setColors(data)
        })

    }, [])

    // useEffect(() => {
    //     return 
    // },
    // []
    // )

    // useEffect(() => {
    //     return 
    // },
    // []
    // )

    const componentToHex = (c) => {
        const hex = c?.toString(16)
        return hex?.length == 1 ? "0" + hex : hex
    }

    const rgbtoHex = (r,g,b) => {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
    }

    const hextoRGB = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null
    }

    const saveEditButton = (evt) => {
        evt.preventDefault()
        //! This Fetch call 404s and I have no explanation why (done)
        fetch(`http://localhost:8088/paints/${paintId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(paint)
        }).then(res => res.json()).then(()=> {
            navigate(`/paints/${paintId}`)
        })
    }

    return (
        <form id="new_paint_form">
            <Typography variant="h2">Edit </Typography>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Paint name"
                        value={paint.name}
                        onChange={
                            (evt) => {
                                const copy = {...paint}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="brand">Paint Brand:</label>
                    <select id="brandBox" value={paint.brandId}
                    onChange={
                        (evt) => {
                            const copy = {...paint}
                            copy.brandId = parseInt(evt.target.value)
                            update(copy)
                        }
                    }>
                        <option value="0">Choose brand...</option>
                        {brands.map((brand) => {
                            return <option value={brand.id}>{brand.name}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="color">Paint Brand:</label>
                    <select id="colorBox" value={paint.colorId}
                    onChange={
                        (evt) => {
                            const copy = {...paint}
                            copy.colorId = parseInt(evt.target.value)
                            update(copy)
                            console.log(paint.colorId)
                            console.log(paint.id)
                            console.log(paintId)
                        }
                    }>
                        <option value="0">Choose color...</option>
                        {colors.map((color) => {
                            return <option value={color.id}>{color.name}</option>
                        })}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="http//example.com/butt.jpg"
                        value={paint.image}
                        onChange={
                            (evt) => {
                                const copy = {...paint}
                                copy.image = evt.target.value
                                update(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="hex">RGB Color picker</label>
                    <input
                        required autoFocus
                        type="color"
                        className="form-control"
                        value={rgbtoHex(paint?.r,paint?.g,paint?.b)}
                        onChange={
                            (evt) => {
                                const copy = {...paint}
                                const combinedRGB = hextoRGB(evt.target.value)
                                copy.r = combinedRGB.r
                                copy.g = combinedRGB.g
                                copy.b = combinedRGB.b
                                update(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <Button onClick={(clickEvent)=>saveEditButton(clickEvent)} variant="contained" color="success">Save</Button>
        </form>
    )

}