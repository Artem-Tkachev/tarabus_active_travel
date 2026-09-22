import { Routes, Route, RouterProvider } from "react-router-dom";
import { TripDashboard } from "./dashboard";
import { Login } from "./login";

function App(){
    return(
        <Routes>
            <Route path="/dashboard" element={<TripDashboard/>}/>
            <Route path="/" element={<TripDashboard/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    )
}

export default App