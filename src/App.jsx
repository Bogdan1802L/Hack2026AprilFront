// src/App.jsx
import { useState } from 'react'
import './App.css'

// Header Component
function Header() {
    return (
        <header className="site-header">
            <div className="header-container">
                <div className="header-top">
                    <div className="logo">
                        <span className="logo-icon">✦</span>
                        <span className="logo-text">VERNIKODOV</span>
                    </div>
                    <nav className="main-nav">
                        <a href="#services" className="nav-link">Услуги</a>
                        <a href="#about" className="nav-link">О компании</a>
                        <a href="#prices" className="nav-link">Цены</a>
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

// Services Section
function ServicesSection() {
    const services = [
        {
            title: 'Дизайн-проект квартиры',
            description: 'Полный комплекс услуг по разработке дизайна интерьера квартиры любой сложности'
        },
        {
            title: 'Дизайн-проект дома',
            description: 'Создание уютного и функционального пространства для вашего загородного дома'
        },
        {
            title: 'Дизайн коммерческих помещений',
            description: 'Разработка интерьеров для офисов, магазинов, ресторанов и других объектов'
        },
        {
            title: '3D-визуализация',
            description: 'Фотореалистичная визуализация будущего интерьера для наглядного представления'
        },
        {
            title: 'Авторский надзор',
            description: 'Контроль за реализацией дизайн-проекта на всех этапах ремонтных работ'
        },
        {
            title: 'Комплектация объекта',
            description: 'Подбор и закупка отделочных материалов, мебели и декора'
        }
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

// About Section
function AboutSection() {
    return (
        <section id="about" className="content-section about-section">
            <div className="section-container">
                <h2 className="section-title">О КОМПАНИИ</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p className="about-paragraph">
                            <strong>VERNIKODOV</strong> — это команда профессиональных дизайнеров интерьера с многолетним опытом работы.
                            Мы создаем уникальные пространства, которые отражают индивидуальность наших клиентов и отвечают
                            их образу жизни.
                        </p>
                        <p className="about-paragraph">
                            За годы работы мы реализовали более 500 проектов различной сложности — от небольших студий
                            до просторных загородных домов и коммерческих объектов.
                        </p>
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
            </div>
        </section>
    )
}

// Prices Section
function PricesSection() {
    const prices = [
        {
            name: 'Базовый',
            price: '1 500',
            unit: '₽/м²',
            features: [
                'Планировочное решение',
                '3D-визуализация',
                'Чертежи для строителей',
                'Сроки: 2-3 недели'
            ]
        },
        {
            name: 'Оптимальный',
            price: '2 500',
            unit: '₽/м²',
            popular: true,
            features: [
                'Все из базового',
                'Подбор материалов',
                'Спецификации',
                'Консультации дизайнера',
                'Сроки: 3-4 недели'
            ]
        },
        {
            name: 'Полный',
            price: '4 000',
            unit: '₽/м²',
            features: [
                'Все из оптимального',
                'Авторский надзор',
                'Комплектация объекта',
                'Выезды на объект',
                'Сроки: 4-6 недель'
            ]
        }
    ]

    return (
        <section id="prices" className="content-section">
            <div className="section-container">
                <h2 className="section-title">ЦЕНЫ</h2>
                <div className="prices-grid">
                    {prices.map((tariff, index) => (
                        <div key={index} className={`price-card ${tariff.popular ? 'popular' : ''}`}>
                            {tariff.popular && <div className="popular-badge">Популярный</div>}
                            <h3 className="price-name">{tariff.name}</h3>
                            <div className="price-value">
                                <span className="price-amount">{tariff.price}</span>
                                <span className="price-unit">{tariff.unit}</span>
                            </div>
                            <ul className="price-features">
                                {tariff.features.map((feature, idx) => (
                                    <li key={idx} className="price-feature">{feature}</li>
                                ))}
                            </ul>
                            <button className="price-button">Выбрать</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// Contacts Section
function ContactsSection() {
    return (
        <section id="contacts" className="content-section contacts-section">
            <div className="section-container">
                <h2 className="section-title">КОНТАКТЫ</h2>
                <div className="contacts-content">
                    <div className="contacts-info">
                        <div className="contact-item">
                            <h3 className="contact-label">Телефон</h3>
                            <a href="tel:+79999999999" className="contact-value">+7 (999) 999-99-99</a>
                        </div>
                        <div className="contact-item">
                            <h3 className="contact-label">E-mail</h3>
                            <a href="mailto:info@vernikodov.ru" className="contact-value">info@vernikodov.ru</a>
                        </div>
                        <div className="contact-item">
                            <h3 className="contact-label">Адрес</h3>
                            <p className="contact-value">г. Москва, ул. Примерная, д. 123, оф. 456</p>
                        </div>
                        <div className="contact-item">
                            <h3 className="contact-label">Режим работы</h3>
                            <p className="contact-value">Пн-Пт: 9:00–20:00<br/>Сб-Вс: 10:00–18:00</p>
                        </div>
                    </div>
                    <div className="contacts-map">
                        <div className="map-placeholder">
                            <span>Карта</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const QUIZ_DATA = [
    {
        id: 1,
        type: 'single',
        title: 'Какое помещение вы планируете оформить?',
        options: [
            'Квартира',
            'Частный дом',
            'Офис',
            'Коммерческое помещение',
            'Студия / апартаменты',
            'Другое'
        ],
        message: 'Знание типа помещения поможет нам определить базовый объем работ и стоимость проекта.'
    },
    {
        id: 2,
        type: 'multiple',
        title: 'Какие зоны нужно включить в дизайн-проект?',
        options: [
            'Кухня',
            'Гостиная',
            'Спальня',
            'Детская',
            'Санузел',
            'Прихожая',
            'Кабинет',
            'Гардеробная',
            'Балкон / лоджия',
            'Полностью всё помещение'
        ],
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
        options: [
            'Современный',
            'Минимализм',
            'Скандинавский',
            'Лофт',
            'Неоклассика',
            'Классика',
            'Пока не определился'
        ],
        message: 'Это поможет нашим дизайнерам подготовить для вас наиболее релевантные примеры.'
    },
    {
        id: 5,
        type: 'single',
        title: 'Какой бюджет на реализацию интерьера вы рассматриваете?',
        options: [
            'До 500 000 ₽',
            '500 000 – 1 000 000 ₽',
            '1 000 000 – 2 000 000 ₽',
            'От 2 000 000 ₽',
            'Пока не знаю'
        ],
        message: 'Бюджет на реализацию важен, чтобы мы предложили материалы и решения, соответствующие вашим возможностям.'
    }
]

function App() {
    const [started, setStarted] = useState(false)
    const [step, setStep] = useState(1)
    const [answers, setAnswers] = useState({})
    const [contactForm, setContactForm] = useState({
        name: '',
        phone: '',
        email: '',
        comment: '',
        agree: false
    })
    const [success, setSuccess] = useState(false)

    const handleStart = () => {
        setStarted(true)
    }

    const handleNext = () => {
        if (step < 5) {
            setStep(step + 1)
        } else {
            setStep(6)
        }
    }

    const handlePrev = () => {
        if (step > 1) {
            setStep(step - 1)
        } else {
            setStarted(false)
        }
    }

    const handleAnswer = (value) => {
        setAnswers(prev => ({
            ...prev,
            [`step_${step}`]: value
        }))
    }

    const handleContactChange = (e) => {
        const { name, value, type, checked } = e.target
        setContactForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!contactForm.phone || !contactForm.agree) {
            alert('Пожалуйста, заполните телефон и дайте согласие на обработку данных.')
            return
        }

        const finalData = {
            ...answers,
            contact: contactForm,
            timestamp: new Date().toISOString()
        }

        console.log('SUBMITTING DATA:', finalData)

        setTimeout(() => {
            setSuccess(true)
        }, 500)
    }

    const isNextDisabled = () => {
        if (!answers[`step_${step}`]) return true
        return false
    }

    const isFormValid = () => {
        return contactForm.phone && contactForm.agree
    }

    const renderQuestionContent = (data) => {
        if (!data) return null

        return (
            <div className="options-list">
                {data.type === 'single' && data.options.map((opt, idx) => (
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

                {data.type === 'multiple' && data.options.map((opt, idx) => {
                    const currentSelection = answers[`step_${step}`] || []
                    const isChecked = currentSelection.includes(opt)

                    const toggleCheck = () => {
                        let newSelection
                        if (isChecked) {
                            newSelection = currentSelection.filter(item => item !== opt)
                        } else {
                            newSelection = [...currentSelection, opt]
                        }
                        handleAnswer(newSelection)
                    }

                    return (
                        <div key={idx} className="option-item checkbox" onClick={toggleCheck}>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {}}
                            />
                            <span className="option-icon"></span>
                            {opt}
                        </div>
                    )
                })}

                {data.type === 'range' && (
                    <div className="range-container">
                        <span className="range-value">{answers[`step_${step}`] || data.defaultValue} м²</span>
                        <input
                            type="range"
                            min={data.min}
                            max={data.max}
                            step={data.step}
                            defaultValue={data.defaultValue}
                            onChange={(e) => handleAnswer(e.target.value)}
                        />
                    </div>
                )}
            </div>
        )
    }

    if (!started) {
        return (
            <div className="page-wrapper">
                <Header />
                <div className="app-container">
                    <div className="start-screen">
                        <h1 className="start-title">ПРОЙДИТЕ ТЕСТ И УЗНАЙТЕ СТОИМОСТЬ ДИЗАЙН-ПРОЕКТА ЗА 2 МИНУТЫ</h1>
                        <button className="start-btn" onClick={handleStart}>НАЧАТЬ ТЕСТ</button>
                    </div>
                </div>
                <ServicesSection />
                <AboutSection />
                <PricesSection />
                <ContactsSection />
            </div>
        )
    }

    if (success) {
        return (
            <div className="page-wrapper">
                <Header />
                <div className="app-container">
                    <div className="quiz-wrapper" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <div className="success-screen">
                            <h2 className="success-title">СПАСИБО ЗА ОТВЕТЫ!</h2>
                            <p>В ближайшее время с вами свяжется наш специалист и предоставит все необходимые консультации.</p>
                            <button className="success-btn" onClick={() => window.location.reload()}>ПОНЯТНО</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const currentData = QUIZ_DATA.find(d => d.id === step)

    return (
        <div className="page-wrapper">
            <Header />
            <div className="app-container">
                <div className="quiz-wrapper">
                    <div className="quiz-left">
                        {step === 6 ? (
                            <>
                                <div className="quiz-header">Мы уже приступили к расчёту!</div>
                                <div className="question-title" style={{fontSize: '1.4rem'}}>
                                    Укажите ваши контактные данные для получения результата расчёта и закрепления за вами персональной скидки 5%
                                </div>

                                <form onSubmit={handleSubmit} style={{ marginTop: '30px' }}>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-input"
                                            placeholder="Имя"
                                            value={contactForm.name}
                                            onChange={handleContactChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="tel"
                                            name="phone"
                                            className="form-input"
                                            placeholder="Телефон *"
                                            required
                                            value={contactForm.phone}
                                            onChange={handleContactChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            className="form-input"
                                            placeholder="E-mail (необязательно)"
                                            value={contactForm.email}
                                            onChange={handleContactChange}
                                        />
                                    </div>
                                    <div className="form-group">
                    <textarea
                        name="comment"
                        className="form-input"
                        rows="2"
                        placeholder="Комментарий"
                        value={contactForm.comment}
                        onChange={handleContactChange}
                    />
                                    </div>

                                    <label className="form-checkbox">
                                        <input
                                            type="checkbox"
                                            name="agree"
                                            checked={contactForm.agree}
                                            onChange={handleContactChange}
                                        />
                                        <span>Я даю согласие на обработку персональных данных</span>
                                    </label>

                                    <div style={{ marginTop: '30px' }}>
                                        <button
                                            type="submit"
                                            className="btn-nav primary"
                                            style={{ width: '100%', padding: '15px', fontSize: '1rem' }}
                                            disabled={!isFormValid()}
                                        >
                                            ОСТАВИТЬ ЗАЯВКУ
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="quiz-header">Узнайте стоимость дизайн-проекта</div>
                                <div className="question-title">{currentData.title}</div>
                                {renderQuestionContent(currentData)}

                                <div className="quiz-footer">
                                    <div className="progress-container">
                                        <span className="progress-text">Выполнено {step} из 5</span>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: `${(step / 5) * 100}%` }}></div>
                                        </div>
                                    </div>
                                    <div className="nav-buttons">
                                        <button className="btn-nav" onClick={handlePrev}>
                                            {step === 1 ? '← Назад' : '←'}
                                        </button>
                                        <button
                                            className="btn-nav primary"
                                            onClick={handleNext}
                                            disabled={isNextDisabled()}
                                        >
                                            Далее
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {step !== 6 && (
                        <div className="quiz-right">
                            <div>
                                <div className="manager-card">
                                    <div className="manager-avatar"></div>
                                    <div>
                                        <div className="manager-name">ОЛЕГ</div>
                                        <div className="manager-role">Менеджер проекта</div>
                                    </div>
                                </div>
                                <div className="manager-message">
                                    {currentData.message}
                                </div>
                            </div>

                            <div className="discount-badge">
                                <span className="lock-icon">🔒</span>
                                Персональная скидка 5% на дизайн-проект
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ServicesSection />
            <AboutSection />
            <PricesSection />
            <ContactsSection />
        </div>
    )
}

export default App