import { useState } from "react"
import { ButtonIcon, DataInput } from "./UIComponents";
import { Save, StickyNote } from "lucide-react";
import { Link } from "react-router-dom";
import "./createRoute.css";

export function CreateRoute(){
    const [message, setMessage] = useState(null);

    const [routeName, setRouteName] = useState();
    const [routeDiscription, setRouteDiscription] = useState();
    const [routeDates, setRouteDates] = useState();
    const [routePrice, setRoutePrice] = useState();
    const [routePlan, setRoutePlan] = useState();

    const [routeConditions, setRouteConditions] = useState();
    const [routeUnconditions, setRouteUnconditions] = useState();

    const [routeLimit, setRouteLimit] = useState();
    const [routeDifficulty, setRouteDifficulty] = useState();
    const [routeLink, setRouteLink] = useState();
    

    async function SaveRoute(status){
        const token = localStorage.getItem("token")

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/route`, {
            method: "POST",
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
        });

        const data = await response.json();
        console.log(data);
        if(response.ok){
            setMessage({type: "success", text: data.message})
        }
        else{
            setMessage({type: "error", text: data.error})
        }
    }

    return(
        <div className="page">
            <Link to="/routes" className="breadcrumb-link">{"[ < Назад к списку поездок ]"}</Link>

            <div className="route-header">
                <div className="route-header-main">
                    <p className="route-title">{"[ Создание новой поездки ]"}</p>
                </div>
            </div>

            <div className="page-body">
                <div className="left-colomn">
                    <div className="main-data">
                        <div className="data-header">
                            <p>{"[ Основные данные заезда ]"}</p>
                            <span className="required-note">{"* Обязательные поля"}</span>
                        </div>
                        <DataInput text={"[ Название поездки * ]"} placeholder={"[ Название поездки ]"} onChange={(e) => setRouteName(e.target.value)}/>
                        <DataInput text={"[ Подробное описание поездки * ]"} placeholder={"[ Подробное описание поездки * ]"} wrapperClass="tall" onChange={(e) => setRouteDiscription(e.target.value)}/>
                        <div className="data-row">
                            <DataInput text={"[ Даты проведения (начало — конец) ]"} placeholder={"[ Даты проведения (начало — конец) ]"} onChange={(e) => setRouteDates(e.target.value)}/>
                            <DataInput text={"[ Стоимость участия (₽) ]"} placeholder={"[ Стоимость участия (₽) ]"} onChange={(e) => setRoutePrice(e.target.value)}/>
                        </div>
                        <DataInput text={"[ Нить маршрута / Локации ]"} placeholder={"[ Нить маршрута / Локации ]"} onChange={(e) => setRoutePlan(e.target.value)}/>
                    </div>

                    <div className="conditions-data">
                        <div className="data-header">
                            <p>{"[ Условия и комплектация тура ]"}</p>
                        </div>
                        <div className="data-row">
                            <DataInput text={"[ Что входит в стоимость ]"} placeholder={"[ Что входит в стоимость ]"} wrapperClass="medium" onChange={(e) => setRouteConditions(e.target.value)}/>
                            <DataInput text={"[ Что не входит в стоимость ]"} placeholder={"[ Что не входит в стоимость ]"} wrapperClass="medium" onChange={(e) => setRouteUnconditions(e.target.value)}/>
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
                        <DataInput text={"[ Лимит участников (мест) ]"} placeholder={"[ Лимит участников (мест) ]"} onChange={(e) => setRouteLimit(e.target.value)}/>
                        <DataInput text={"[ Уровень сложности ]"} placeholder={"[ Уровень сложности ]"} onChange={(e) => setRouteDifficulty(e.target.value)}/>
                        <DataInput text={"[ Ссылка на пост в Telegram ]"} placeholder={"[ Ссылка на пост в Telegram ]"} onChange={(e) => setRouteLink(e.target.value)}/>
                    </div>

                    <div className="publish-actions">
                        <div className="data-header">
                            <p>{"[ Публикация ]"}</p>
                        </div>
                        {message && <p className={`save-message save-message-${message.type}`}>{message.text}</p>}
                        <ButtonIcon text={"[ Создать и опубликовать ]"} icon={Save} variant="primary" onClick={() => {SaveRoute("published");}}/>
                        <ButtonIcon text={"[ Сохранить как черновик ]"} icon={StickyNote} variant="secondary" onClick={() => {SaveRoute("draft");}}/>
                        <Link to="/routes" className="preview-link">{"[ Отмена ]"}</Link>
                    </div>

                    <div className="sync-note">
                        <p className="sync-note-title">{"[ i ] [ Как это работает ]"}</p>
                        <p className="sync-note-text">{"После создания поездка появится в общем списке. Чтобы её увидели пользователи сайта, опубликуй её сразу или позже из списка поездок."}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}