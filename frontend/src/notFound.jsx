import { Link, useNavigate } from "react-router-dom";
import "./createRoute.css";
import "./notFound.css";

export function NotFound(){
    const navigate = useNavigate();

    return(
        <div className="nf-page">
            <div className="nf-card">
                <div className="nf-meta-row">
                    <span>{"■ [ HTTP_STATUS: 404_NOT_FOUND ]"}</span>
                    <span className="nf-meta-right">{"SYS.LOC_ERR // NULL_ROUTE"}</span>
                </div>

                <div className="nf-icon-box">
                    <div className="nf-icon-tag">{"[ 404 ]"}</div>
                </div>

                <h1 className="nf-heading">{"[ СТРАНИЦА НЕ НАЙДЕНА ]"}</h1>
                <p className="nf-subtext">{"Запрошенная страница не существует, была удалена или перемещена по другому адресу."}</p>

                <div className="nf-actions">
                    <Link to="/" className="btn btn-primary">{"[ ВЕРНУТЬСЯ НА ГЛАВНУЮ СТРАНИЦУ ]"}</Link>
                    <button className="btn btn-secondary" onClick={() => navigate(-1)}>{"[ ШАГ НАЗАД ]"}</button>
                </div>

                <div className="nf-footer">
                    <div className="nf-footer-links">
                        <Link to="/dashboard">{"[ Посмотреть доступные поездки ]"}</Link>
                        <span>{"|"}</span>
                        <a href="mailto:support@tarabus.local">{"[ Связаться с поддержкой ]"}</a>
                        <span>{"|"}</span>
                        <Link to="/dashboard">{"[ Карта сайта ]"}</Link>
                    </div>
                    <p className="nf-version">{"SPEC: WF_PAGE_404 // VER 1.0.4 // GRID_SNAP: TRUE"}</p>
                </div>
            </div>
        </div>
    );
}
