import { Link } from "react-router-dom";
import { User } from "lucide-react";
import "./dashboard.css";
import { useEffect } from "react";
import { useRoutes } from "./routesContext";

export function TripDashboard(){
    const {routes, loadRoutes} = useRoutes();

    useEffect(() => {
        if(routes == null){
            loadRoutes();
        }
    },[])

    if(routes === null){
        return(<p>loading...</p>);
    }

    function routeCard(route){
        return(
            <div key={route.id} className="trip-card">
                <div className="trip-card-photo">{"[ Фото / Превью 16:9 ]"}</div>
                <div className="trip-card-body">
                    <p className="trip-card-dates">{`[ Дата проведения: ${route.routeDates} ]`}</p>
                    <p className="trip-card-name">{`[ ${route.routeName} ]`}</p>
                    <p className="trip-card-desc">{`[ ${route.routeDiscription} ]`}</p>
                    <div className="trip-card-footer">
                        <p className="trip-card-price">{"[ Стоимость ]"}<br/>{`[ ${route.routePrice} ₽ ]`}</p>
                        <Link to={`/trip/${route.id}`} className="trip-card-link">{"[ Подробнее ]"}</Link>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="site-page">
            <header className="site-header">
                <p className="site-logo">{"[ Логотип / Название сайта ]"}</p>
                <nav className="site-nav">
                    <Link to="/dashboard" className="nav-link">{"[ Поездки ]"}</Link>
                    <Link to="/" className="nav-link">{"[ Контакты ]"}</Link>
                    <span className="nav-icon"><User size={18}/></span>
                </nav>
            </header>

            <p className="breadcrumb-row">{"[ СТРАНИЦА: КАТАЛОГ ТУРОВ ]  /  [ МОДУЛЬ ВЫБОРА МАРШРУТА ]"}</p>

            <div className="trip-dashboard-header">
                <p className="page-title">{"[ Заголовок страницы: Доступные поездки и туры ]"}</p>
                <p className="page-subtitle">{"[ Краткое описание раздела: подборка актуальных групповых и индивидуальных маршрутов по ключевым природным и культурным локациям с подтверждённым расписанием на сезон 2025 года ]"}</p>
            </div>

            {/* TODO: значения фильтров и сортировки, а также сам фильтр-запрос по routes — твоя часть */}
            <div className="catalog-filters">
                <select className="filter-select">
                    <option>{"[ Все направления ]"}</option>
                </select>
                <select className="filter-select">
                    <option>{"[ Любая дата ]"}</option>
                </select>
                <select className="filter-select">
                    <option>{"[ Сложность: Все ]"}</option>
                </select>
                <button className="filter-reset">{"[ Сбросить фильтры ]"}</button>
                <div className="catalog-sort">
                    <span>{"Сортировка:"}</span>
                    <select className="filter-select">
                        <option>{"[ По дате начала ]"}</option>
                    </select>
                </div>
            </div>

            <div className="catalog-results-row">
                <p>{`[ Найдено туров: ${routes.length} записи ]`}</p>
                <p>{"[ Страница 1 из 4 ]"}</p>
            </div>

            <div className="trip-grid">
                {routes.map((route) => (
                    routeCard(route)
                ))}
            </div>

            <button className="catalog-load-more">{"[ Загрузить ещё ]"}</button>

            <footer className="site-footer">
                <p>{"[ Контакты: info@example.com | +7 900 000-00-00 ]"}</p>
                <Link to="/" className="nav-link">{"[ Ссылка на Telegram-канал ]"}</Link>
            </footer>
        </div>
    )
}
