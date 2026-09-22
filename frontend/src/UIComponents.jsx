import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

export function Input({placeholder, type="none", onChange, variant="primary", label, icon: Icon , className="", value}){
    return(
        <div className={`inp-group inp-group-${variant}`}>
            <label className="inp-label">{label}</label><br/>
            <div className="inp-wrapper">
                {Icon && <Icon className={`inp-icon inp-icon-left inp-icon-${variant}`}/>}
                <input 
                placeholder={placeholder}
                type={type} onChange={onChange} 
                className={`inp inp-${variant} ${className}`}
                value={value}
                />
            </div>
        </div>
    );
}

export function PasswordInput({placeholder, type, onChange, variant="primary", label, icon: Icon , className=""}){
    const [visible, setvisible] = useState(false);
    return(
        <div className="inp-group">
            <label className="inp-label">{label}</label><br/>
            <div className="inp-wrapper">
                {Icon && <Icon className="inp-icon inp-icon-left"/>}
                <input 
                placeholder={placeholder}
                type={visible ? "text" : "password"} onChange={onChange} 
                className={`inp inp-${variant} ${className}`}
                autoComplete="new-password"
                />
                <button type="button" className="inp-icon inp-icon-right" onClick={() => setvisible(v => !v)}>
                    {visible ? <EyeOffIcon/> : <EyeIcon/>}
                </button>
                
            </div>
        </div>
    );
}

export function Button({variant ="primary", text, Class="", type="submit", onClick={}}){
    return(
        <button className={`btn btn-${variant} ${Class}`} type={type} onClick={onClick}>
            {text}
        </button>
    )
}