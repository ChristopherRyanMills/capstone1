import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material"

export const NavBar = () => {
    const localUser = localStorage.getItem("swatcher_user")
    const userObj = JSON.parse(localUser)
    const navigate = useNavigate()

    return (
        <AppBar position="static" sx={{bgcolor: '#691080'}}>
            <Container maxWidth="x1">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: `none`, md: `flex`}}}>
                        
                        <Button
                            key="home"
                            onClick={() => {
                                navigate("/home")
                            }}
                            sx={{ my: 2, color: `white`, display: `block`}}
                        >
                            Home
                        </Button>
                        <Button
                            key="profile"
                            onClick={() => {
                                navigate(`/profile/${userObj.id}`)
                            }}
                            sx={{ my: 2, color: `white`, display: `block`}}
                        >
                            My Pallet
                        </Button>
                        <Button
                            key="logout"
                            onClick={() => {
                                localStorage.removeItem("swatcher_user")
                                navigate("/", {replace: true})
                            }}
                            sx={{ my: 2, color: `white`, display: `block`}}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        // <ul className="navbar">
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="/home">Home</Link>
        //     </li>
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to={`/profile/${userObj.id}`}>My Pallet</Link>
        //     </li>
        //     {
        //         localStorage.getItem("swatcher_user")
        //             ? <li className="navbar__item navbar__logout">
        //                 <Link className="navbar__link" to="" onClick={() => {
        //                     localStorage.removeItem("swatcher_user")
        //                     navigate("/", {replace: true})
        //                 }}>Logout</Link>
        //             </li>
        //             : ""
        //     }
        // </ul>
    )
}