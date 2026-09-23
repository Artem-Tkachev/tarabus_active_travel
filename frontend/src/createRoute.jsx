import { useState } from "react"
import { ButtonIcon, DataInput } from "./UIComponents";
import { Save, SquareArrowOutUpRight, StickyNote, TrashIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function CreateRoute(){
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
        <div>
            <div className="route-header">
                <p>{`[ Редактирование поездки: ${routeName} ]`}</p>
            </div>
            <div className="left-colomn">
                <div className="main-data">
                    <div className="data-header">
                        <p>{"[ Основные данные заезда ]"}</p>
                    </div>
                    <DataInput text={"[ Название поездки * ]"} placeholder={"[ Название поездки ]"} onChange={(e) => setRouteName(e.target.value)}/>
                    <DataInput text={"[ Подробное описание поездки * ]"} placeholder={"[ Подробное описание поездки * ]"} onChange={(e) => setRouteDiscription(e.target.value)}/>
                    <DataInput text={"[ Даты проведения (начало — конец) ]"} placeholder={"[ Даты проведения (начало — конец) ]"} onChange={(e) => setRouteDates(e.target.value)}/>
                    <DataInput text={"[ Стоимость участия (₽) ]"} placeholder={"[ Стоимость участия (₽) ]"} onChange={(e) => setRoutePrice(e.target.value)}/>
                    <DataInput text={"[ Нить маршрута / Локации ]"} placeholder={"[ Нить маршрута / Локации ]"} onChange={(e) => setRoutePlan(e.target.value)}/>
                </div>
                <div className="conditions-data">
                    <div className="data-header">
                        <p>{"[ Условия и комплектация тура ]"}</p>
                    </div>
                    <DataInput text={"[ Что входит в стоимость ]"} placeholder={"[ Что входит в стоимость ]"} onChange={(e) => setRouteConditions(e.target.value)}/>
                    <DataInput text={"[ Что не входит в стоимость ]"} placeholder={"[ Что не входит в стоимость ]"} onChange={(e) => setRouteUnconditions(e.target.value)}/>
                </div>
                <div className="photo-data">
                    <div className="data-header">
                        <p>{"[ Загрузка фотографий ]"}</p>
                    </div>
                </div>
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
                <div>
                    <div className="data-header">
                        <p>{"[ Управление публикацией ]"}</p>
                    </div>
                    <ButtonIcon text={"[ Сохранить изменения ]"} icon={Save} />
                    <ButtonIcon text={"[ Сохранить как черновик ]"} icon={StickyNote}/>
                    <Link to={""}>{"[ Предпросмотр на сайте ]"} <SquareArrowOutUpRight/></Link>

                    <ButtonIcon text={"[ ! ] [ Удалить поездку ]"} icon={TrashIcon}/>
                </div>
            </div>
        </div>
    )
}