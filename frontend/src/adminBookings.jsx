import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Search, Send, Download, ExternalLink } from "lucide-react";
import "./createRoute.css";
import "./adminDashboard.css";
import "./adminBookings.css";

const statusMap = {
    published: {className: "status-published", text: "[ Опубликовано ]"},
    draft: {className: "status-draft", text: "[ Черновик ]"},
    past: {className: "status-past", text: "[ Прошла ]"}
};

export function AdminBookings(){
    const {routeID} = useParams();

    const [data, setData] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function loadBookings(){
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/route/${routeID}/bookings`, {
                headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
            });
            if(response.ok){
                setData(await response.json());
            } else {
                setNotFound(true);
            }
        }
        loadBookings();
    }, [routeID]);

    if(notFound){
        return(
            <div className="page">
                <Link to="/routes" className="breadcrumb-link">{"[ ← Назад к списку поездок ]"}</Link>
                <p>{"Поездка не найдена."}</p>
            </div>
        );
    }

    if(data === null){
        return(<p className="page">{"Loading..."}</p>);
    }

    const {route, members} = data;
    const routeStatus = statusMap[route.routeStatus];

    function memberStatus(member){
        return member.cancelled === 1
            ? {className: "status-draft", text: "[ Запись отменена ]"}
            : {className: "status-published", text: "[ Подтверждено ]"};
    }

    const filteredMembers = members.filter((member) => {
        if(statusFilter === "confirmed" && member.cancelled === 1) return false;
        if(statusFilter === "cancelled" && member.cancelled !== 1) return false;
        if(search){
            const q = search.toLowerCase();
            const haystack = `${member.name ?? ""} ${member.phone ?? ""} ${member.email ?? ""} ${member.nickname ?? ""}`.toLowerCase();
            if(!haystack.includes(q)) return false;
        }
        return true;
    });

    const occupied = members.filter((member) => member.cancelled !== 1).length;
    const limit = Number(route.routeLimit) || 0;
    const free = Math.max(limit - occupied, 0);

    function exportCSV(){
        const header = ["#", "Имя", "Телефон", "Email", "Ник", "Комментарий", "Статус"];
        const rows = members.map((member, index) => [
            index + 1,
            member.name ?? "",
            member.phone ?? "",
            member.email ?? "",
            member.nickname ?? "",
            (member.information ?? "").replaceAll("\n", " "),
            member.cancelled === 1 ? "Отменено" : "Подтверждено"
        ]);
        const csv = [header, ...rows]
            .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
            .join("\n");
        const blob = new Blob(["﻿" + csv], {type: "text/csv;charset=utf-8;"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `bookings_route_${routeID}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    function bookingRow(member, index){
        const status = memberStatus(member);
        const contacts = [member.email, member.nickname ? `@${member.nickname}` : null].filter(Boolean).join(" · ");

        return(
            <div key={member.id} className="booking-row">
                <div className="booking-cell booking-num-cell">{index + 1}</div>
                <div className="booking-cell booking-name-cell">
                    <p className="booking-name">{member.name || "—"}</p>
                    <p className="booking-sub">{`Участник #${String(index + 1).padStart(2, "0")}`}</p>
                </div>
                <div className="booking-cell booking-contacts-cell">
                    <p>{member.phone || "—"}</p>
                    {contacts && <p className="booking-sub">{contacts}</p>}
                </div>
                <div className="booking-cell booking-date-cell">
                    {member.createdAt || "—"}
                </div>
                <div className="booking-cell booking-comment-cell">
                    {member.information || "—"}
                </div>
                <div className="booking-cell booking-status-cell">
                    <span className={`status-badge ${status.className}`}>{status.text}</span>
                </div>
                <div className="booking-cell booking-actions-cell">
                    <Link to={`/booking/${member.bookingID}`} className="action-link">{"Изменить ∨"}</Link>
                </div>
            </div>
        );
    }

    return(
        <div className="page">
            <div className="bk-breadcrumb-row">
                <Link to="/routes" className="breadcrumb-link">{"[ ← Назад к списку поездок ]"}</Link>
                <div className="bk-breadcrumb-right">
                    <span className="bk-meta">{`[ ID поездки: #${route.id} ]`}</span>
                    {routeStatus && <span className={`status-badge ${routeStatus.className}`}>{routeStatus.text}</span>}
                </div>
            </div>

            <p className="bk-label">{"[ РЕЕСТР БРОНИРОВАНИЙ ]"}</p>
            <div className="bk-title-row">
                <h1 className="bk-title">{`Записавшиеся на поездку: ${route.routeName}`}</h1>
                <div className="bk-badges">
                    <span className="badge">{`Всего мест: ${limit}`}</span>
                    <span className="badge">{`Занято: ${occupied}`}</span>
                    <span className="badge">{`Свободно: ${free}`}</span>
                </div>
            </div>

            {route.routeLink && (
                <div className="bk-telegram-row">
                    <p>{"[ Ссылка на связанный пост в Telegram: "}<a href={route.routeLink} target="_blank" rel="noreferrer">{route.routeLink}</a>{" ]"}</p>
                    <a href={route.routeLink} target="_blank" rel="noreferrer" className="btn btn-secondary bk-btn-inline">
                        <ExternalLink size={14}/> {"Открыть пост"}
                    </a>
                </div>
            )}

            <div className="sorting-block">
                <select className="bk-status-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">{"Фильтр по статусу: Все"}</option>
                    <option value="confirmed">{"Подтверждено"}</option>
                    <option value="cancelled">{"Отменено"}</option>
                </select>
                <div className="search-box">
                    <Search size={16}/>
                    <input placeholder="[ Поиск по имени / телефону / нику... ]" value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                <button className="btn btn-secondary bk-btn-inline" onClick={exportCSV}>
                    <Download size={14}/> {"Экспорт списка (CSV)"}
                </button>
            </div>

            <div className="bookings-table">
                <div className="bookings-table-header">
                    <span>{"[ # ]"}</span>
                    <span>{"[ ИМЯ И ФАМИЛИЯ ]"}</span>
                    <span>{"[ КОНТАКТЫ ]"}</span>
                    <span>{"[ ДАТА И ВРЕМЯ ЗАПИСИ ]"}</span>
                    <span>{"[ КОММЕНТАРИЙ ]"}</span>
                    <span>{"[ СТАТУС ]"}</span>
                    <span>{"[ ДЕЙСТВИЯ ]"}</span>
                </div>

                {filteredMembers.length === 0 && (
                    <p className="bk-empty">{"Никто не найден по заданным условиям"}</p>
                )}

                {filteredMembers.map((member, index) => bookingRow(member, index))}
            </div>

            <div className="bk-footer">
                <p className="bk-footer-note">{"Доступна групповая отправка уведомлений всем участникам с подтверждённым статусом"}</p>
                <button className="btn bk-broadcast-btn" onClick={() => alert("Рассылка в Telegram пока не реализована")}>
                    <Send size={14}/> {"Разослать сообщение всем участникам в Telegram"}
                </button>
            </div>
        </div>
    );
}
