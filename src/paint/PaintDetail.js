import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { findMatch } from "../calculation/comparison"

export const PaintDetail = () => {
    const {paintId} = useParams()
    const [paint, update] = useState({})
    const [paintArray, setpaint] = useState([])
    const [citadel, setC] = useState([])
    const [vallejoGame, setVG] = useState([])
    const [vallejoModel, setVM] = useState([])
    const [scale75, setS] = useState([])
    const [personal, setPersonal] = useState([])
    const [matchingC, setMatchC] = useState()
    const [matchingVG, setMatchVG] = useState()
    const [matchingVM, setMatchVM] = useState()
    const [matchingS, setMatchS] = useState()
    const [matchingP, setMatchP] = useState()
    const localUser = localStorage.getItem("swatcher_user")
    const userObj = JSON.parse(localUser)
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/paints?_expand=brand`).then(res=>res.json())
            .then((data) => {
                setpaint(data)

            })

            fetch(`http://localhost:8088/palletInventory?_expand=paint&userId=${userObj.id}`)
            .then(res => res.json()).then((pallet) => {
                setPersonal(pallet)
            })
        },
        [paintId]
    )

    useEffect (
        () => {
            const singlePaint = paintArray.find((paint) => parseInt(paintId) === paint.id)
            update(singlePaint)
        }, [paintArray]
    )

    useEffect(
        () => {
            setC(paintArray.filter((paint) => paint?.brandId === 1))
            setVG(paintArray.filter((paint) => paint?.brandId === 2))
            setVM(paintArray.filter((paint) => paint?.brandId === 3))
            setS(paintArray.filter((paint) => paint?.brandId === 4))
        },
        [paint]
    )

    useEffect(
        () => {
            if (paint) {
            setMatchC(findMatch(paint, citadel))
            setMatchVG(findMatch(paint, vallejoGame))
            setMatchVM(findMatch(paint, vallejoModel))
            setMatchS(findMatch(paint, scale75))
            }
            /*if (personal[0]) {setMatchP(findMatch(paint, personal))}*/
        },
        [citadel]
    )

    const deleteButton = () => {
        fetch(`http://localhost:8088/paints/?id=${paint.id}`, {
            method: "DELETE"
        }).then(() => {
            navigate("/home")
        })
    }
    
    return <>
        <section id="paintItem">
        <img src={paint?.image} width={250} height={300}></img>
        <Typography variant="h3">{paint?.name}</Typography>
        <Typography variant="h3">Brand: {paint?.brand?.name}</Typography>
        {
            userObj.staff
            ?<>
                <Button onClick={deleteButton} variant="contained" color="error">Delete</Button>
                <Button variant="contained" color="primary" onClick={() => {navigate(`/edit/${paintId}`)}}>Edit</Button>
            </>
            :<></>
        }
    </section>
    <section id="paintCompare">
        <Box id="allPaintCompare" m={'20px'} border={'5px solid purple'}>
            <Typography variant="h3">Closest Paints by Brand</Typography>
            <Box display={'flex'} flexWrap={'wrap'}>
                <Box id="byBrand" width={1/4}>
                    <Typography variant="h3">Citadel</Typography>
                    <img src={matchingC?.image} width={250} height={300}></img>
                    <Typography variant="h4">{matchingC?.name}</Typography>
                </Box>
                <Box id="byBrand" width={1/4}>
                    <Typography variant="h3">Vallejo Game Color</Typography>
                    <img src={matchingVG?.image} width={250} height={300}></img>
                    <Typography variant="h4">{matchingVG?.name}</Typography>
                </Box>
                <Box id="byBrand" width={1/4}>
                    <Typography variant="h3">Vallejo Model Color</Typography>
                    <img src={matchingVM?.image} width={250} height={300}></img>
                    <Typography variant="h4">{matchingVM?.name}</Typography>
                </Box>
                <Box id="byBrand" width={1/4}>
                    <Typography variant="h3">Scale 75</Typography>
                    <img src={matchingS?.image} width={250} height={300}></img>
                    <Typography variant="h4">{matchingS?.name}</Typography>
                </Box>
            </Box>
        </Box>
    </section></>
}