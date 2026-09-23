import { Routes, Route, RouterProvider } from "react-router-dom";
import { TripDashboard } from "./dashboard";
import { Login } from "./login";
import { AdminDashboard } from "./adminDashboard";
import { CreateRoute } from "./createRoute";

function App(){
    return(
        <Routes>
            <Route path="/dashboard" element={<TripDashboard/>}/>
            <Route path="/" element={<TripDashboard/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/routes" element={<AdminDashboard/>}/>
            <Route path="/routes/create" element={<CreateRoute/>}/>
        </Routes>
    )
}

export default App