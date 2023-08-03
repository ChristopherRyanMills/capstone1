import { Box } from "@mui/material"
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

    return <article key={paint.id}>
        <header>
            <Link to={`/paints/${paint.id}`}>{paint.name}</Link>
        </header>
        <img src={paint.image}></img>
        <section>Color:{color?.name}</section>
        <section>Brand:{brand?.name}</section>
        <footer>
            {
                user.staff
                    ? <>
                        <button onClick={deleteButton}>Delete</button>
                    </>
                    :<></>
            }
            {
                inventory.filter((item)=> item.paintId === paint.id).length > 0
                    ?<button>Saved</button>
                    :<button onClick={saveButton}>Save to Pallet</button>
            }
        </footer>
    </article>
}