import { Link } from "react-router-dom";
import "./dashboard.css";

export function TripDashboard(){

    return(
        <div className="site-page">
            <header className="site-header">
                <p className="site-logo">{"[ TARABUS ]"}</p>
                <nav className="site-nav">
                    <Link to="/dashboard" className="nav-link">{"[ Поездки ]"}</Link>
                </nav>
            </header>

            <div className="trip-dashboard-header">
                <p className="page-title">{"[ Доступные поездки и туры ]"}</p>
                <p className="page-subtitle">{"[ Выбери направление и запишись онлайн ]"}</p>
            </div>

            <div className="trip-grid">
                {/* это карточка-заглушка — когда подключишь данные, оберни её в .map() по списку поездок */}
                <div className="trip-card">
                    <div className="trip-card-photo">{"[ Фото ]"}</div>
                    <div className="trip-card-body">
                        <p className="trip-card-name">{"[ Название поездки ]"}</p>
                        <p className="trip-card-dates">{"[ Даты: 12.07 — 19.07 ]"}</p>
                        <p className="trip-card-difficulty">{"[ Сложность: Средняя ]"}</p>
                        <p className="trip-card-price">{"[ от 25 000 ₽ ]"}</p>
                        <Link to="/trip/1" className="trip-card-link">{"[ Подробнее и запись ]"}</Link>
                    </div>
                </div>

                <div className="trip-card">
                    <div className="trip-card-photo">{"[ Фото ]"}</div>
                    <div className="trip-card-body">
                        <p className="trip-card-name">{"[ Название поездки ]"}</p>
                        <p className="trip-card-dates">{"[ Даты: 03.08 — 10.08 ]"}</p>
                        <p className="trip-card-difficulty">{"[ Сложность: Легкая ]"}</p>
                        <p className="trip-card-price">{"[ от 18 000 ₽ ]"}</p>
                        <Link to="/trip/2" className="trip-card-link">{"[ Подробнее и запись ]"}</Link>
                    </div>
                </div>

                <div className="trip-card">
                    <div className="trip-card-photo">{"[ Фото ]"}</div>
                    <div className="trip-card-body">
                        <p className="trip-card-name">{"[ Название поездки ]"}</p>
                        <p className="trip-card-dates">{"[ Даты: 20.08 — 27.08 ]"}</p>
                        <p className="trip-card-difficulty">{"[ Сложность: Сложная ]"}</p>
                        <p className="trip-card-price">{"[ от 32 000 ₽ ]"}</p>
                        <Link to="/trip/3" className="trip-card-link">{"[ Подробнее и запись ]"}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
