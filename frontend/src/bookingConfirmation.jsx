import { Link, useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import "./createRoute.css";
import "./dashboard.css";
import "./bookingConfirmation.css";

export function BookingConfirmation(){
    const {bookingID} = useParams();

    const [booking, setBooking] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        async function loadBooking(){
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/booking/${bookingID}`);
            if(response.ok){
                setBooking(await response.json());
            }
            else{
                setNotFound(true);
            }
        }
        loadBooking();
    }, [bookingID])

    if(notFound){
        return(
            <div className="site-page confirmation-page">
                <p>{"[ Запись не найдена ]"}</p>
                <Link to="/dashboard" className="breadcrumb-link">{"[ < Вернуться на главную ]"}</Link>
            </div>
        )
    }

    if(booking === null){
        return(<p>Загрузка...</p>);
    }

    return(
        <div className="site-page confirmation-page">
            <div className="confirmation-steps">
                <span className="step-item step-done">{"[ 1. Выбор ]"}</span>
                <span className="step-sep">{"—"}</span>
                <span className="step-item step-done">{"[ 2. Заполнение ]"}</span>
                <span className="step-sep">{"—"}</span>
                <span className="step-item step-active">{"[ 3. Подтверждение ]"}</span>
            </div>

            <div className="confirmation-box">
                <div className="confirmation-icon"><CheckCircle2 size={36}/></div>
                <p className="confirmation-title">{"Вы успешно записаны!"}</p>
                <p className="confirmation-subtitle">{"[ Подтверждение отправлено на указанный email и в Telegram ]"}</p>

                <div className="confirmation-summary">
                    <div className="confirmation-summary-header">
                        <span className="badge">{`[ Заявка #${bookingID} ]`}</span>
                    </div>
                    <div className="confirmation-row">
                        <span className="confirmation-label">{"[ Поездка ]"}</span>
                        <span className="confirmation-value">{booking.routeName}</span>
                    </div>
                    <div className="confirmation-row">
                        <span className="confirmation-label">{"[ Даты ]"}</span>
                        <span className="confirmation-value">{booking.routeDates}</span>
                    </div>
                    <div className="confirmation-row">
                        <span className="confirmation-label">{"[ Участник ]"}</span>
                        <span className="confirmation-value">{booking.name}</span>
                    </div>
                    <div className="confirmation-row">
                        <span className="confirmation-label">{"[ Номер брони ]"}</span>
                        <span className="confirmation-value">{`#${bookingID}`}</span>
                    </div>
                    <div className="confirmation-row">
                        <span className="confirmation-label">{"[ Статус ]"}</span>
                        <span className="confirmation-status-pending">{booking.cancelled === 1 ? "[ Отменена ]" : "[ Ожидает подтверждения ]"}</span>
                    </div>
                </div>

                <div className="confirmation-actions">
                    <Link to={`/booking/${bookingID}`} className="btn btn-primary">{"[ Перейти к моей записи ]"}</Link>
                    <Link to="/dashboard" className="btn btn-secondary">{"[ Вернуться на главную ]"}</Link>
                </div>
            </div>

            <footer className="site-footer">
                <p>{"[ Контакты: info@example.com | +7 900 000-00-00 ]"}</p>
                <Link to="/" className="nav-link">{"[ Ссылка на Telegram-канал ]"}</Link>
            </footer>
        </div>
    )
}
