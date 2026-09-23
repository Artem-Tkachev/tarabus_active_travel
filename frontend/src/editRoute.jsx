import { useState } from "react"
import { ButtonIcon, DataInput } from "./UIComponents";
import { Save, SquareArrowOutUpRight, StickyNote, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import "./createRoute.css";

export function EditRoute(){
    const [routeName, setRouteName] = useState();
    const [routeDiscription, setRouteDiscription] = useState();
    const [routeDates, setRouteDates] = useState();
    const [routePrice, setRoutePrice] = useState();
    const [routePlan, setRoutePlan] = useState();

    const [routeCondtitions, setRouteConditions] = useState();
    const [routeUnconditions, setRouteUnconditions] = useState();

    const [createdAt, setCreatedAt] = useState();
    const [author, setAuthor] = useState();
    const [views, setViews] = useState();

    

    return(
        <div className="page">
            <Link to="/routes" className="breadcrumb-link">{"[ < Назад к списку поездок ]"}</Link>

            <div className="route-header">
                <div className="route-header-top">
                    <span className="badge">{"[ ID: #TRIP-B42 ]"}</span>
                    <span className="badge badge-active">{"[ АКТИВНО ]"}</span>
                </div>
                <div className="route-header-main">
                    <p className="route-title">{`[ Редактирование поездки: ${routeName || "..."} ]`}</p>
                    <div className="publish-toggle">
                        <span className="toggle-option">{"[ ] Черновик"}</span>
                        <span className="toggle-option toggle-active">{"[*] Опубликовано"}</span>
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
                        <DataInput text={"[ Лимит участников (мест) ]"} placeholder={"[ Лимит участников (мест) ]"} />
                        <DataInput text={"[ Уровень сложности ]"} placeholder={"[ Уровень сложности ]"} />
                        <DataInput text={"[ Ссылка на пост в Telegram ]"} placeholder={"[ Ссылка на пост в Telegram ]"}/>
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
                        <ButtonIcon text={"[ Сохранить изменения ]"} icon={Save} variant="primary"/>
                        <ButtonIcon text={"[ Сохранить как черновик ]"} icon={StickyNote} variant="secondary"/>
                        <Link to={""} className="preview-link">{"[ Предпросмотр на сайте ]"} <SquareArrowOutUpRight size={16}/></Link>
                        <ButtonIcon text={"[ ! ] [ Удалить поездку ]"} icon={TrashIcon} variant="danger"/>
                    </div>

                    <div className="sync-note">
                        <p className="sync-note-title">{"[ i ] [ Справка по синхронизации ]"}</p>
                        <p className="sync-note-text">{"После сохранения опубликованный тур мгновенно обновится на публичном сайте и в Telegram-боте."}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}