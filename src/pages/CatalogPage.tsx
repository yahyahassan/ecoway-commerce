import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { companyInfo } from '../types';
import { Link } from 'react-router-dom';

export default function CatalogPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = new Set(productsData.products.map(p => p.category || 'other'));
    return ['all', ...cats].sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return productsData.products.filter(p => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const searchLower = search.toLowerCase();
      const matchesSearch = !search || 
        (p.name_ar && p.name_ar.toLowerCase().includes(searchLower)) ||
        (p.name_en && p.name_en.toLowerCase().includes(searchLower)) ||
        (p.sku && p.sku.toLowerCase().includes(searchLower));
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const formatCategory = (cat: string) => {
    const names: Record<string, string> = {
      all: t('الكل', 'All'),
      towel: t('الفوطة', 'Towels'),
      soap: t('صابون', 'Soaps'),
      sponge: t('الإسفنجة', 'Sponges'),
      perfume: t('العطور', 'Perfumes'),
      bag: t('الحقائب', 'Bags'),
      laundry: t('غسيل', 'Laundry'),
      acupressure: t('الاكو بريشر', 'Acupressure'),
      device: t('الأجهزة', 'Devices'),
      other: t('أخرى', 'Other'),
    };
    return names[cat] || cat;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Hero */}
      <section className="bg-eco-main text-white pb-6 md:pb-10">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold mb-2"
          >
            {t('كتالوج المنتجات', 'Product Catalog')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-green-200 text-base md:text-lg max-w-2xl mx-auto mb-6"
          >
            {t('اكتشف جميع منتجات Ecawy مع فلترة متقدمة وبحث سريع', 'Discover all Ecawy products with advanced filtering and quick search')}
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/catalog"
              className="bg-[#25D366] text-white px-5 py-3 rounded-full font-bold text-lg shadow-lg hover:bg-[#1DB954] transition-all transform hover:-translate-y-1 flex items-center gap-2"
            >
              <span>{t('تصفح المنتجات', 'Browse Products')}</span>
            </Link>
            <a
              href={`https://wa.me/${companyInfo.whatsappPhone}?text=${encodeURIComponent('مرحبا أود الطلب من كتالوج Ecawy')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-5 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-eco-main transition-all transform hover:-translate-y-1 flex items-center gap-2"
            >
              <span>{t('اطلب عبر واتساب', 'Order via WhatsApp')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 bg-white mb-4 md:mb-6">
        <div className="max-w-2xl mx-auto">
          {/* Search */}
          <div className="mb-4 sm:mb-6">
            <label className="sr-only">{t('ابحث عن منتج', 'Search products')}</label>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('ابحث بالاسم، الكود، أو السعر...', 'Search by name, SKU, or price...')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-eco-lighter focus:border-transparent text-base text-gray-800 placeholder-gray-400"
              style={{ fontFamily: '"Tajawal", sans-serif' }}
            />
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-eco-main text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-eco-pale hover:text-eco-main'
                  }`}
                >
                  {formatCategory(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{t('تم العثور على', 'Found')} <strong>{filteredProducts.length}</strong> {t('منتج', 'products')}</span>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-eco-main font-medium hover:underline"
              >
                {t('عرض الكل', 'Show all')}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
              >
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.sku} product={product} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 text-gray-500"
              >
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">{t('لا توجد نتائج', 'No results found')}</h3>
                <p>{t('جرب تغيير البحث أو الفئة', 'Try changing your search or filter')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}