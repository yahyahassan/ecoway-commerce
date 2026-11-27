import { useLanguage } from '../context/LanguageContext';
import { FaWhatsapp, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { companyInfo } from '../types';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="bg-gradient-to-br from-eco-main to-eco-dark text-white py-3 px-4 shadow-lg fixed w-full top-0 z-50">
      <div className="flex justify-between items-center gap-4">
        <Link to="/" className="flex items-center gap-2 text-white no-underline">
          <span className="text-xl font-bold tracking-wide">Ecoway</span>
          <span className="text-lg">🌿</span>
        </Link>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => window.open(companyInfo.whatsappGroup, '_blank')}
            className="flex items-center gap-1 text-sm px-2 py-1.5 rounded-lg bg-green-600/20 hover:bg-green-600/40 transition-colors"
            title="مجموعة واتساب"
          >
            <FaWhatsapp size={14} />
          </button>
          <a
            href={companyInfo.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-green-200 hover:text-white transition-colors flex items-center gap-1"
          >
            <FaGlobe size={14} /> <span className="hidden md:inline">{t('الموقع الرسمي', 'Official')}</span>
          </a>
          <Link to="/admin" className="text-sm text-green-300 hover:text-green-200 transition-colors">
            {t('التحكم', 'Admin')}
          </Link>
        </div>

        <button
          onClick={() => window.open(companyInfo.whatsappGroup, '_blank')}
          className="bg-[#25D366] text-eco-dark font-semibold px-3 py-1.5 rounded-lg hover:bg-[#1DB954] transition-colors flex items-center gap-1.5"
        >
          <FaWhatsapp size={14} /> <span className="hidden md:inline">{t('اطلب الآن', 'Order')}</span>
        </button>
      </div>
    </header>
  );
}