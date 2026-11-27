import { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import productsData from '../data/products.json';
import { companyInfo } from '../types';

export default function AdminPage() {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [editData, setEditData] = useState<any>(null);
  const [message, setMessage] = useState({ text: '', type: 'success' });

  const allProducts = productsData.products || [];
  const filteredProducts = useMemo(() => {
    if (isAuthenticated) return productsData.products || [];
    return [];
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === 'Ecoway2024') {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      setMessage({ text: t('كلمة مرور غير صحيحة', 'Incorrect password'), type: 'error' });
      setTimeout(() => setMessage({ text: '', type: 'success' }), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEditingProduct(null);
    setEditData(null);
  };

  const startEdit = (product: any) => {
    setEditingProduct(product.sku);
    setEditData({ ...product });
  };

  const cancelEdit = () => {
    setEditingProduct(null);
    setEditData(null);
  };

  const saveChanges = () => {
    if (!editData) return;
    // In a real app this would save to a backend
    setMessage({
      text: t('تم حفظ التغييرات بنجاح', 'Changes saved successfully'),
      type: 'success',
    });
    setTimeout(() => setMessage({ text: '', type: 'success' }), 3000);
    cancelEdit();
  };

  const formatPrice = (price: string) => {
    if (!price || price === 'N/A') return t('اتصل بنا', 'Contact Us');
    return `${price} ${t('جنيه', 'EGP')}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-eco-main flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-eco-light rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔐</span>
            </div>
            <h2 className="text-2xl font-bold text-eco-dark mb-2">
              {t('لوحة تحكم أسما', 'Asmaa Control Panel')}
            </h2>
            <p className="text-gray-600">{t('إدارة منتجات Ecawy', 'Ecawy Products Management')}</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('كلمة المرور', 'Password')}
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={t('أدخل كلمة المرور', 'Enter password')}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-eco-lighter focus:border-transparent text-base"
              />
            </div>
            {message.text && (
              <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                {message.text}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-eco-main text-white py-3 rounded-xl font-bold hover:bg-eco-light transition-colors"
            >
              {t('تسجيل الدخول', 'Sign in')}
            </button>
            <p className="text-xs text-gray-400 text-center mt-4">
              {t(' للوصول للمدير: Ecoway2024', 'Admin access code: Ecoway2024')}
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-eco-main rounded-lg flex items-center justify-center text-white">
              <span>🌿</span>
            </div>
            <h1 className="text-xl font-bold text-eco-dark">
              {t('لوحة التحكم', 'Admin Panel')}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-sm">
              {t('مرحباً', 'Hello')} {companyInfo.managerName}
            </span>
            <button
              onClick={handleLogout}
              className="text-eco-main font-medium hover:underline text-sm"
            >
              {t('تسجيل الخروج', 'Logout')}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[422, filteredProducts.length, '3+', '100%'].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-eco-main mb-1">{stat}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                {i === 0 ? t('صورة', 'Images') : i === 1 ? t('منتج', 'Products') : i === 2 ? t('فئات', 'Categories') : t('ضمان جودة', 'Quality')}
              </div>
            </div>
          ))}
        </div>

        {/* Products List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-eco-dark">{t('إدارة المنتجات', 'Manage Products')}</h2>
            <div className="flex gap-2">
              <select className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-eco-lighter text-sm bg-gray-50">
                <option>{t('الكل', 'All')}</option>
                <option>الفوطة</option>
                <option>صابون</option>
                <option>الإسفنجة</option>
                <option>العطور</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">{t('صورة', 'Image')}</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">{t('الاسم', 'Name')}</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">{t('الكود', 'SKU')}</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">{t('السعر', 'Price')}</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">{t('الفئة', 'Category')}</th>
                  <th className="px-6 py-3 text-sm font-medium text-gray-600">{t('إجراءات', 'Actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => (
                  <tr key={product.sku} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {product.images && product.images.length > 0 ? (
                          <img src={product.images[0].url} className="w-full h-full object-cover" alt="" />
                        ) : (
                          <span className="text-gray-400 text-xs">📦</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{product.name_ar || product.name_en}</div>
                      <div className="text-xs text-gray-500">{product.name_en || product.name_ar}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-700">{product.sku}</td>
                    <td className="px-6 py-4 text-sm">{formatPrice(product.price)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-2 py-1 bg-eco-pale text-eco-main rounded-full text-xs font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(product)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          {t('تعديل', 'Edit')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingProduct && editData && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={cancelEdit}>
            <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl border border-gray-100" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-eco-dark">{t('تعديل منتج', 'Edit Product')}</h3>
                <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-900">
                  <span className="text-2xl">✕</span>
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); saveChanges(); }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('الاسم العربي', 'Arabic Name')}</label>
                  <input
                    type="text"
                    value={editData.name_ar}
                    onChange={e => setEditData({ ...editData, name_ar: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-eco-lighter focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('الاسم الإنجليزي', 'English Name')}</label>
                  <input
                    type="text"
                    value={editData.name_en}
                    onChange={e => setEditData({ ...editData, name_en: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-eco-lighter focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('السعر', 'Price')}</label>
                    <input
                      type="text"
                      value={editData.price}
                      onChange={e => setEditData({ ...editData, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-eco-lighter focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('الكود', 'SKU')}</label>
                    <input
                      type="text"
                      value={editData.sku}
                      onChange={e => setEditData({ ...editData, sku: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-eco-lighter focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('PV', 'PV')}</label>
                    <input
                      type="text"
                      value={editData.pv}
                      onChange={e => setEditData({ ...editData, pv: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-eco-lighter focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('CU', 'CU')}</label>
                    <input
                      type="text"
                      value={editData.cu}
                      onChange={e => setEditData({ ...editData, cu: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-eco-lighter focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('الفئة', 'Category')}</label>
                  <select
                    value={editData.category || ''}
                    onChange={e => setEditData({ ...editData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-eco-lighter focus:border-transparent"
                  >
                    <option value="">{t('اختر فئة', 'Select Category')}</option>
                    <option value="towel">الفوطة</option>
                    <option value="soap">صابون</option>
                    <option value="sponge">الإسفنجة</option>
                    <option value="perfume">العطور</option>
                    <option value="bag">الحقائب</option>
                    <option value="laundry">غسيل</option>
                    <option value="acupressure">الاكو بريشر</option>
                    <option value="device">الأجهزة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="flex-1 py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    {t('إلغاء', 'Cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-lg bg-eco-main text-white font-bold hover:bg-eco-light transition-colors"
                  >
                    {t('حفظ التغييرات', 'Save Changes')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6">
          <h4 className="font-bold text-green-800 mb-2">{t('معلومات', 'Info')}</h4>
          <p className="text-green-700 text-sm">
            {t('هذه لوحة تحكم خاصة بأسما (مديرة التسويق والمبيعات في شركة Ecawy). يمكنك تعديل معلومات المنتجات، الأسعار، الوصف، والفئات.', 'This is Asmaa control panel (Marketing & Sales Manager at Ecawy Company). You can edit product information, prices, descriptions, and categories.')}
          </p>
        </div>
      </div>
    </div>
  );
}