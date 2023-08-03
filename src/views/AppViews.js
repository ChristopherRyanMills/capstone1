import { Container, Typography } from "@mui/material"
import { Outlet, Route, Routes } from "react-router-dom"
import { PaintContainer } from "../paint/PaintContainer"
import { Profile } from "../paint/Profile"
import { EditPaint, MakePaint } from "../paint/PaintForm"
import { PaintDetail } from "../paint/PaintDetail"
//this is where all the routes go
export const AppViews = () => {
    return (
        <Routes>
            <Route path="/home" element={
                <>
                <Container>
                    <Typography variant="h1">Main Page</Typography>
                    <PaintContainer/>
                    <Outlet />
                </Container>
                </>
            }>
            </Route>
                <Route path="profile/:userId" element={<Profile/>}/>
                <Route path="paints/:paintId" element={<PaintDetail/>}/>
                <Route path="make" element={<MakePaint/>}/>
                <Route path="edit/:paintId" element={<EditPaint/>}/>

        </Routes>
    )
}