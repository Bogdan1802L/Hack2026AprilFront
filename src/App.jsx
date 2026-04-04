import { useState, useEffect } from 'react'
import './App.css'

// --- ДАННЫЕ И КОНСТАНТЫ ---

// Списки опций для Шага 2 в зависимости от ответа на Шаге 1
const OPTIONS_BY_TYPE = {
    "Квартира": ["Кухня", "Гостиная", "Спальня", "Детская", "Санузел", "Прихожая", "Кабинет", "Гардеробная", "Балкон / лоджия", "Полностью всё помещение"],
    "Частный дом": ["Кухня", "Гостиная", "Спальня", "Детская", "Санузел", "Прихожая", "Кабинет", "Гардеробная", "Балкон / лоджия", "Полностью всё помещение"],
    "Офис": ["Кухня", "Санузел", "Прихожая", "Кабинет", "Гардеробная", "Полностью всё помещение"],
    "Коммерческое помещение": ["Кухня", "Санузел", "Кабинет", "Гардеробная", "Полностью всё помещение"],
    "Студия / апартаменты": ["Кухня", "Гостиная", "Спальня", "Детская", "Санузел", "Прихожая", "Кабинет", "Гардеробная", "Балкон / лоджия", "Полностью всё помещение"],
    "Другое": ["Кухня", "Гостиная", "Спальня", "Детская", "Санузел", "Прихожая", "Кабинет", "Гардеробная", "Балкон / лоджия", "Полностью всё помещение"]
}

// Данные квиза
const QUIZ_DATA = [
    {
        id: 1,
        type: 'single',
        title: 'Какое помещение вы планируете оформить?',
        options: ['Квартира', 'Частный дом', 'Офис', 'Коммерческое помещение', 'Студия / апартаменты', 'Другое'],
        message: 'Знание типа помещения поможет нам определить базовый объем работ и стоимость проекта.'
    },
    {
        id: 2,
        type: 'multiple',
        title: 'Какие зоны нужно включить в дизайн-проект?',
        options: [], // Опции будут подставляться динамически
        message: 'Перечислите основные комнаты. Мы можем спроектировать как одну комнату, так и весь дом под ключ.'
    },
    {
        id: 3,
        type: 'range',
        title: 'Укажите примерную площадь помещения',
        min: 20,
        max: 300,
        step: 5,
        defaultValue: 60,
        message: 'Площадь напрямую влияет на стоимость разработки дизайн-проекта (цена за м²).'
    },
    {
        id: 4,
        type: 'single',
        title: 'Какой стиль интерьера вам ближе?',
        options: ['Современный', 'Минимализм', 'Скандинавский', 'Лофт', 'Неоклассика', 'Классика', 'Пока не определился'],
        message: 'Это поможет нашим дизайнерам подготовить для вас наиболее релевантные примеры.'
    },
    {
        id: 5,
        type: 'single',
        title: 'Какой бюджет на реализацию интерьера вы рассматриваете?',
        options: ['До 500 000 ₽', '500 000 – 1 000 000 ₽', '1 000 000 – 2 000 000 ₽', 'От 2 000 000 ₽', 'Пока не знаю'],
        message: 'Бюджет на реализацию важен, чтобы мы предложили материалы и решения, соответствующие вашим возможностям.'
    }
]

// Картинки для типов помещений (Шаг 1)
const TYPE_IMAGES = {
    "Квартира": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=300&q=80",
    "Частный дом": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=300&q=80",
    "Офис": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80",
    "Коммерческое помещение": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80",
    "Студия / апартаменты": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=300&q=80",
    "Другое": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80"
}

// Картинки для зон (Шаг 2)
const ZONE_IMAGES = {
    "Кухня": "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=300&q=80",
    "Гостиная": "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?auto=format&fit=crop&w=300&q=80",
    "Спальня": "https://images.unsplash.com/photo-1505693416388-b0346ef41439?auto=format&fit=crop&w=300&q=80",
    "Детская": "https://images.unsplash.com/photo-1503435980943-918406f9ef43?auto=format&fit=crop&w=300&q=80",
    "Санузел": "https://images.unsplash.com/photo-1552321554-5f4080a55e3c?auto=format&fit=crop&w=300&q=80",
    "Прихожая": "https://images.unsplash.com/photo-1600590788195-e6db2e8b23ab?auto=format&fit=crop&w=300&q=80",
    "Кабинет": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=300&q=80",
    "Гардеробная": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=80",
    "Балкон / лоджия": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=300&q=80",
    "Полностью всё помещение": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80"
}

// Картинки для стилей (Шаг 4)
const STYLE_IMAGES = {
    "Современный": "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=300&q=80",
    "Минимализм": "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=300&q=80",
    "Скандинавский": "https://images.unsplash.com/photo-1532323544230-ac8d6ce6954d?auto=format&fit=crop&w=300&q=80",
    "Лофт": "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?auto=format&fit=crop&w=300&q=80",
    "Неоклассика": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=300&q=80",
    "Классика": "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&w=300&q=80",
    "Пока не определился": "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80"
}

// --- КОМПОНЕНТЫ СТРАНИЦЫ ---

function Header() {
    const handleLogoClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })
    return (
        <header className="site-header">
            <div className="header-container">
                <div className="header-top">
                    <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                        <span className="logo-icon">✦</span>
                        <span className="logo-text">VERNIKODOV</span>
                    </div>
                    <nav className="main-nav">
                        <a href="#services" className="nav-link">Услуги</a>
                        <a href="#about" className="nav-link">О компании</a>
                        <a href="#contacts" className="nav-link">Контакты</a>
                    </nav>
                    <div className="header-contact">
                        <a href="tel:+79999999999" className="phone-link">+7 (999) 999-99-99</a>
                        <span className="work-hours">9:00–20:00</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

function ServicesSection() {
    const services = [
        { title: 'Дизайн-проект квартиры', description: 'Полный комплекс услуг по разработке дизайна интерьера квартиры любой сложности' },
        { title: 'Дизайн-проект дома', description: 'Создание уютного и функционального пространства для вашего загородного дома' },
        { title: 'Дизайн коммерческих помещений', description: 'Разработка интерьеров для офисов, магазинов, ресторанов и других объектов' },
        { title: '3D-визуализация', description: 'Фотореалистичная визуализация будущего интерьера для наглядного представления' },
        { title: 'Авторский надзор', description: 'Контроль за реализацией дизайн-проекта на всех этапах ремонтных работ' },
        { title: 'Комплектация объекта', description: 'Подбор и закупка отделочных материалов, мебели и декора' }
    ]

    return (
        <section id="services" className="content-section">
            <div className="section-container">
                <h2 className="section-title">НАШИ УСЛУГИ</h2>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function AboutSection() {
    return (
        <section id="about" className="content-section about-section">
            <div className="section-container">
                <h2 className="section-title">О КОМПАНИИ</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p className="about-paragraph">
                            <strong>VERNIKODOV</strong> — это команда профессиональных дизайнеров интерьера с многолетним опытом работы.
                            Мы создаем уникальные пространства, которые отражают индивидуальность наших клиентов и отвечают их образу жизни.
                        </p>
                        <p className="about-paragraph">
                            За годы работы мы реализовали более 500 проектов различной сложности — от небольших студий до просторных загородных домов и коммерческих объектов.
                        </p>
                        <div className="about-features">
                            <div className="feature-item"><span className="feature-number">500+</span><span className="feature-label">Реализованных проектов</span></div>
                            <div className="feature-item"><span className="feature-number">10</span><span className="feature-label">Лет на рынке</span></div>
                            <div className="feature-item"><span className="feature-number">50+</span><span className="feature-label">Наград и премий</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-column">
                        <div className="footer-logo">
                            <span className="logo-icon">✦</span>
                            <span className="logo-text">VERNIKODOV</span>
                        </div>
                        <p className="footer-description">Профессиональные дизайнеры интерьера. Создаем уникальные пространства с 2014 года.</p>
                        <div className="footer-socials">
                            <a href="#" className="social-link" aria-label="Telegram"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>
                            <a href="#" className="social-link" aria-label="WhatsApp"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg></a>
                            <a href="#" className="social-link" aria-label="Instagram"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
                        </div>
                    </div>
                    <div className="footer-column">
                        <h4 className="footer-title">Навигация</h4>
                        <ul className="footer-links">
                            <li><a href="#services" className="footer-link">Услуги</a></li>
                            <li><a href="#about" className="footer-link">О компании</a></li>
                            <li><a href="#contacts" className="footer-link">Контакты</a></li>
                            <li><a href="#" className="footer-link">Политика конфиденциальности</a></li>
                            <li><a href="#" className="footer-link">Договор оферты</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h4 className="footer-title">Контакты</h4>
                        <ul className="footer-contact-list">
                            <li className="footer-contact-item"><span className="contact-label">Телефон:</span><a href="tel:+79999999999" className="contact-link">+7 (999) 999-99-99</a></li>
                            <li className="footer-contact-item"><span className="contact-label">E-mail:</span><a href="mailto:info@vernikodov.ru" className="contact-link">info@vernikodov.ru</a></li>
                            <li className="footer-contact-item"><span className="contact-label">Адрес:</span><span className="contact-text">г. Москва, ул. Примерная, д. 123</span></li>
                            <li className="footer-contact-item"><span className="contact-label">Режим работы:</span><span className="contact-text">Пн-Пт: 9:00–20:00</span></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="footer-bottom-left"><p className="copyright">© 2014–{new Date().getFullYear()} VERNIKODOV. Все права защищены.</p></div>
                    <div className="footer-bottom-right">
                        <a href="/admin" className="admin-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
                            Админ-панель
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

// --- ОСНОВНОЙ КОМПОНЕНТ ПРИЛОЖЕНИЯ ---

function App() {
    const [started, setStarted] = useState(false)
    const [step, setStep] = useState(1)
    const [answers, setAnswers] = useState({})
    const [contactForm, setContactForm] = useState({ name: '', phone: '', email: '', comment: '', agree: false })
    const [success, setSuccess] = useState(false)

    // Блокировка скролла при открытом квизе
    useEffect(() => {
        if (started) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => { document.body.style.overflow = '' }
    }, [started])

    const handleStart = () => setStarted(true)

    const handlePrev = () => {
        if (step > 1) {
            setStep(step - 1)
        } else {
            setStarted(false)
        }
    }

    const handleNext = () => {
        if (step < 5) setStep(step + 1)
        else setStep(6)
    }

    const handleAnswer = (value) => setAnswers(prev => ({ ...prev, [`step_${step}`]: value }))

    const handleContactChange = (e) => {
        const { name, value, type, checked } = e.target
        setContactForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!contactForm.phone || !contactForm.agree) {
            alert('Пожалуйста, заполните телефон и дайте согласие на обработку данных.')
            return
        }
        // Сбор данных
        const finalData = {
            ...answers,
            step_3: answers['step_3'] || 60,
            contact: contactForm,
            timestamp: new Date().toISOString()
        }
        console.log('SUBMITTING DATA:', finalData)
        setTimeout(() => setSuccess(true), 500)
    }

    // Валидация кнопки "Далее"
    const isNextDisabled = () => {
        if (step === 2) {
            const val = answers[`step_${step}`];
            return !val || val.length === 0;
        }
        if (step === 3) return false; // Ползунок всегда валиден
        return !answers[`step_${step}`];
    }

    const isFormValid = () => contactForm.phone && contactForm.agree

    // Текущие данные квиза с учетом динамики (Шаг 2 зависит от Шага 1)
    const currentData = QUIZ_DATA.find(d => d.id === step)
    const stepData = step === 2 && answers['step_1']
        ? { ...currentData, options: OPTIONS_BY_TYPE[answers['step_1']] || currentData.options }
        : currentData;

    // --- РЕНДЕРИНГ ШАГОВ ---

    // Шаг 1: Карточки типов помещений
    const renderStep1Cards = () => (
        <div className="options-grid-step-1">
            {QUIZ_DATA[0].options.map((opt, idx) => (
                <div
                    key={idx}
                    className={`option-card ${answers['step_1'] === opt ? 'selected' : ''}`}
                    onClick={() => handleAnswer(opt)}
                >
                    <div className="card-image-wrapper">
                        <img src={TYPE_IMAGES[opt]} alt={opt} />
                        {answers['step_1'] === opt && <div className="check-overlay">✓</div>}
                    </div>
                    <span className="card-title">{opt}</span>
                </div>
            ))}
        </div>
    )

    // Шаг 2: Карточки зон (динамические)
    const renderStep2Cards = () => {
        const currentSelection = answers[`step_2`] || []
        const options = OPTIONS_BY_TYPE[answers['step_1']] || QUIZ_DATA[1].options

        const toggleCheck = (opt) => {
            let newSelection = [...currentSelection]
            if (opt === "Полностью всё помещение") {
                if (newSelection.includes(opt)) newSelection = []
                else newSelection = [...options]
            } else {
                if (newSelection.includes("Полностью всё помещение")) {
                    newSelection = newSelection.filter(item => item !== "Полностью всё помещение")
                }
                if (newSelection.includes(opt)) newSelection = newSelection.filter(item => item !== opt)
                else newSelection.push(opt)
            }
            handleAnswer(newSelection)
        }

        return (
            <div className="options-grid-step-1">
                {options.map((opt, idx) => {
                    const isChecked = currentSelection.includes(opt)
                    return (
                        <div key={idx} className={`option-card ${isChecked ? 'selected' : ''}`} onClick={() => toggleCheck(opt)}>
                            <div className="card-image-wrapper">
                                <img src={ZONE_IMAGES[opt]} alt={opt} />
                                {isChecked && <div className="check-overlay">✓</div>}
                            </div>
                            <span className="card-title">{opt}</span>
                        </div>
                    )
                })}
            </div>
        )
    }

    // Шаг 3: Ползунок с визуализацией
    const renderStep3Range = (data) => {
        const val = answers[`step_3`] !== undefined ? answers[`step_3`] : data.defaultValue
        const size = 140 + (val - data.min) * ((280 - 140) / (data.max - data.min))

        return (
            <div className="range-container">
                <div className="area-visualizer">
                    <div className="area-box" style={{ width: `${size}px`, height: `${size}px` }}>
                        <span className="area-text">{val} м²</span>
                    </div>
                </div>
                <div className="slider-wrapper">
                    <input
                        type="range"
                        min={data.min}
                        max={data.max}
                        step={data.step}
                        value={val}
                        onChange={(e) => handleAnswer(Number(e.target.value))}
                    />
                    <div className="slider-labels">
                        <span>{data.min} м²</span>
                        <span>{data.max} м²</span>
                    </div>
                </div>
            </div>
        )
    }

    // Шаг 4: Карточки стилей
    const renderStep4Cards = () => (
        <div className="options-grid-step-1">
            {QUIZ_DATA[3].options.map((opt, idx) => (
                <div
                    key={idx}
                    className={`option-card ${answers['step_4'] === opt ? 'selected' : ''}`}
                    onClick={() => handleAnswer(opt)}
                >
                    <div className="card-image-wrapper">
                        <img src={STYLE_IMAGES[opt]} alt={opt} />
                        {answers['step_4'] === opt && <div className="check-overlay">✓</div>}
                    </div>
                    <span className="card-title">{opt}</span>
                </div>
            ))}
        </div>
    )

    return (
        <div className="page-wrapper">
            {/* Фон сайта (размывается при открытии квиза) */}
            <div className={`page-content ${started ? 'blurred' : ''}`}>
                <Header />
                <div className="app-container">
                    <div className="start-screen">
                        <h1 className="start-title">ПРОЙДИТЕ ТЕСТ И УЗНАЙТЕ СТОИМОСТЬ ДИЗАЙН-ПРОЕКТА ЗА 2 МИНУТЫ</h1>
                        <button className="start-btn" onClick={handleStart}>НАЧАТЬ ТЕСТ</button>
                    </div>
                </div>
                <ServicesSection />
                <AboutSection />
                <Footer />
            </div>

            {/* Модальное окно квиза */}
            {started && (
                <div className="quiz-overlay">
                    <div className={`quiz-wrapper ${success ? 'success-mode' : ''}`}>
                        <button className="quiz-close-btn" onClick={() => setStarted(false)} aria-label="Закрыть тест">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        {success ? (
                            <div className="success-screen">
                                <h2 className="success-title">СПАСИБО ЗА ОТВЕТЫ!</h2>
                                <p>Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.</p>
                                <button className="success-btn" onClick={() => { setSuccess(false); setStarted(false); }}>ЗАКРЫТЬ</button>
                            </div>
                        ) : (
                            <div className="quiz-left">
                                {step === 6 ? (
                                    // === ШАГ 6: ФОРМА ===
                                    <>
                                        <div className="quiz-header">МЫ УЖЕ ПРИСТУПИЛИ К РАСЧЁТУ!</div>
                                        <div className="question-title">
                                            Укажите ваши контактные данные для получения результата расчёта
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input type="text" name="name" className="form-input" placeholder="Имя" value={contactForm.name} onChange={handleContactChange} />
                                            </div>
                                            <div className="form-group">
                                                <input type="tel" name="phone" className="form-input" placeholder="Телефон *" required value={contactForm.phone} onChange={handleContactChange} />
                                            </div>
                                            <div className="form-group">
                                                <input type="email" name="email" className="form-input" placeholder="E-mail (необязательно)" value={contactForm.email} onChange={handleContactChange} />
                                            </div>
                                            <div className="form-group">
                                                <textarea name="comment" className="form-input" rows="2" placeholder="Комментарий" value={contactForm.comment} onChange={handleContactChange} />
                                            </div>
                                            <label className="form-checkbox">
                                                <input type="checkbox" name="agree" checked={contactForm.agree} onChange={handleContactChange} />
                                                <span>Я даю согласие на обработку персональных данных</span>
                                            </label>

                                            {/* ПОЛЗОНОК ШАГОВ ДЛЯ ФОРМЫ */}
                                            <div className="progress-container" style={{ marginTop: '30px' }}>
                                                <span className="progress-text">Шаг 6 из 6</span>
                                                <div className="progress-bar">
                                                    <div className="progress-fill" style={{ width: '100%' }}></div>
                                                </div>
                                            </div>

                                            <div className="quiz-footer" style={{ marginTop: '15px' }}>
                                                <button type="button" className="btn-nav" onClick={() => setStep(5)}>← НАЗАД</button>
                                                <button type="submit" className="btn-nav primary" disabled={!isFormValid()}>ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ</button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
                                    // === ШАГИ 1-5 ===
                                    <>
                                        <div className="quiz-header">УЗНАЙТЕ СТОИМОСТЬ ДИЗАЙН-ПРОЕКТА</div>
                                        <div className="question-title">{stepData.title}</div>

                                        {step === 1 && renderStep1Cards()}
                                        {step === 2 && renderStep2Cards()}
                                        {step === 3 && renderStep3Range(stepData)}
                                        {step === 4 && renderStep4Cards()}

                                        {step === 5 && (
                                            <div className="options-list">
                                                {stepData.options.map((opt, idx) => (
                                                    <label key={idx} className="option-item">
                                                        <input
                                                            type="radio"
                                                            name={`q_${step}`}
                                                            value={opt}
                                                            checked={answers[`step_${step}`] === opt}
                                                            onChange={() => handleAnswer(opt)}
                                                        />
                                                        <span className="option-icon"></span>
                                                        {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        {/* ПОЛЗОНОК ШАГОВ ДЛЯ ОБЫЧНЫХ ВОПРОСОВ */}
                                        <div className="quiz-footer">
                                            <div className="progress-container">
                                                <span className="progress-text">Шаг {step} из 6</span>
                                                <div className="progress-bar">
                                                    <div className="progress-fill" style={{ width: `${(step / 6) * 100}%` }}></div>
                                                </div>
                                            </div>
                                            <div className="nav-buttons">
                                                <button className="btn-nav" onClick={handlePrev}>{step === 1 ? '← Закрыть' : '←'}</button>
                                                <button className="btn-nav primary" onClick={handleNext} disabled={isNextDisabled()}>ДАЛЕЕ</button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default App