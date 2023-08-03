import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Paint } from "./Paint"

export const PaintList = ({searchTerms}) => {
    const [paints, setPaints] = useState([])
    const [filtered, setFiltered] = useState([])
    const [onlyColor, selectColor] = useState()
    const [onlyBrand, selectBrand] = useState([])
    const [colors, setColors] = useState([])
    const [brands, setBrands] = useState([])
    const [inventory, setInventory] = useState([])
    const navigate = useNavigate()
    const localUser = localStorage.getItem("swatcher_user")
    const userObj = JSON.parse(localUser)

    useEffect(
        () => {
            const searchedPaint = paints.filter(paint => {
                return paint.name.toLowerCase().startsWith(searchTerms.toLowerCase())
            })
            setFiltered(searchedPaint)
        },
         [searchTerms]
    )

    //use effect for color selector matching to paint colorId

    const getAllPaint = () => {
        fetch(`http://localhost:8088/paints?_sort=colorId&_order=asc`).then(res => res.json())
        .then((paintArray) => {
            setPaints(paintArray)
            
        }).then(()=> {
            console.log(paints)
        })
    }

    const getAllColors = () => {
        fetch(`http://localhost:8088/colors`).then(res => res.json()).then((colorArray) => {
            setColors(colorArray)
        })
    }

    const getAllBrands = () => {
        fetch(`http://localhost:8088/brands`).then(res => res.json()).then((brandArray) =>{
            setBrands(brandArray)
        })
    }

    const getInventory = () => {
        fetch(`http://localhost:8088/palletInventory?userId=${userObj.id}`)
        .then(res => res.json()).then((data)=>{
            setInventory(data)
        })
    }

    useEffect(
        () => {
            getAllPaint()
            getAllColors()
            getAllBrands()
            getInventory()
        },
         []
    )

    useEffect(
        () => {
            setFiltered(paints)
        },
        [paints]
    )

    useEffect(
        () => {
            const colored = paints.filter(paint => {
                return paint.colorId === onlyColor
            })
            setFiltered(colored)
        },
        [onlyColor]
    )

    useEffect(
        () => {
            const branded = filtered.filter(paint => {
                return paint.brandId === onlyBrand
            })
            setFiltered(branded)
        },
        [onlyBrand]
    )
//! FOR SOME REASON COLORS ARRAY IS RETURNING EMPTY AND BREAKING EVERYTHING
    return <>
        <Typography variant="h2">Paint Stock</Typography>

        <select onChange={
        (evt) => {selectColor(parseInt(evt.target.value))}}>
            <option value="0">Colors</option>
            {colors?.map((color) => {
                return <>
                    <option key={color.id} value={color.id}>{color?.name}</option>
                </>
            })}
        </select>
        <select onChange={
            (evt) => {selectBrand(parseInt(evt.target.value))}
        }>
            <option value="0">Brands</option>
            {brands.map((brand)=> {
                return <>
                    <option key={brand.id} value={brand.id}>{brand?.name}</option>
                </>
            })}
        </select>
        <section>
            {
                filtered.map(
                    (paint) => <Paint
                    user={userObj}
                    paint={paint}
                    brands={brands}
                    colors={colors}
                    inventory={inventory}
                    getAllPaint={getAllPaint}
                    key={paint.id}/>
                )
            }
        </section>
    </>
}