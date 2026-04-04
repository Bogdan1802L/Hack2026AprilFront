import { useState, useEffect, useRef } from 'react'
import './App.css'

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
                        VERNIKODOV
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
                    <p className="about-paragraph">VERNIKODOV — это команда профессиональных дизайнеров интерьера с многолетним опытом работы.</p>
                    <p className="about-paragraph">Мы создаем уникальные пространства, которые отражают индивидуальность наших клиентов и отвечают их образу жизни.</p>
                    <p className="about-paragraph">За годы работы мы реализовали более 500 проектов различной сложности — от небольших студий до просторных загородных домов и коммерческих объектов.</p>
                    <div className="about-features">
                        <div className="feature-item">
                            <span className="feature-number">500+</span>
                            <span className="feature-label">Реализованных проектов</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-number">10</span>
                            <span className="feature-label">Лет на рынке</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-number">50+</span>
                            <span className="feature-label">Наград и премий</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer id="contacts" className="site-footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-column">
                        <div className="footer-logo">
                            <span>✦</span>
                            VERNIKODOV
                        </div>
                        <p className="footer-description">Профессиональные дизайнеры интерьера. Создаем уникальные пространства с 2014 года.</p>
                    </div>
                    <div className="footer-column">
                        <h3 className="footer-title">Навигация</h3>
                        <ul className="footer-links">
                            <li><a href="#services" className="footer-link">Услуги</a></li>
                            <li><a href="#about" className="footer-link">О компании</a></li>
                            <li><a href="#contacts" className="footer-link">Контакты</a></li>
                            <li><a href="#" className="footer-link">Политика конфиденциальности</a></li>
                            <li><a href="#" className="footer-link">Договор оферты</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3 className="footer-title">Контакты</h3>
                        <ul className="footer-contact-list">
                            <li className="footer-contact-item">
                                <span className="contact-label">Телефон</span>
                                <a href="tel:+79999999999" className="contact-link">+7 (999) 999-99-99</a>
                            </li>
                            <li className="footer-contact-item">
                                <span className="contact-label">E-mail</span>
                                <a href="mailto:info@vernikodov.ru" className="contact-link">info@vernikodov.ru</a>
                            </li>
                            <li className="footer-contact-item">
                                <span className="contact-label">Адрес</span>
                                <span className="contact-text">г. Москва, ул. Примерная, д. 123</span>
                            </li>
                            <li className="footer-contact-item">
                                <span className="contact-label">Режим работы</span>
                                <span className="contact-text">Пн-Пт: 9:00–20:00</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p className="copyright">© 2014–{new Date().getFullYear()} VERNIKODOV. Все права защищены.</p>
                    <a href="/admin" className="admin-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                        Админ-панель
                    </a>
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
    const [loading, setLoading] = useState(false) // ИЗМЕНЕНИЕ: состояние загрузки
    const phoneInputRef = useRef(null)

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
        const { name, value, type, checked } = e.target;
        let finalValue = value;

        if (name === 'name') {
            finalValue = value.replace(/[^a-zA-Zа-яА-ЯёЁ\s']/g, '');
        }
        if (name === 'phone') {
            if (value === '') {
                finalValue = '';
            } else {
                finalValue = formatPhone(value);
            }
        }

        setContactForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : finalValue
        }));
    };

    const handlePhoneKeyDown = (e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            const input = e.target;
            const currentValue = input.value;
            const cursorPos = input.selectionStart;

            if (input.selectionStart !== input.selectionEnd) return;

            if (e.key === 'Backspace' && cursorPos > 0) {
                const before = currentValue.substring(0, cursorPos - 1);
                const after = currentValue.substring(cursorPos);
                const newValue = before + after;
                const numbersOnly = newValue.replace(/\D/g, '');

                if (numbersOnly.length === 0) {
                    setContactForm(prev => ({ ...prev, phone: '' }));
                } else {
                    const formatted = formatPhone(newValue);
                    setContactForm(prev => ({ ...prev, phone: formatted }));
                    setTimeout(() => { input.selectionStart = input.selectionEnd = cursorPos - 1; }, 0);
                }
                e.preventDefault();
            }
        }
    };

    const formatPhone = (value) => {
        let numbers = value.replace(/\D/g, '');
        if (numbers.length === 0) return '';
        if (numbers[0] === '8') numbers = '7' + numbers.substring(1);
        if (numbers[0] !== '7') numbers = '7' + numbers;
        numbers = numbers.substring(0, 11);

        let formatted = '';
        if (numbers.length > 0) formatted = '+7';
        if (numbers.length > 1) formatted += ' (' + numbers.substring(1, 4);
        if (numbers.length >= 4) formatted += ')';
        if (numbers.length > 4) formatted += ' ' + numbers.substring(4, 7);
        if (numbers.length > 7) formatted += ' ' + numbers.substring(7, 9);
        if (numbers.length > 9) formatted += ' ' + numbers.substring(9, 11);

        return formatted;
    };

    // ИЗМЕНЕНИЕ: Асинхронная отправка данных на бэкенд
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!contactForm.name || !contactForm.phone || !contactForm.agree) {
            alert('Пожалуйста, укажите ваше имя, заполните телефон и дайте согласие на обработку данных.')
            return
        }

        setLoading(true)

        // Извлекаем UTM метки из URL
        const params = new URLSearchParams(window.location.search)
        const utm_source = params.get('utm_source') || ''

        // Формируем payload строго по требованиям бэкенда
        const payload = {
            name: contactForm.name,
            phone: contactForm.phone,
            email: contactForm.email || '',
            comment: contactForm.comment || '',
            room_type: answers['step_1'] || '',
            zones: answers['step_2'] || [],
            area: answers['step_3'] || 60,
            style: answers['step_4'] || '',
            budget: answers['step_5'] || '',
            utm_source: utm_source
        }

        try {
            const response = await fetch('http://localhost:8000/quiz/result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            setSuccess(true)
        } catch (error) {
            console.error('Ошибка при отправке данных:', error)
            alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.')
        } finally {
            setLoading(false)
        }
    }

    const isNextDisabled = () => {
        if (step === 2) {
            const val = answers[`step_${step}`];
            return !val || val.length === 0;
        }
        if (step === 3) return false;
        return !answers[`step_${step}`];
    }

    const isFormValid = () => contactForm.name && contactForm.phone && contactForm.agree

    const currentData = QUIZ_DATA.find(d => d.id === step)
    const stepData = step === 2 && answers['step_1']
        ? { ...currentData, options: OPTIONS_BY_TYPE[answers['step_1']] || currentData.options }
        : currentData;

    const renderStep1Cards = () => (
        <div className="options-grid-step-1">
            {QUIZ_DATA[0].options.map((opt, idx) => (
                <div key={idx} className={`option-card ${answers['step_1'] === opt ? 'selected' : ''}`} onClick={() => handleAnswer(opt)}>
                    <div className="card-image-wrapper">
                        <img src={TYPE_IMAGES[opt]} alt={opt} />
                        {answers['step_1'] === opt && <div className="check-overlay">✓</div>}
                    </div>
                    <span className="card-title">{opt}</span>
                </div>
            ))}
        </div>
    )

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
                    <input type="range" min={data.min} max={data.max} step={data.step} value={val} onChange={(e) => handleAnswer(Number(e.target.value))} />
                    <div className="slider-labels">
                        <span>{data.min} м²</span>
                        <span>{data.max} м²</span>
                    </div>
                </div>
            </div>
        )
    }

    const renderStep4Cards = () => (
        <div className="options-grid-step-1">
            {QUIZ_DATA[3].options.map((opt, idx) => (
                <div key={idx} className={`option-card ${answers['step_4'] === opt ? 'selected' : ''}`} onClick={() => handleAnswer(opt)}>
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
                                    <>
                                        <div className="quiz-header">МЫ УЖЕ ПРИСТУПИЛИ К РАСЧЁТУ!</div>
                                        <div className="question-title">Укажите ваши контактные данные для получения результата расчёта</div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <input type="text" name="name" className="form-input" placeholder="Имя" required value={contactForm.name} onChange={handleContactChange} />
                                            </div>
                                            <div className="form-group">
                                                <input type="tel" name="phone" className="form-input" placeholder="Номер телефона" required value={contactForm.phone} onChange={handleContactChange} onKeyDown={handlePhoneKeyDown} />
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

                                            <div className="progress-container" style={{ marginTop: '30px' }}>
                                                <span className="progress-text">Шаг 6 из 6</span>
                                                <div className="progress-bar"><div className="progress-fill" style={{ width: '100%' }}></div></div>
                                            </div>

                                            <div className="quiz-footer" style={{ marginTop: '15px' }}>
                                                <button type="button" className="btn-nav" onClick={() => setStep(5)}>← НАЗАД</button>
                                                {/* ИЗМЕНЕНИЕ: кнопка учитывает состояние загрузки */}
                                                <button type="submit" className="btn-nav primary" disabled={!isFormValid() || loading}>
                                                    {loading ? 'ОТПРАВКА...' : 'ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ'}
                                                </button>
                                            </div>
                                        </form>
                                    </>
                                ) : (
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
                                                        <input type="radio" name={`q_${step}`} value={opt} checked={answers[`step_${step}`] === opt} onChange={() => handleAnswer(opt)} />
                                                        <span className="option-icon"></span>
                                                        {opt}
                                                    </label>
                                                ))}
                                            </div>
                                        )}

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