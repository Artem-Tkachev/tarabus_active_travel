import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./adminDashboard.css";
import { useRoutes } from "./routesContext";

export function ArchiveRoutes(){
    const {routes, loadRoutes} = useRoutes();

    useEffect(() => {
        if(routes == null){
            loadRoutes();
        }
    }, [])

    if(routes === null){
        return(<p>Загрузка...</p>);
    }

    const archivedRoutes = routes.filter(route => route.archived === 1);

    function restoreRoute(routeID){
        // TODO: сюда запрос PUT /api/route/<id>/restore (не забыть Authorization header),
        // а после успешного ответа — await loadRoutes(), чтобы список обновился
    }

    function archiveRow(route){
        return(
            <div key={route.id} className="route-row">
                <div className="route-cell route-title-cell">
                    <div className="route-thumb">{"[ Фото ]"}</div>
                    <div>
                        <p className="route-name">{route.routeName}</p>
                        <p className="route-sub">{`Маршрут: ${route.routePlan} / Сложность: ${route.routeDifficulty}`}</p>
                    </div>
                </div>
                <div className="route-cell route-dates-cell">
                    <span>{route.routeDates}</span>
                </div>
                <div className="route-cell route-seats-cell">
                    <p>{"[ — ]"}</p>
                </div>
                <div className="route-cell route-status-cell">
                    <span className="status-badge status-past">{"[ В архиве ]"}</span>
                </div>
                <div className="route-cell route-actions-cell">
                    <button className="action-link" onClick={() => restoreRoute(route.id)}>{"Восстановить"}</button>
                </div>
            </div>
        )
    }

    return(
        <div className="routes-page">
            <div className="routes-header">
                <p>{"[ Архив поездок ]"}</p>
                <Link to="/routes" className="breadcrumb-link">{"[ < Назад к списку поездок ]"}</Link>
            </div>

            <div className="routes-table">
                <div className="routes-table-header">
                    <span>{"[ НАЗВАНИЕ ПОЕЗДКИ ]"}</span>
                    <span>{"[ ДАТЫ ПРОВЕДЕНИЯ ]"}</span>
                    <span>{"[ МЕСТА / ЗАПИСИ ]"}</span>
                    <span>{"[ СТАТУС ]"}</span>
                    <span>{"[ ДЕЙСТВИЯ ]"}</span>
                </div>

                {archivedRoutes.length === 0 ? (
                    <p style={{padding: "16px", margin: 0}}>{"[ Архив пуст ]"}</p>
                ) : (
                    archivedRoutes.map((route) => archiveRow(route))
                )}
            </div>
        </div>
    )
}
