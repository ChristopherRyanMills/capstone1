import { Box, Button, createTheme } from "@mui/material"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Paint = ({ paint, user, brands, colors, getAllPaint, inventory}) => {
    const color = colors.find( color => color.id === paint.colorId)
    const brand = brands.find( brand => brand.id === paint.brandId)
    const navigate = useNavigate()
    

    const deleteButton = () => {
        fetch(`http://localhost:8088/paints/${paint.id}`, {
            method: "DELETE"
        }).then(() => {
            getAllPaint()
        })
    }

    const saveButton = () => {
        const sendMe = {
            userId: user.id,
            paintId: paint.id
        }
        
        return fetch(`http://localhost:8088/palletInventory`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendMe)
        }).then(res => res.json()).then(()=>{
            window.alert("Saved to pallet.")
            navigate('/home')
        })
    }

    return <Box 
            sx={{
                border: '3px solid',
                borderColor: 'purple',
                width: 260,
                m: 2
            }}
            key={paint.id}>
        <header>
            <Button variant="text" onClick={() => {navigate(`/paints/${paint.id}`)}}>{paint.name}</Button>
        </header>
        <img src={paint.image} width={250} height={300}></img>
        <Box sx={{outline: '2px solid purple'}}>
            <Box sx={{ m: '4px'}}>Color:{color?.name}</Box>
            <Box sx={{ m: '4px'}}>Brand:{brand?.name}</Box>
        </Box>
        <footer>
            {
                user.staff
                    ? <>
                        <Button onClick={deleteButton} variant="outlined" color="error">Delete</Button>
                    </>
                    :<></>
            }
            {
                inventory.filter((item)=> item.paintId === paint.id).length > 0
                    ?<Button size="small" disabled color="success">Saved</Button>
                    :<Button size="small" color="success" variant="contained" onClick={saveButton}>Save to Pallet</Button>
            }
        </footer>
    </Box>
}