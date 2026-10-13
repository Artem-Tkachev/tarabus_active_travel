import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./createRoute.css";
import "./dashboard.css";
import "./bookingManage.css";

export function BookingManage(){
    const {bookingID} = useParams();
    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [message, setMessage] = useState(null);

    const [name, setName] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [nickname, setNickname] = useState();
    const [information, setInformation] = useState();

    async function loadBooking(){
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/booking/${bookingID}`);
        if(response.ok){
            const data = await response.json();
            setBooking(data);
            setName(data.name);
            setPhone(data.phone);
            setEmail(data.email);
            setNickname(data.nickname);
            setInformation(data.information);
        }
        else{
            setNotFound(true);
        }
    }

    useEffect(() => {
        loadBooking();
    }, [bookingID])

    if(notFound){
        return(
            <div className="site-page manage-page">
                <p>{"[ Запись не найдена ]"}</p>
                <Link to="/dashboard" className="breadcrumb-link">{"[ < Вернуться на главную ]"}</Link>
            </div>
        )
    }

    if(booking === null){
        return(<p>Загрузка...</p>);
    }

    async function saveBooking(){
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/booking/${bookingID}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                memberName: name,
                memberPhone: phone,
                memberEmail: email,
                memberNickname: nickname,
                memberInformation: information
            })
        })
        if(response.ok){
            setMessage({type: "success", text: "Данные сохранены"});
            setEditMode(false);
            await loadBooking();
        }
        else{
            setMessage({type: "error", text: "Не удалось сохранить изменения"});
        }
    }

    async function cancelBooking(){
        if(!window.confirm("Отменить запись на поездку? Это действие нельзя будет вернуть самостоятельно.")){
            return;
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/booking/${bookingID}/cancel`, {
            method: 'PUT'
        })
        if(response.ok){
            await loadBooking();
        }
        else{
            setMessage({type: "error", text: "Не удалось отменить запись"});
        }
    }

    return(
        <div className="site-page manage-page">
            <p className="breadcrumb-row">{`[ Личный кабинет ]  /  [ Записи ]  /  [ #${bookingID} ]`}</p>

            <div className="manage-title-row">
                <p className="page-title">{`[ Управление записью на поездку #${bookingID} ]`}</p>
                <span className="badge">{`[ ID: ${bookingID} ]`}</span>
            </div>

            <div className="manage-status-banner">
                <div>
                    <span className="status-badge status-active">{booking.cancelled === 1 ? "[ Отменено ]" : "[ Подтверждено ]"}</span>
                </div>
                {booking.cancelled !== 1 &&
                    <button className="btn btn-secondary" onClick={() => setEditMode(!editMode)}>{editMode ? "[ Завершить редактирование ]" : "[ Режим редактирования ]"}</button>
                }
            </div>

            <div className="manage-trip-card">
                <div className="manage-trip-photo">{"[ Фото ]"}</div>
                <div className="manage-trip-info">
                    <p className="manage-trip-name">{booking.routeName}</p>
                    <p className="manage-trip-dates">{`Даты: ${booking.routeDates}`}</p>
                    <div className="manage-trip-price-row">
                        <p className="manage-trip-price">{`Стоимость: ${booking.routePrice} ₽`}</p>
                    </div>
                </div>
            </div>

            <div className="manage-client-card">
                <div className="data-header"><p>{"[ Данные клиента ]"}</p></div>
                {message && <p className={`save-message save-message-${message.type}`}>{message.text}</p>}
                <div className="manage-client-body">
                    <div className="data-inp-wrapper">
                        <p className="data-inp-label">{"[ ФИО ]"}</p>
                        <input className="data-inp" value={name || ""} onChange={(e) => setName(e.target.value)} disabled={!editMode}/>
                    </div>
                    <div className="data-inp-wrapper">
                        <p className="data-inp-label">{"[ Телефон ]"}</p>
                        <input className="data-inp" value={phone || ""} onChange={(e) => setPhone(e.target.value)} disabled={!editMode}/>
                    </div>
                    <div className="data-inp-wrapper">
                        <p className="data-inp-label">{"[ Email ]"}</p>
                        <input className="data-inp" value={email || ""} onChange={(e) => setEmail(e.target.value)} disabled={!editMode}/>
                    </div>
                    <div className="data-inp-wrapper">
                        <p className="data-inp-label">{"[ Telegram ]"}</p>
                        <input className="data-inp" value={nickname || ""} onChange={(e) => setNickname(e.target.value)} disabled={!editMode}/>
                    </div>
                    <div className="data-inp-wrapper manage-client-comment">
                        <p className="data-inp-label">{"[ Комментарий ]"}</p>
                        <textarea className="data-inp booking-comment" value={information || ""} onChange={(e) => setInformation(e.target.value)} disabled={!editMode}/>
                    </div>
                </div>

                {booking.cancelled !== 1 &&
                    <div className="manage-actions">
                        <button className="btn btn-primary" disabled={!editMode} onClick={saveBooking}>{"[ Сохранить изменения ]"}</button>
                        <button className="btn btn-danger" onClick={cancelBooking}>{"[ Отменить запись ]"}</button>
                    </div>
                }
            </div>

            <p className="manage-policy-note">{"[ Отмена записи возможна не позднее 7 дней до начала поездки. При более поздней отмене стоимость не возвращается — см. условия бронирования ]"}</p>

            <footer className="site-footer">
                <p>{"[ Контакты: info@example.com | +7 900 000-00-00 ]"}</p>
                <Link to="/" className="nav-link">{"[ Ссылка на Telegram-канал ]"}</Link>
            </footer>
        </div>
    )
}
