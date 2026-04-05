// src/components/Header.jsx
import { useState } from 'react'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogoClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    return (
        <header className="site-header">
            <div className="header-container">
                <div className="header-top">
                    <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
                        <span className="logo-icon">✦</span>
                        VERNIKODOV
                    </div>

                    <nav className={`main-nav ${mobileMenuOpen ? 'open' : ''}`}>
                        <a href="#services" className="nav-link">Услуги</a>
                        <a href="#about" className="nav-link">О компании</a>
                        <a href="#contacts" className="nav-link">Контакты</a>
                    </nav>

                    <div className="header-contact">
                        <a href="tel:+79999999999" className="phone-link">+7 (999) 999-99-99</a>
                        <span className="work-hours">9:00–20:00</span>
                    </div>

                    {/* Кнопка мобильного меню */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{ display: 'none' }} // Скрыто на десктопе, раскомментируйте медиа-запрос в CSS
                    >
                        ☰
                    </button>
                </div>
            </div>
        </header>
    )
}