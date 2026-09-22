import { useState } from "react";
import { Button, Input, PasswordInput } from "./UIComponents";
import {LockIcon, LockKeyholeIcon, Mail, User, UserRound} from "lucide-react"

export function Login(){
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    async function loginSubmit(e){
        e.preventDefault();

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
            methods: "POST",
            headers: {"Content-Type": "Aplication/json"},
            body: JSON.stringify({login, password})
        });
    }

    return(
        <div>
            <form onSubmit={loginSubmit}> 
                <Input label={"[логин или email]"} placeholder={"admin@example.com"} icon={Mail} onChange={(e) => setLogin(e.target.value)}/>
                <PasswordInput label={"пароль"} placeholder={"password"} icon={LockKeyholeIcon} onChange={(e) => setPassword(e.target.value)}/>

                <Button text={"войти"} type="submit"/>
            </form>
        </div>
    )
}