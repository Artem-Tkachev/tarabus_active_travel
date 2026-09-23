import { Link } from "react-router-dom";
import { Button, ButtonIcon } from "./UIComponents";
import { Plus } from "lucide-react";

export function AdminDashboard(){

    return(
        <div>
            <div className="routes-header">
                <p>{"[Управление поездками]"}</p>
                <Link to="/routes/create">
                    <ButtonIcon text={"[+ Создать поездку]"} icon={Plus}/>
                </Link>
            </div>
            <div className="sorting-block">
                
            </div>
            {}
        </div>
        
    )
}