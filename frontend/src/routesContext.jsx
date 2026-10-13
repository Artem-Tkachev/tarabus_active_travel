import { createContext, useContext, useState } from "react";

const RoutesContent = createContext();

export function RoutesProvider({children}){
    const [routes, setRoutes] = useState(null);

    async function loadRoutes() {
        const token = localStorage.getItem("token");

        if(token){
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/routes`, {
                headers: { "Authorization": "Bearer " + token }
            })
            if(response.ok){
                setRoutes(await response.json());
                return;
            }
            // токен есть, но сервер его не принял (протух/невалиден) — не блокируем
            // посетителя 401-кой, стираем мёртвый токен и идём на публичный список
            localStorage.removeItem("token");
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/public/routes`);
        setRoutes(await response.json());
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
