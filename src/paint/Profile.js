import { Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export const Profile = () => {
    const {userId} = useParams()
    const [inventory, setInventory] = useState([])
    const [userObj, setUserObj] = useState()
    const [brands, setBrands] = useState([])

    const renderInventory = () => {
        fetch(`http://localhost:8088/palletInventory?_expand=paint&userId=${userId}`)
            .then(res => res.json()).then((data)=> {
                setInventory(data)
            })
    }

    const deleteMe = (id) => {
        fetch(`http://localhost:8088/palletInventory/${id}`, {
            method: "DELETE"
        }).then(renderInventory())
    }

    useEffect(
        () => {
            renderInventory()
            fetch(`http://localhost:8088/users?id=${parseInt(userId)}`).then(res=>res.json())
            .then((data)=>{
                setUserObj(data[0])
                console.log(userObj)
            })
            fetch(`http://localhost:8088/brands`).then(res=>res.json())
            .then((data)=>{
                setBrands(data)
            })
        },
        []
    )

    return <>
    <article id="profile_box">
        <img src={userObj?.pic}></img>
        <Typography variant="h3">Username:{userObj?.fullName}</Typography>
    </article>
    {
        userObj?.isStaff
        ?<Link to="/make">Add new paint</Link>
        : <></>
    }
    <article id="pallet">
        <Typography variant="h2">My Paints:</Typography>
        {
            inventory.map((single) => {
                return <><section key={single.id}>
                    <img src={single.paint?.image}></img>
                    <Typography variant="h4">{single.paint?.name}</Typography>
                    <Typography variant="h4">Brand:{brands.find(brand => brand.id === single.paint?.brandId)?.name ?? 'N/A'}</Typography>
                    <footer>
                        <button onClick={()=>deleteMe(single.id)}>Remove from pallet</button>
                    </footer>
                </section>
                </>
            })
        }
    </article>
    </>
}