import { useEffect, useState } from "react"
import { ButtonIcon, DataInput } from "./UIComponents";
import { Save, SquareArrowOutUpRight, StickyNote, TrashIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./createRoute.css";
import { useRoutes } from "./routesContext";


export function EditRoute(){

    const {routes, loadRoutes} = useRoutes();
    const {routeID} = useParams();
    
    useEffect(() => {
        if (routes === null) {
            loadRoutes();
        }
    }, []);

    const [message, setMessage] = useState(null);

    const [routeName, setRouteName] = useState();
    const [routeDiscription, setRouteDiscription] = useState();
    const [routeDates, setRouteDates] = useState();
    const [routePrice, setRoutePrice] = useState();
    const [routePlan, setRoutePlan] = useState();

    const [routeConditions, setRouteConditions] = useState();
    const [routeUnconditions, setRouteUnconditions] = useState();
    const [routeLimit, setRouteLimit] = useState();
    const [routeStatus, setRouteStatus] = useState();
    const [routeDifficulty, setRouteDifficulty] = useState();
    const [routeLink, setRouteLink] = useState();

    const [createdAt, setCreatedAt] = useState();
    const [author, setAuthor] = useState();
    const [views, setViews] = useState();

    const navigate = useNavigate();

    function findRoute(routeID){
        return routes.find((route) => route.id === Number(routeID))
    }
    

    const route = routes ? findRoute(routeID) : null;
    useEffect(() => {
    if (route) {
        setRouteName(route.routeName);
        setRouteDiscription(route.routeDiscription);
        setRouteDates(route.routeDates);
        setRoutePrice(route.routePrice);
        setRoutePlan(route.routePlan);
        setRouteConditions(route.routeConditions);
        setRouteUnconditions(route.routeUnconditions);
        setRouteLimit(route.routeLimit);
        setRouteDifficulty(route.routeDifficulty);
        setRouteLink(route.routeLink);
        setRouteStatus(route.routeStatus);
        setCreatedAt(route.createdAt);
        setAuthor(route.author);
    }
    }, [route]);

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

    async function SaveRoute(status){
        const token = localStorage.getItem('token');

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/route/${routeID}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                "routeName": routeName,
                "routeDiscription": routeDiscription,
                "routeDates": routeDates,
                "routePrice": routePrice,
                "routePlan": routePlan,
                "routeConditions": routeConditions,
                "routeUnconditions": routeUnconditions,
                "routeLimit": routeLimit,
                "routeDifficulty": routeDifficulty,
                "routeLink": routeLink,
                "routeStatus": status
            })
        })
        if(response.ok){
            setMessage({type: "success", text: "Поездка сохранена"});
            //navigate("/routes")
        }
        else{
            setMessage({type: "error", text: "Ошибка при сохранении"})
        }
    }

    async function deleteRoute() {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/route/${routeID}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = await response.json();
        if(response.ok){
            setMessage({type: "success", text: data.message});
            setTimeout(async () => {
                await loadRoutes();
                navigate('/routes');
            }, 600);
        }
        else{
            setMessage({type: "error", text: data.error});
        }
    }

    return(
        <div className="page">
            <Link to="/routes" className="breadcrumb-link">{"[ < Назад к списку поездок ]"}</Link>

            <div className="route-header">
                <div className="route-header-top">
                    <span className="badge">{`[ ID: #TRIP-${routeID} ]`}</span>
                    <span className="badge badge-active">{"[ АКТИВНО ]"}</span>
                </div>
                <div className="route-header-main">
                    <p className="route-title">{`[ Редактирование поездки: ${routeName || "..."} ]`}</p>
                    <div className="publish-toggle">
                        <span className={`toggle-option ${routeStatus === "draft" ? "toggle-active" : ""}`}>{"[ ] Черновик"}</span>
                        <span className={`toggle-option ${routeStatus === "published" ? "toggle-active" : ""}`}>{"[*] Опубликовано"}</span>
                        <span className={`toggle-option ${routeStatus === "past" ? "toggle-active": ""}`}>{"[–] Прошедшая"}</span>
                    </div>
                </div>
            </div>

            <div className="page-body">
                <div className="left-colomn">
                    <div className="main-data">
                        <div className="data-header">
                            <p>{"[ Основные данные заезда ]"}</p>
                            <span className="required-note">{"* Обязательные поля"}</span>
                        </div>
                        <DataInput text={"[ Название поездки * ]"} placeholder={"[ Название поездки ]"} onChange={(e) => setRouteName(e.target.value)} value={routeName}/>
                        <DataInput text={"[ Подробное описание поездки * ]"} placeholder={"[ Подробное описание поездки * ]"} wrapperClass="tall" onChange={(e) => setRouteDiscription(e.target.value)} value={routeDiscription}/>
                        <div className="data-row">
                            <DataInput text={"[ Даты проведения (начало — конец) ]"} placeholder={"[ Даты проведения (начало — конец) ]"} onChange={(e) => setRouteDates(e.target.value)} value={routeDates}/>
                            <DataInput text={"[ Стоимость участия (₽) ]"} placeholder={"[ Стоимость участия (₽) ]"} onChange={(e) => setRoutePrice(e.target.value)} value={routePrice}/>
                        </div>
                        <DataInput text={"[ Нить маршрута / Локации ]"} placeholder={"[ Нить маршрута / Локации ]"} onChange={(e) => setRoutePlan(e.target.value)} value={routePlan}/>
                    </div>

                    <div className="conditions-data">
                        <div className="data-header">
                            <p>{"[ Условия и комплектация тура ]"}</p>
                        </div>
                        <div className="data-row">
                            <DataInput text={"[ Что входит в стоимость ]"} placeholder={"[ Что входит в стоимость ]"} wrapperClass="medium" onChange={(e) => setRouteConditions(e.target.value)} value={routeConditions}/>
                            <DataInput text={"[ Что не входит в стоимость ]"} placeholder={"[ Что не входит в стоимость ]"} wrapperClass="medium" onChange={(e) => setRouteUnconditions(e.target.value)} value={routeUnconditions}/>
                        </div>
                    </div>

                    <div className="photo-data">
                        <div className="data-header">
                            <p>{"[ Загрузка фотографий ]"}</p>
                            <span className="hint">{"( Рекомендуемый формат: JPG/WEBP до 5 MB )"}</span>
                        </div>
                        <div className="photo-main">
                            <div className="upload-box upload-box-main">
                                <span className="upload-plus">{"[ + ]"}</span>
                                <p>{"Загрузить главное фото (Плейсхолдер 16:9)"}</p>
                                <p className="upload-sub">{"Главная обложка карточки в каталоге"}</p>
                            </div>
                        </div>
                        <div className="photo-grid">
                            <div className="upload-box upload-box-small">
                                <span className="upload-plus">{"[ + ]"}</span>
                                <p>{"Фото 2"}</p>
                            </div>
                            <div className="upload-box upload-box-small">
                                <span className="upload-plus">{"[ + ]"}</span>
                                <p>{"Фото 3"}</p>
                            </div>
                            <div className="upload-box upload-box-small">
                                <span className="upload-plus">{"[ + ]"}</span>
                                <p>{"Фото 4"}</p>
                            </div>
                            <div className="upload-box upload-box-small upload-box-more">
                                <span className="upload-plus">{"[ + ]"}</span>
                                <p>{"Добавить ещё"}</p>
                                <p className="upload-sub">{"до 10 кадров"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-colomn">
                    <div className="data-parameters">
                        <div className="data-header">
                            <p>{"[ Настройки заезда ]"}</p>
                        </div>
                        <DataInput text={"[ Лимит участников (мест) ]"} placeholder={"[ Лимит участников (мест) ]"} onChange={(e) => setRouteLimit(e.target.value)} value={routeLimit}/>
                        <DataInput text={"[ Уровень сложности ]"} placeholder={"[ Уровень сложности ]"} onChange={(e) => setRouteDifficulty(e.target.value)} value={routeDifficulty}/>
                        <DataInput text={"[ Ссылка на пост в Telegram ]"} placeholder={"[ Ссылка на пост в Telegram ]"} onChange={(e) => setRouteLink(e.target.value)} value={routeLink}/>
                        <div className="data-footer">
                            <div className="data-fooler-line">
                                <p>{"[ Дата создания: ]"}</p>
                                <p>{createdAt}</p>
                            </div>
                            <div className="data-fooler-line">
                                <p>{"[ Автор: ]"}</p>
                                <p>{author}</p>
                            </div>
                            <div className="data-fooler-line">
                                <p>{"[ Просмотров анкеты: ]"}</p>
                                <p>{views}</p>
                            </div>
                        </div>
                    </div>

                    <div className="publish-actions">
                        <div className="data-header">
                            <p>{"[ Управление публикацией ]"}</p>
                        </div>
                        {message && <p className={`save-message save-message-${message.type}`}>{message.text}</p>}
                        <ButtonIcon text={"[ Сохранить изменения ]"} icon={Save} variant="primary" onClick={() => SaveRoute("published")}/>
                        <ButtonIcon text={"[ Сохранить как черновик ]"} icon={StickyNote} variant="secondary" onClick={() => SaveRoute("draft")}/>
                        <Link to={""} className="preview-link">{"[ Предпросмотр на сайте ]"} <SquareArrowOutUpRight size={16}/></Link>
                        <ButtonIcon text={"[ ! ] [ Удалить поездку ]"} icon={TrashIcon} variant="danger" onClick={() => { if (window.confirm("Удалить поездку без возможности восстановления?")) deleteRoute(); }}/>                    </div>

                    <div className="sync-note">
                        <p className="sync-note-title">{"[ i ] [ Справка по синхронизации ]"}</p>
                        <p className="sync-note-text">{"После сохранения опубликованный тур мгновенно обновится на публичном сайте и в Telegram-боте."}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}