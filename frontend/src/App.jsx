import { Routes, Route, Navigate } from "react-router-dom";
import { TripDashboard } from "./dashboard";
import { Login } from "./login";
import { AdminDashboard } from "./adminDashboard";
import { CreateRoute } from "./createRoute";
import { EditRoute } from "./editRoute";
import { ArchiveRoutes } from "./archiveRoutes";
import { BookingPage } from "./booking";

function RequiredAuth({children}){
    const token = localStorage.getItem('token');
    if(!token){
        return <Navigate to={"/login"} replace/>;
    }
    return children;
}

function App(){
    return(
        <Routes>
            <Route path="/dashboard" element={<TripDashboard/>}/>
            <Route path="/trip/:routeID" element={<BookingPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/routes" element={<RequiredAuth><AdminDashboard/></RequiredAuth>}/>
            <Route path="/routes/create" element={<RequiredAuth><CreateRoute/></RequiredAuth>}/>
            <Route path="/routes/archive" element={<RequiredAuth><ArchiveRoutes/></RequiredAuth>}/>
            <Route path="/routes/:routeID/edit" element={<RequiredAuth><EditRoute/></RequiredAuth>}/>
        </Routes>
    )
}

export default App
