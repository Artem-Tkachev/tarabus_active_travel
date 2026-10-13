import { Routes, Route, Navigate } from "react-router-dom";
import { TripDashboard } from "./dashboard";
import { Login } from "./login";
import { AdminDashboard } from "./adminDashboard";
import { CreateRoute } from "./createRoute";
import { EditRoute } from "./editRoute";
import { ArchiveRoutes } from "./archiveRoutes";
import { BookingPage } from "./booking";
import { BookingConfirmation } from "./bookingConfirmation";
import { BookingManage } from "./bookingManage";
import { AdminBookings } from "./adminBookings";
import { NotFound } from "./notFound";

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
            <Route path="" element={<TripDashboard/>}/>
            <Route path="/" element={<TripDashboard/>}/>
            <Route path="/dashboard" element={<TripDashboard/>}/>
            <Route path="/trip/:routeID" element={<BookingPage/>}/>
            <Route path="/booking/:bookingID/confirmation" element={<BookingConfirmation/>}/>
            <Route path="/booking/:bookingID" element={<BookingManage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/routes" element={<RequiredAuth><AdminDashboard/></RequiredAuth>}/>
            <Route path="/routes/create" element={<RequiredAuth><CreateRoute/></RequiredAuth>}/>
            <Route path="/routes/archive" element={<RequiredAuth><ArchiveRoutes/></RequiredAuth>}/>
            <Route path="/routes/:routeID/edit" element={<RequiredAuth><EditRoute/></RequiredAuth>}/>
            <Route path="/routes/:routeID/bookings" element={<RequiredAuth><AdminBookings/></RequiredAuth>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}

export default App
