import { useState } from "react";
import { Button, Input, PasswordInput } from "./UIComponents";
import { Mail, LockKeyholeIcon, ArrowRight } from "lucide-react";
import "./login.css";
import { useNavigate } from "react-router-dom";

export function Login(){
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [rememberMe, setRememberMe] = useState(true);
    const [error, setError] = useState();
    const navigate = useNavigate();

    async function loginSubmit(e){
        e.preventDefault();

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({login: login, password: password})
        });

        const data = await response.json();
        console.log(data);
        if(!response.ok){
            setError("пшл нх")
        }
        if(response.ok){
            localStorage.setItem("token", data.token);
            navigate('/routes');
        }
    }

    return(
        <div className="login-page">
            <div className="login-card">
                <div className="login-meta-row">
                    <span>{"[ АРХИТЕКТУРНЫЙ МАКЕТ V0.5 ]"}</span>
                    <span>{"ID: AUTH-05"}</span>
                </div>

                <div className="login-logo-box">
                    {"[ ЛОГОТИП / НАЗВАНИЕ АДМИНКИ ]"}
                </div>

                <p className="login-title">{"[ Вход в панель администратора ]"}</p>
                <p className="login-subtitle">{"[ Введите учетные данные для управления поездками ]"}</p>

                {error && (
                    <div className="login-error">
                        <span>{"[ ! ]"}</span> {error}
                    </div>
                )}

                <form onSubmit={loginSubmit}>
                    <div className="field-label-row">
                        <span className="field-label">{"[ Логин или Email ]"}</span>
                        <span className="field-note">{"*обязательно"}</span>
                    </div>
                    <Input label="" placeholder={"admin@example.com"} icon={Mail} onChange={(e) => setLogin(e.target.value)}/>

                    <div className="field-label-row field-label-row-top">
                        <span className="field-label">{"[ Пароль ]"}</span>
                        <span className="field-link">{"[ Забыли пароль? ]"}</span>
                    </div>
                    <PasswordInput label="" placeholder={"password"} icon={LockKeyholeIcon} onChange={(e) => setPassword(e.target.value)}/>

                    <div className="login-remember-row">
                        <label className="login-remember-left">
                            <input
                                type="checkbox"
                                className="login-checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            {"[ Запомнить меня ]"}
                        </label>
                        <span className="login-remember-right">{"Срок: 30 дн."}</span>
                    </div>

                    <Button text={"[ Войти ]"} type="submit" icon={ArrowRight}/>
                </form>

                <hr className="login-divider"/>

                <div className="login-footer-box">
                    <p className="login-footer-title">{"[ Вход только для уполномоченных организаторов ]"}</p>
                    <p className="login-footer-sub">{"SECURE GATEWAY • 256-BIT ENCRYPTION • LOGGED"}</p>
                </div>
            </div>
        </div>
    )
}