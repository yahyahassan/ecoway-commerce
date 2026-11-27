import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { FaWhatsapp, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { companyInfo } from '../types';

interface ProductCardProps {
  product: {
    name_ar?: string;
    name_en?: string;
    sku?: string;
    price?: string;
    category?: string;
    images?: Array<{ url: string; alt: string }>;
  };
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { t } = useLanguage();

  const formatPrice = (price: string | undefined) => {
    if (!price || price === 'N/A') return t('at contact', 'Contact');
    return `${price} ${t('EGP', 'EGP')}`;
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const msg = encodeURIComponent(
      `${t('Hi, I inquire about', 'مرحبا أود الاستفسار عن')}: ${product.name_ar || product.name_en} (${product.sku || ''}) - ${t('Price', 'السعر')}: ${formatPrice(product.price)}`
    );
    window.open(`https://wa.me/${companyInfo.whatsappPhone}?text=${msg}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 border-y-0"
    >
      <div className="relative h-60 bg-gray-100 flex items-center justify-center overflow-hidden px-4 pb-6">
        {product.images && product.images.length > 0 ? (
          <motion.img
            src={product.images[0].url}
            alt={product.name_ar || product.name_en}
            loading="lazy"
            className="w-full h-auto object-contain transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="text-7xl opacity-30">📦</div>
        )}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            to={`/product/${product.sku || 'detail'}`}
            className="bg-white/90 text-eco-main text-xs font-medium px-3 py-1.5 rounded-full hover:bg-white transition-colors shadow-lg flex items-center gap-1"
          >
            <FaEye size={16} /> {t('Details', 'عرض التفاصيل')}
          </Link>
        </div>
      </div>

      <div className="p-4 pt-0 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-eco-dark text-base line-clamp-1 mb-1">
              {product.name_ar || product.name_en || 'Product'}
            </h3>
            <p className="text-xs text-gray-500">
              {t('SKU', 'SKU')}: {product.sku || 'N/A'}
            </p>
          </div>
          <span className="bg-eco-pale text-eco-main text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
            {product.category || 'General'}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-2xl font-bold text-eco-main">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleWhatsApp}
            className="bg-[#25D366] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 min-h-[44px] hover:bg-[#1DB954] transition-colors"
            title={t('Order via WhatsApp', 'اطلب عبر واتساب')}
          >
            <FaWhatsapp size={16} />
            <span className="hidden sm:inline">{t('Order', 'اطلب')}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}