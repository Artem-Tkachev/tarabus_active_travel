import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import "./createRoute.css";
import "./booking.css";
import { useRoutes } from "./routesContext";
import { useEffect, useState } from "react";

export function BookingPage(){
    const {routes, loadRoutes} = useRoutes();
    const {routeID} = useParams();
    const navigate = useNavigate();

    const [memberName, setMemberName] = useState();
    const [memberPhone, setMemberPhone] = useState();
    const [memberEmail, setMemberEmail] = useState();
    const [memberTG, setMemberTG] = useState();
    const [memberConditions, setMemberConditions] = useState();
    const [agree, setAgree] = useState();
    const [bookingError, setBookingError] = useState(null);

    useEffect(() => {
        if(routes == null){
            loadRoutes();
        }
    },[])

    function findRoute(routeID){
        return routes.find((route) => route.id === Number(routeID))
    }

    const route = routes ? findRoute(routeID) : null;

    if (routes === null) {
        return <p>Загрузка...</p>;
    }

    if (!route) {
        return (
            <div className="page">
                <p>{"[ Поездка не найдена ]"}</p>
                <Link to="/routes" className="breadcrumb-link">{"[ < Назад к списку поездок ]"}</Link>
            </div>
        );
    }

    async function applyToRoute(e){
        e.preventDefault();

        if(!agree){
            setBookingError("Нужно согласиться с условиями бронирования");
            return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/route/${routeID}/book`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                memberName: memberName,
                memberPhone: memberPhone,
                memberEmail: memberEmail,
                memberNickname: memberTG,
                memberInformation: memberConditions
            })
        })
        const data = await response.json();

        if(response.ok){
            navigate(`/booking/${data.bookingID}/confirmation`);
        }
        else{
            setBookingError(data.error);
        }
    }

    return(
        <div className="page booking-page">
            <Link to="/dashboard" className="breadcrumb-link">{"[ < Назад к каталогу ]"}</Link>

            {/* TODO: загрузить данные конкретной поездки по routeID и подставить вместо заглушек ниже */}
            <div className="trip-meta-row">
                <span className="badge">{`[ Даты: ${route.routeDates} ]`}</span>
                <span className="badge">{"[ Длительность: 6 дней ]"}</span>
                <span className="badge">{`[ Участников: ${route.routeLimit} ]`}</span>
                <span className="badge">{`[ Сложность: ${route.routeDifficulty} ]`}</span>
            </div>
            <p className="trip-title">{`[ ${route.routeName} ]`}</p>

            <div className="trip-gallery">
                <div className="trip-gallery-main">{"[ Фото ] [ Основное — 1600x900px ]"}</div>
                <div className="trip-gallery-thumbs">
                    <div className="trip-gallery-thumb">{"[ 1 ]"}</div>
                    <div className="trip-gallery-thumb">{"[ 2 ]"}</div>
                    <div className="trip-gallery-thumb">{"[ 3 ]"}</div>
                    <div className="trip-gallery-thumb">{"[ + 5 ещё ]"}</div>
                </div>
            </div>

            <div className="booking-body">
                <div className="booking-left">
                    <div className="trip-section">
                        <div className="data-header"><p>{"[ Описание маршрута ]"}</p></div>
                        <p className="trip-section-text">{`[ ${route.routeDiscription} ]`}</p>
                    </div>

                    <div className="trip-section">
                        <div className="data-header"><p>{"[ Программа по дням ]"}</p></div>
                        <div className="trip-day">
                            <p className="trip-day-title">{"[ День 1 ] [ Встреча группы, экипировка, выход ]"}</p>
                            <p className="trip-day-text">{"[ Описание дня: встреча группы, краткий инструктаж, проверка снаряжения, трансфер к начальной точке маршрута и первый лёгкий переход до базового лагеря ]"}</p>
                        </div>
                        <div className="trip-day">
                            <p className="trip-day-title">{"[ День 2 ] [ Подъём к перевалу и ночёвка в лагере ]"}</p>
                            <p className="trip-day-text">{"[ Описание дня: выход в 8:00, набор высоты 900 м, обед на маршруте, спуск к месту ночёвки, свободное время у костра ]"}</p>
                        </div>
                        <div className="trip-day">
                            <p className="trip-day-title">{"[ День 3 ] [ Штурм перевала (2800 м) и спуск к озеру ]"}</p>
                            <p className="trip-day-text">{"[ Описание дня: ранний выход, траверс основного перевала, обед на смотровой точке, спуск к озеру, вечерняя фотосессия ]"}</p>
                        </div>
                        <p className="trip-day-more">{"[ + Ещё 3 дня: раскрыть программу полностью ]"}</p>
                    </div>
                    {/* TODO conditions and plan */}
                    <div className="trip-includes-row">
                        <div className="trip-section trip-includes">
                            <div className="data-header"><p>{"[ Что входит в стоимость ]"}</p></div>
                            <ul className="trip-list">
                                <li>{"[ Проживание и питание ]"}</li>
                                <li>{"[ Сопровождение гида ]"}</li>
                                <li>{"[ Трансфер от точки сбора ]"}</li>
                            </ul>
                        </div>
                        <div className="trip-section trip-excludes">
                            <div className="data-header"><p>{"[ Что не включено ]"}</p></div>
                            <ul className="trip-list">
                                <li>{"[ Билеты до точки сбора ]"}</li>
                                <li>{"[ Личное снаряжение ]"}</li>
                                <li>{"[ Страховка ]"}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="booking-right">
                    <div className="price-box">
                        <p className="price-box-value">{`[ ${route.routePrice} ₽ ]`}</p>
                        {/* TODO members */}
                        <p className="price-box-sub">{"[ Доступно мест: 4 из 12 ]"}</p>
                        <div className="price-box-row">
                            <select className="price-select">
                                <option>{"[ 15-20 июня 2025 ]"}</option>
                            </select>
                            <select className="price-select">
                                <option>{"[ Участников: 1 ]"}</option>
                            </select>
                        </div>
                        <a href="#booking-form" className="btn btn-primary">{"[ Перейти к записи ]"}</a>
                    </div>
                </div>
            </div>

            {/* форма записи — отдельный блок на всю ширину страницы, не часть двухколоночной сетки выше */}
            <div className="trip-section booking-form-section" id="booking-form">
                <div className="data-header"><p>{"[ Форма записи на поездку ]"}</p></div>
                <form className="booking-form" onSubmit={applyToRoute}>
                    <div className="booking-form-grid">
                        <div className="booking-field">
                            <label>{"[ Имя и фамилия * ]"}</label>
                            <input placeholder={"[ Иван Иванов ]"} onChange={(e) => setMemberName(e.target.value)}/>
                            <span className="field-hint">{"[ Как в документе, для оформления пропуска в погранзону ]"}</span>
                        </div>
                        <div className="booking-field">
                            <label>{"[ Номер телефона * ]"}</label>
                            <input placeholder={"[ +7 (___) ___-__-__ ]"} onChange={(e) => setMemberPhone(e.target.value)}/>
                            <span className="field-hint">{"[ Основной канал связи ]"}</span>
                        </div>
                        <div className="booking-field">
                            <label>{"[ Email ]"}</label>
                            <input placeholder={"[ mail@example.com ]"} onChange={(e) => setMemberEmail(e.target.value)}/>
                            <span className="field-hint">{"[ Сюда отправим чек и памятку участника ]"}</span>
                        </div>
                        <div className="booking-field">
                            <label>{"[ Telegram ]"}</label>
                            <input placeholder={"[ @username ]"} onChange={(e) => setMemberTG(e.target.value)}/>
                            <span className="field-hint">{"[ Для добавления в закрытый чат группы ]"}</span>
                        </div>
                    </div>
                    <div className="booking-field">
                        <label>{"[ Дополнительные комментарии ]"}</label>
                        <textarea className="booking-comment" placeholder={"[ Укажите ограничения по питанию, проживанию, снаряжению или особенности здоровья ]"} onChange={(e) => setMemberConditions(e.target.value)}/>
                    </div>
                    <label className="booking-agree">
                        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
                        {"[ Я согласен с обработкой персональных данных и условиями бронирования ]"}
                    </label>
                    {bookingError && <p className="save-message save-message-error">{bookingError}</p>}
                    <button type="submit" className="btn btn-primary booking-submit">{"[ ЗАПИСАТЬСЯ НА ПОЕЗДКУ ] →"}</button>
                </form>
            </div>

            <footer className="site-footer">
                <p>{"[ Контакты: info@example.com | +7 900 000-00-00 ]"}</p>
                <Link to="/" className="nav-link">{"[ Ссылка на Telegram-канал ]"}</Link>
            </footer>
        </div>
    )
}
