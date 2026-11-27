import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import productsData from '../data/products.json';
import { companyInfo } from '../types';
import { FaWhatsapp, FaGlobe, FaArrowRight, FaCheckCircle, FaLeaf, FaShieldAlt, FaTruck } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { t } = useLanguage();
  const { sku } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const found = productsData.products.find(p => p.sku === sku);
    if (found) {
      setProduct(found);
      setCurrentImage(0);
    } else {
      navigate('/catalog');
    }
  }, [sku, navigate]);

  if (!product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [{ url: 'https://via.placeholder.com/600x600?text=No+Image', alt: product.name_en }];

  const formatPrice = (price: string) => {
    if (!price || price === 'N/A') return t('at contact', 'Contact Us');
    return `${price} ${t('EGP', 'EGP')}`;
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `${t('مرحباً، أود طلب', 'Hi, I want to order')}: ${product.name_ar || product.name_en} (${product.sku}) - ${t('السعر', 'Price')}: ${formatPrice(product.price)}`
    );
    window.open(`https://wa.me/${companyInfo.whatsappPhone}?text=${msg}`, '_blank');
  };

  const handleGroup = () => {
    window.open(companyInfo.whatsappGroup, '_blank');
  };

  const sections = [
    { key: 'description', icon: '📝', label: t('الوصف', 'Description'), en: product.description_en, ar: product.description_ar },
    { key: 'areas', icon: '🎯', label: t('مناطق الاستخدام', 'Areas of Use'), en: product.areas_en, ar: product.areas_ar },
    { key: 'details', icon: '🔬', label: t('التفاصيل والمكونات', 'Details & Composition'), en: product.details_en, ar: product.details_ar },
    { key: 'care', icon: '🧺', label: t('تعليمات العناية', 'Care Instructions'), en: product.care_en, ar: product.care_ar },
  ].filter(s => s.en || s.ar);

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-100 py-3 px-4 mb-6 md:mb-8">
        <div className="max-w-2xl mx-auto">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-eco-main">{t('الرئيسية', 'Home')}</Link></li>
            <li>/</li>
            <li><Link to="/catalog" className="hover:text-eco-main">{t('الكتالوج', 'Catalog')}</Link></li>
            <li>/</li>
            <li className="text-eco-main font-medium truncate max-w-xs">{product.name_ar || product.name_en}</li>
          </ol>
        </div>
      </nav>

      {/* Image Gallery */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-square bg-white rounded-2xl overflow-hidden shadow-lg"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImage}
                src={images[currentImage].url}
                alt={images[currentImage].alt}
                className="w-full h-full object-contain p-6"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={() => setShowModal(true)}
              />
            </AnimatePresence>

            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      i === currentImage ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Image ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Zoom indicator */}
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-gray-600 flex items-center gap-1">
              <FaArrowRight size={12} /> {t('تكبير', 'Zoom')}
            </div>
          </motion.div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-2 overflow-x-auto pb-2"
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    i === currentImage ? 'border-eco-main' : 'border-transparent hover:border-eco-pale'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="mb-4 md:mb-6">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-eco-pale text-eco-main text-sm font-medium">
              {product.category}
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-eco-dark mb-2">
            {product.name_ar || product.name_en}
          </h1>
          {product.name_en && product.name_ar && (
            <h2 className="text-xl text-gray-500 font-normal mb-4">
              {product.name_en}
            </h2>
          )}

          <div className="flex flex-wrap justify-between gap-3 mb-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FaCheckCircle size={14} className="text-green-500" /> SKU: {product.sku}
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle size={14} className="text-green-500" />
              {t('PV', 'PV')}: {product.pv || 'N/A'}
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle size={14} className="text-green-500" />
              {t('CU', 'CU')}: {product.cu || 'N/A'}
            </span>
            <span className="flex items-center gap-1">
              <FaCheckCircle size={14} className="text-green-500" />
              {t('GFT', 'GFT')}: {product.gft || 'N/A'}
            </span>
          </div>

          {/* Price */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-2xl font-bold text-eco-main">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-gray-500">{t('شامل الضريبة', 'Tax included')}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex-1 bg-[#25D366] text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-[#1DB954] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <FaWhatsapp size={22} /> {t('اطلب الآن عبر واتساب', 'Order Now via WhatsApp')}
              </button>
              <button
                onClick={handleGroup}
                className="flex-1 border-2 border-eco-main text-eco-main py-3 rounded-xl font-bold text-lg hover:bg-eco-main hover:text-white transition-all flex items-center justify-center gap-2"
              >
                <FaGlobe size={20} /> {t('انضم للمجموعة', 'Join Group')}
              </button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
              <FaLeaf size={20} className="text-eco-main mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-600">{t('طبيعي 100%', '100% Natural')}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
              <FaShieldAlt size={20} className="text-eco-main mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-600">{t('ضمان الجودة', 'Quality Guarantee')}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-100 text-center">
              <FaTruck size={20} className="text-eco-main mx-auto mb-1" />
              <p className="text-xs font-medium text-gray-600">{t('شحن سريع', 'Fast Shipping')}</p>
            </div>
          </div>

          {/* Signature */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <FaLeaf size={14} className="text-eco-main" />
              <span className="font-medium">{t('مدير بواسطة', 'Managed by')}</span>
              <span className="font-bold text-eco-main">Asmaa</span>
              <span className="text-gray-500">{t('مديرة التسويق والمبيعات - Ecawy', 'Marketing & Sales Manager - Ecawy')}</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Details Sections */}
      {sections.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 md:mt-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-eco-dark mb-6 flex items-center gap-2">
            <FaLeaf size={24} /> {t('تفاصيل المنتج', 'Product Details')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100"
              >
                <h3 className="text-xl font-semibold text-eco-dark mb-3 flex items-center gap-2">
                  <span>{section.icon}</span> {section.label}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{t('العربية', 'Arabic')}</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.ar || t('غير متوفر', 'Not available')}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{t('English', 'English')}</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.en || t('Not available', 'Not available')}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Related Products */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 md:mt-12"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-eco-dark mb-4 flex items-center gap-2">
          <FaLeaf size={24} /> {t('منتجات مشابهة', 'Similar Products')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {productsData.products.filter(p => p.category === product.category && p.sku !== product.sku).slice(0, 4).map((p, i) => (
            <ProductCard key={p.sku} product={p} index={i} />
          ))}
        </div>
      </motion.section>
    </div>
  );
}

import ProductCard from '../components/ProductCard';