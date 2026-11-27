import { useLanguage } from '../context/LanguageContext';
import { companyInfo } from '../types';

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background: '#0E2A23',
      color: 'white',
      padding: '3rem 2rem 1.5rem',
    }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-between gap-8">
          <div style={{ maxWidth: 300 }}>
            <h3 style={{ fontWeight: 800, letterSpacing: '1px', marginBottom: '0.8rem' }}>
              Ecoway 🌿
            </h3>
            <p style={{ opacity: 0.7, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>
              {t(
                'الوجهة الأولى للمنتجات البيئية الصديقة للبيئة. ابحث عن منتجاتنا العالية الجودة.',
                'The premier destination for eco-friendly products. Discover our high-quality range.'
              )}
            </p>
            <a
              href={companyInfo.website}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#52B788', textDecoration: 'none', fontSize: '0.9rem' }}
            >
              {companyInfo.website} ↗
            </a>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.8rem' }}>
              {t('تواصل معنا', 'Contact Us')}
            </h4>
            <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              📞 {companyInfo.whatsappPhone}
            </p>
            <a
              href={`https://wa.me/${companyInfo.whatsappPhone}?text=${encodeURIComponent('مرحبا أنا مهتم بمنتجات Ecawy')}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#52B788', textDecoration: 'none', fontSize: '0.9rem' }}
            >
              WhatsApp: {companyInfo.whatsappPhone}
            </a>
          </div>

          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '0.8rem' }}>
              {t('المعلومات', 'Information')}
            </h4>
            <p style={{ opacity: 0.7, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {t('مدير التسويق والمبيعات', 'Marketing & Sales Manager')}: {companyInfo.managerName}
            </p>
            <p style={{ opacity: 0.7, fontSize: '0.9rem' }}>
              {t('الموقع الرسمي', 'Official Website')}: {companyInfo.website}
            </p>
          </div>
        </div>

        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
        }}>
          <p style={{ opacity: 0.5, fontSize: '0.8rem', margin: 0 }}>
            © {year} Ecoway. {t('جميع الحقوق محفوظة. صُمم بـ ❤️ لأسما', 'All rights reserved. Designed with ❤️ for Asmaa')}
          </p>
        </div>
      </div>
    </footer>
  );
}