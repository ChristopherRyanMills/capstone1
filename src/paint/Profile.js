import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

export const Profile = () => {
    const {userId} = useParams()
    const [inventory, setInventory] = useState([])
    const [userObj, setUserObj] = useState()
    const [brands, setBrands] = useState([])
    const navigate = useNavigate()

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
    <Box id="profile_box">
        <img src={userObj?.pic}></img>
        <Typography variant="h3">Username:{userObj?.fullName}</Typography>
    
    {
        userObj?.isStaff
        ?<Button variant="contained" color="primary" onClick={() => {navigate("/make")}}>Add new paint</Button>
        : <></>
    }
    </Box>
    <Box id="pallet">
        <Typography variant="h2">My Paints:</Typography>
        <Box display={"flex"} flexWrap={"wrap"}>
        {
            inventory.map((single) => {
                return <><Box key={single.id} sx={{padding: '8px'}}>
                    <img src={single.paint?.image} width={250} height={300}></img>
                    <Typography variant="h4">{single.paint?.name}</Typography>
                    <Typography variant="h4">Brand:{brands.find(brand => brand.id === single.paint?.brandId)?.name ?? 'N/A'}</Typography>
                    <footer>
                        <Button onClick={()=>deleteMe(single.id)} variant="outlined" color="error">Remove from pallet</Button>
                    </footer>
                </Box>
                </>
            })
        }
        </Box>
    </Box>
    </>
}