// src/AdminPanel.jsx
import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'

// Компонент карточки заявки
function ApplicationCard({ data, onDelete }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('ru-RU', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
    }

    const formatPhone = (phone) => {
        const numbers = phone.replace(/\D/g, '')
        if (numbers.length !== 11) return phone
        return `+7 (${numbers.slice(1, 4)}) ${numbers.slice(4, 7)}-${numbers.slice(7, 9)}-${numbers.slice(9)}`
    }

    return (
        <div className="service-card admin-card">
            <div className="admin-card-header">
                <span className="admin-card-id">#{data.id}</span>
                <span className="admin-card-date">{formatDate(data.create_time)}</span>
            </div>

            <div className="admin-card-body">
                <div className="admin-field">
                    <span className="admin-field-label">Имя:</span>
                    <span className="admin-field-value">{data.name}</span>
                </div>

                <div className="admin-field">
                    <span className="admin-field-label">Телефон:</span>
                    <a href={`tel:${data.phone}`} className="admin-field-value admin-link-phone">
                        {formatPhone(data.phone)}
                    </a>
                </div>

                {data.email && (
                    <div className="admin-field">
                        <span className="admin-field-label">Email:</span>
                        <a href={`mailto:${data.email}`} className="admin-field-value">{data.email}</a>
                    </div>
                )}

                <div className="admin-field">
                    <span className="admin-field-label">Тип помещения:</span>
                    <span className="admin-field-value admin-badge">{data.room_type}</span>
                </div>

                <div className="admin-field">
                    <span className="admin-field-label">Зоны:</span>
                    <div className="admin-zones">
                        {data.zones?.map((zone, idx) => (
                            <span key={idx} className="admin-zone-tag">{zone}</span>
                        ))}
                    </div>
                </div>

                <div className="admin-field">
                    <span className="admin-field-label">Площадь:</span>
                    <span className="admin-field-value">{data.area} м²</span>
                </div>
                <div className="admin-field">
                    <span className="admin-field-label">Стиль:</span>
                    <span className="admin-field-value">{data.style}</span>
                </div>

                <div className="admin-field">
                    <span className="admin-field-label">Бюджет:</span>
                    <span className="admin-field-value admin-budget">{data.budget}</span>
                </div>

                {data.comment && (
                    <div className="admin-field">
                        <span className="admin-field-label">Комментарий:</span>
                        <p className="admin-comment">{data.comment}</p>
                    </div>
                )}

                {data.utm_source && (
                    <div className="admin-field">
                        <span className="admin-field-label">Источник:</span>
                        <span className="admin-field-value admin-utm">{data.utm_source}</span>
                    </div>
                )}
            </div>

            <div
                className="admin-card-actions"
                style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}
            >
                <button className="btn-nav primary" onClick={() => window.open(`tel:${data.phone}`, '_self')}>
                    Позвонить
                </button>
                <button className="btn-nav" onClick={() => navigator.clipboard.writeText(data.phone)}>
                    Копировать телефон
                </button>
                <button
                    className="btn-nav"
                    onClick={() => onDelete?.(data.id)}
                    style={{ borderColor: '#c00', color: '#c00' }}
                >
                    Удалить
                </button>
            </div>
        </div>
    )
}

// Основной компонент
export default function AdminPanel() {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('/api/submissions', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })

                if (!response.ok) throw new Error(`HTTP ${response.status}`)

                const data = await response.json()
                setApplications(data.map((item, i) => ({ id: item.id || i + 1, ...item })))
            } catch (err) {
                // ⚠️ ВАЖНО: Не вызываем setError, чтобы UI не блокировался
                console.warn('Бэкенд недоступен, загружаю демо-данные:', err.message)
                setApplications([
                    { id: 1, name: "Иван Иванов", phone: "+79991234567", email: "ivan@example.com", comment: "Хочу светлый интерьер", room_type: "квартира", zones: ["кухня", "гостиная", "спальня"], area: 65, style: "скандинавский", budget: "500 000 ₽", utm_source: "instagram", create_time: "2026-04-05T07:58:31.437495" },
                    { id: 2, name: "Мария Петрова", phone: "+79997654321", email: "maria@example.com", comment: "Нужна перепланировка", room_type: "студия", zones: ["кухня-гостиная", "ванная"], area: 42, style: "лофт", budget: "350 000 ₽", utm_source: "google_ads", create_time: "2026-04-05T07:58:31.437495" },
                    { id: 3, name: "Алексей Сидоров", phone: "+79991112233", email: "alex@example.com", comment: "Бюджет ограничен", room_type: "частный дом", zones: ["гостиная", "кабинет", "терраса"], area: 120, style: "классический", budget: "1 200 000 ₽", utm_source: "direct", create_time: "2026-04-05T07:58:31.437495" }
                ])
            } finally {
                setLoading(false)
            }
        }
        fetchApplications()
    }, [])

    // Удаление заявки: DELETE /quiz/orders/{id}
    const handleDelete = async (orderId) => {
        if (!window.confirm('Удалить эту заявку?')) return
        try {
            const res = await fetch(`/quiz/orders/${orderId}`, { method: 'DELETE' })
            if (!res.ok) throw new Error(`Ошибка ${res.status}`)
            setApplications(prev => prev.filter(a => a.id !== orderId))
        } catch (err) {
            alert('Не удалось удалить: ' + err.message)
        }
    }

    return (
        <div className="page-wrapper">
            <Header />
            <main className="admin-main">
                <div className="admin-container">
                    <h1 className="admin-title" style={{ textAlign: 'left', marginBottom: '30px' }}>Заявки</h1>

                    {loading ? (
                        <div className="admin-loading">Загрузка...</div>
                    ) : applications.length === 0 ? (
                        <div className="admin-empty">Нет заявок</div>
                    ) : (
                        <div className="admin-grid">
                            {applications.map(app => (
                                <ApplicationCard key={app.id} data={app} onDelete={handleDelete} />
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}