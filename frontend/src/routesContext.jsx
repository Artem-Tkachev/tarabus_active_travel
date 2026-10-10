import { createContext, useContext, useState } from "react";

const RoutesContent = createContext();

export function RoutesProvider({children}){
    const [routes, setRoutes] = useState(null);

    async function loadRoutes() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/routes`, {
            headers: { "Authorization": "Bearer " + localStorage.getItem("token")}
        });
        const data = await response.json();
        setRoutes(data);
    }

    return(
        <RoutesContent.Provider value={{routes, loadRoutes}}>
            {children}
        </RoutesContent.Provider>
    );
}

export function useRoutes(){
    return useContext(RoutesContent);
}