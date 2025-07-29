import { Route, Routes } from "react-router-dom";
import ClubPage from "../components/clubs/ClubPage.jsx";
import ClubCollection from "../components/clubs/ClubCollection.jsx";
import { Outlet } from "react-router-dom";

export default function ClubsLayout() {
    return(
        <Routes>
            <Route path="/" element={        
                <div className="w-full h-full min-h-[100vh] bg-white m-0 p-0">
                    <Outlet></Outlet>
                </div>
            }>
            <Route
                index
                element={<ClubCollection></ClubCollection>}
            ></Route>
            <Route
                path="clubs/:id"
                element={<ClubPage></ClubPage>}
            ></Route>
            </Route>
        </Routes>    
    )
}