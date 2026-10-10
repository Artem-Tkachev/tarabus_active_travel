import { Link } from "react-router-dom";
import { ButtonIcon } from "./UIComponents";
import { Plus, Calendar, Search, RefreshCw } from "lucide-react";
import "./adminDashboard.css";
import { useEffect, useState } from "react";
import { useRoutes } from "./routesContext";

export function AdminDashboard(){
    const {routes, loadRoutes} = useRoutes();
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        if(routes == null){
            loadRoutes();
        }
    },[])

    if(routes === null){
        return(<p>Loading...</p>);
    }

    const statusMap = {
        published: {className: "status-published", text: "[ Опубликовано ]"},
        draft: {className: "status-draft", text: "[ Черновик ]"},
        past: {className: "status-past", text: "[ Прошла ]"}
    }

    function routeRow(route){
        const status = statusMap[route.routeStatus]

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
                    <Calendar size={14}/> <span>{route.routeDates}</span>
                </div>
                <div className="route-cell route-seats-cell">
                    <p>{"6 / 10 мест"}</p>
                    <div className="seats-bar"><div className="seats-bar-fill" style={{width: "60%"}}/></div>
                </div>
                <div className="route-cell route-status-cell">
                    <span className={`status-badge ${status.className}`}>{status.text}</span>
                </div>
                <div className="route-cell route-actions-cell">
                    <Link to={`/routes/${route.id}/edit`} className="action-link">{"Редактировать"}</Link>
                    <Link to="/routes/1/bookings" className="action-btn">{"Записавшиеся (6)"}</Link>
                </div>
            </div>
        )
    }

    const routesNumber = routes.length;
    const filteredRoutes = activeFilter === "all" ? routes : routes.filter(route => route.routeStatus === activeFilter);

    return(
        <div className="routes-page">
            <div className="routes-header">
                <p>{"[ Управление поездками ]"}</p>
                <div style={{display: "flex", gap: "12px", alignItems: "center"}}>
                    <Link to="/routes/archive" className="breadcrumb-link">{"[ Архив ]"}</Link>
                    <Link to="/routes/create">
                        <ButtonIcon text={"[ + Создать поездку ]"} icon={Plus}/>
                    </Link>
                </div>
            </div>

            <div className="sorting-block">
                <div className="filter-tabs">
                    <button className={`filter-tab ${activeFilter === "all" ? "filter-tab-active" : ""}`} onClick={() => setActiveFilter("all")}>{`[ Все (${routes.length}) ]`}</button>
                    <button className={`filter-tab ${activeFilter === "published" ? "filter-tab-active" : ""}`} onClick={() => setActiveFilter("published")}>{`[ Опубликованные (${routes.filter(r => r.routeStatus === "published").length}) ]`}</button>
                    <button className={`filter-tab ${activeFilter === "draft" ? "filter-tab-active" : ""}`} onClick={() => setActiveFilter("draft")}>{`[ Черновики (${routes.filter(r => r.routeStatus === "draft").length}) ]`}</button>
                    <button className={`filter-tab ${activeFilter === "past" ? "filter-tab-active" : ""}`} onClick={() => setActiveFilter("past")}>{`[ Прошедшие (${routes.filter(r => r.routeStatus === "past").length}) ]`}</button>
                </div>
                <div className="search-box">
                    <Search size={16}/>
                    <input placeholder="[ Поиск по названию... ]"/>
                </div>
            </div>

            <div className="routes-table">
                <div className="routes-table-header">
                    <span>{"[ НАЗВАНИЕ ПОЕЗДКИ ]"}</span>
                    <span>{"[ ДАТЫ ПРОВЕДЕНИЯ ]"}</span>
                    <span>{"[ МЕСТА / ЗАПИСИ ]"}</span>
                    <span>{"[ СТАТУС ]"}</span>
                    <span>{"[ ДЕЙСТВИЯ ]"}</span>
                </div>

                {filteredRoutes.map((route) => (
                    routeRow(route)
                ))}
            </div>

            <div className="pagination-row">
                <p className="pagination-info">{`Показано ${routesNumber} из ${routesNumber} записей`}</p>
                <div className="pagination-controls">
                    <button className="page-arrow">{"‹"}</button>
                    <button className="page-num page-num-active">1</button>
                    <button className="page-num">2</button>
                    <button className="page-num">3</button>
                    <button className="page-arrow">{"›"}</button>
                </div>
            </div>

            <div className="stats-row">
                <div className="stat-card">
                    <p className="stat-label">{"[ ВСЕГО УЧАСТНИКОВ ]"}</p>
                    <p className="stat-value">{"28"}</p>
                    <p className="stat-sub">{"Лимит: 48"}</p>
                    <div className="stat-bar"><div className="stat-bar-fill" style={{width: "58%"}}/></div>
                </div>
                <div className="stat-card">
                    <p className="stat-label">{"[ АКТИВНЫЕ МАРШРУТЫ ]"}</p>
                    <p className="stat-value">{"3"}</p>
                    <p className="stat-sub">{"В этом месяце"}</p>
                </div>
                <div className="stat-card">
                    <p className="stat-label">{"[ СТАТУС СИНХРОНИЗАЦИИ ]"}</p>
                    <p className="stat-value stat-sync"><RefreshCw size={16}/> {"[ База данных обновлена ]"}</p>
                    <p className="stat-sub">{"Последний синк: 2 мин назад"}</p>
                </div>
            </div>
        </div>
    );
}
