import { Link, useParams } from "react-router-dom";
import "./createRoute.css";
import "./booking.css";

export function BookingPage(){
    const {routeID} = useParams();

    return(
        <div className="page">
            <Link to="/dashboard" className="breadcrumb-link">{"[ < Назад к списку поездок ]"}</Link>

            {/* сюда подставишь реальные данные поездки по routeID, когда подключишь fetch */}
            <div className="trip-summary">
                <div className="trip-summary-photo">{"[ Фото ]"}</div>
                <div className="trip-summary-info">
                    <p className="trip-summary-name">{"[ Название поездки ]"}</p>
                    <p className="trip-summary-dates">{"[ Даты: 12.07 — 19.07 ]"}</p>
                    <p className="trip-summary-price">{"[ Стоимость: 25 000 ₽ ]"}</p>
                    <p className="trip-summary-desc">{"[ Краткое описание поездки для записи ]"}</p>
                </div>
            </div>

            <div className="booking-form-card">
                <div className="data-header">
                    <p>{"[ Запись на поездку ]"}</p>
                </div>
                <form className="booking-form">
                    <div className="data-inp-wrapper">
                        <p className="data-inp-label">{"[ Имя и фамилия * ]"}</p>
                        <input className="data-inp" placeholder={"[ Иван Иванов ]"}/>
                    </div>
                    <div className="data-inp-wrapper">
                        <p className="data-inp-label">{"[ Телефон * ]"}</p>
                        <input className="data-inp" placeholder={"[ +7 900 000 00 00 ]"}/>
                    </div>
                    <div className="data-inp-wrapper">
                        <p className="data-inp-label">{"[ Email ]"}</p>
                        <input className="data-inp" placeholder={"[ mail@example.com ]"}/>
                    </div>
                    <div className="data-inp-wrapper">
                        <p className="data-inp-label">{"[ Комментарий ]"}</p>
                        <textarea className="data-inp booking-comment" placeholder={"[ Доп. пожелания ]"}/>
                    </div>
                    <button type="submit" className="btn btn-primary booking-submit">{"[ Записаться ]"}</button>
                </form>
            </div>
        </div>
    )
}
