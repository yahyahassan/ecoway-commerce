import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import productsData from '../data/products.json';
import ProductCard from '../components/ProductCard';
import { companyInfo } from '../types';

export default function CatalogPage() {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const cats = new Set(products.map(p => p.category || 'other'));
    return ['all', ...cats].sort();
  }, []);

  const allProducts = productsData.products || [];
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-eco-main text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-eco-dark/50 to-eco-main/50" />
        <div className="absolute inset-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }} />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
            {t('كتالوج المنتجات', 'Product Catalog')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-green-200 text-lg max-w-2xl mx-auto">
            {t('اكتشف جميع منتجات Ecawy مع فلترة متقدمة وبحث سريع', 'Discover all Ecawy products with advanced filtering and quick search')}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          {/* Search */}
          <div className="mb-6">
            <label className="sr-only">{t('ابحث عن منتج', 'Search products')}</label>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t('ابحث بالاسم، الكود، أو السعر...', 'Search by name, SKU, or price...')}
              className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-eco-lighter focus:border-transparent text-base text-gray-800 placeholder-gray-400"
              style={{ fontFamily: '"Tajawal", sans-serif' }}
            />
          </div>

          {/* Category Filter */}
          <div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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
          <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
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
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
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
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('لا توجد نتائج', 'No results found')}</h3>
                <p className="text-gray-500">{t('جرب تغيير البحث أو الفئة', 'Try changing your search or filter')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}