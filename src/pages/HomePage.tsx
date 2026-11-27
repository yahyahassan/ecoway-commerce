import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { companyInfo } from '../types';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <section style={{ minHeight: 'calc(100vh - 160px)' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          minHeight: '55vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(14,42,35,0.9) 0%, rgba(27,67,50,0.9) 100%), url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-900 text-sm font-semibold uppercase tracking-wider"
            >
              <span>{t('تصنيف: منتجات طبيعية', 'Category: Natural Products')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight"
            >
              <span className="text-green-400">{t('كتالوج', 'Catalog')}</span>
              <br />
              Ecoway
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl text-green-200/90 max-w-xl mb-8 px-4 md:px-0"
            >
              {t('افضل المنتجات الصديقة للبيئة مع الضمان والجودة العالية', 'Best eco-friendly products with guarantee and high quality')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3 md:gap-4"
            >
              <Link
                to="/catalog"
                className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-[#1DB954] transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center gap-2"
              >
                <span>{t('تصفح المنتجات', 'Browse Products')}</span>
              </Link>
              <a
                href={`https://wa.me/${companyInfo.whatsappPhone}?text=${encodeURIComponent('مرحبا أود الطلب من كتالوج Ecawy')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white text-white px-6 py-3 rounded-xl font-bold text-lg hover:bg-white hover:text-eco-main transition-all transform hover:-translate-y-1"
              >
                <span>{t('اطلب عبر واتساب', 'Order via WhatsApp')}</span>
              </a>
            </motion.div>

            {/* Signature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 pt-6 border-t border-white/10 flex items-center justify-center gap-2"
            >
              <span className="text-green-400 text-xs font-medium">Managed by</span>
              <span className="text-white font-bold italic text-lg">Asmaa</span>
              <span className="text-green-300 text-xs font-medium">
                {t('مديرة التسويق والمبيعات - شركة Ecoway', 'Marketing & Sales Manager - Ecoway')}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats / Trust Bar */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: '85+', label: t('منتج', 'Products') },
              { num: '5+', label: t('فئات', 'Categories') },
              { num: '24/7', label: t('دعم واتساب', 'WhatsApp Support') },
              { num: '全国', label: t('توصيل لجميع المناطق', 'Nationwide Delivery') },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl font-bold text-eco-main mb-2">{item.num}</div>
                <div className="text-gray-600 text-sm font-medium">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-eco-dark mb-2">{t('أحدث المنتجات', 'Featured Products')}</h2>
              <p className="text-gray-600">{t('اكتشف افضل منتجات Ecawy من كتالوج أسما', 'Discover the best Ecawy products from Asmaa catalog')}</p>
            </div>
            <Link
              to="/catalog"
              className="bg-eco-main text-white px-6 py-2 rounded-lg font-medium hover:bg-eco-light transition-colors"
            >
              {t('عرض الكل', 'View All')}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {productsData.products.slice(0, 10).map((product, i) => (
              <ProductCard key={product.sku} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div
            className="bg-linear-gradient from-eco-main to-eco-dark rounded-3xl p-8 text-white text-center shadow-2xl"
            style={{ backgroundImage: 'linear-gradient(135deg, #1B4332 0%, #0E2A23 100%)' }}
          >
            <h2 className="text-3xl font-bold mb-4">{t('هل تحتاج مساعدة؟', 'Need help?')}</h2>
            <p className="text-green-100 text-lg mb-8">{t('راسلنا عبر واتساب وسنرد عليك في أقرب وقت', 'Message us on WhatsApp and we will respond as soon as possible')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${companyInfo.whatsappPhone}?text=${encodeURIComponent('مرحبا أود الاستفسار عن منتجات Ecawy')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-[#1DB954] transition-all transform hover:-translate-y-1 flex items-center gap-2 justify-center"
              >
                <span>{t('راسلنا الآن', 'Message Now')}</span>
              </a>
              <a
                href={companyInfo.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-green-400 text-green-400 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-green-400 hover:text-white transition-all transform hover:-translate-y-1 flex items-center gap-2 justify-center"
              >
                <span>{t('انضم للمجموعة', 'Join Group')}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}