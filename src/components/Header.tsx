import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FaWhatsapp, FaGlobe, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { companyInfo } from '../types';

export default function Header() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-br from-eco-main to-eco-dark text-white py-3 px-4 shadow-lg fixed w-full top-0 z-50">
      <div className="flex justify-between items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-white no-underline flex-shrink-0">
          <span className="text-xl font-bold tracking-wide hidden sm:inline">Ecoway</span>
          <span className="text-lg">🌿</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={companyInfo.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-200 hover:text-white transition-colors flex items-center gap-1 px-2 py-1 rounded-md hover:bg-white/10"
          >
            <FaGlobe size={14} /> <span>{t('الموقع الرسمي', 'Official')}</span>
          </a>
          <a
            href={companyInfo.whatsappGroup}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm px-2 py-1.5 rounded-lg bg-green-600/20 hover:bg-green-600/40 transition-colors"
            title="مجموعة واتساب"
          >
            <FaWhatsapp size={14} />
          </a>
          <Link
            to="/admin"
            className="text-sm text-green-300 hover:text-green-200 transition-colors px-2 py-1.5 rounded-md hover:bg-white/10"
          >
            {t('التحكم', 'Admin')}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-green-100"
          aria-label={mobileMenuOpen ? t('إغلاق القائمة', 'Close menu') : t('فتح القائمة', 'Open menu')}
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <a
            href={`https://wa.me/${companyInfo.whatsappPhone}?text=${encodeURIComponent('مرحبا أود الطلب من كتالوج Ecawy')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-eco-dark font-semibold px-3 py-1.5 rounded-lg hover:bg-[#1DB954] transition-colors flex items-center gap-1.5"
          >
            <FaWhatsapp size={14} /> <span>{t('اطلب الآن', 'Order')}</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-white/10 animate-slide-down">
          <div className="flex flex-col gap-3">
            <a
              href={companyInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-200 hover:text-white transition-colors flex items-center gap-2 px-2 py-2 rounded-md bg-white/5"
            >
              <FaGlobe size={16} /> {t('الموقع الرسمي', 'Official Site')}
            </a>
            <a
              href={companyInfo.whatsappGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600/20 hover:bg-green-600/40 transition-colors flex items-center gap-2 px-2 py-2 rounded-lg"
            >
              <FaWhatsapp size={16} /> {t('مجموعة واتساب', 'WhatsApp Group')}
            </a>
            <Link
              to="/admin"
              className="text-green-300 hover:text-green-200 transition-colors flex items-center gap-2 px-2 py-2 rounded-md bg-white/5"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('لوحة التحكم', 'Admin Panel')}
            </Link>
            <a
              href={`https://wa.me/${companyInfo.whatsappPhone}?text=${encodeURIComponent('مرحبا أود الطلب من كتالوج Ecawy')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-eco-dark font-semibold px-4 py-2.5 rounded-lg hover:bg-[#1DB954] transition-colors flex items-center justify-center gap-2"
            >
              <FaWhatsapp size={18} /> {t('اطلب الآن عبر واتساب', 'Order Now via WhatsApp')}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}