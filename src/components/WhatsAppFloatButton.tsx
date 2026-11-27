import { Link } from 'react-router-dom';
import { companyInfo } from '../types';

export function WhatsAppFloatButton() {
  return (
    <a
      href={`https://wa.me/${companyInfo.whatsappPhone}?text=${encodeURIComponent('مرحبا، أود طلب منتجات من Ecawy')}`}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: '#25D366',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        zIndex: 999,
        animation: 'float 3s ease-in-out infinite',
      }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M22 6c0-3.2-2.6-5.8-5.8-5.8-3.2 0-5.8 2.6-5.8 5.8 0 2.8 1.7 5.2 4.1 6.5l-1 3c-0.1 0.4-0.4 0.7-0.9 0.7-0.2 0-0.4-0.1-0.5-0.2l-2-1c-0.6-0.4-1.1-0.7-1.5-0.8-0.4-0.1-0.8-0.3-1.1-0.4-0.1-0.1-0.2-0.2-0.2-0.2C5 12.8 3 13.8 3 16c0 3.2 2.6 5.8 5.8 5.8 0.4 0 0.8 0 1.1-0.1 2.9-1.1 4.6-4 4.6-6.7 0-0.8-0.1-1.5-0.3-2.2l1.1-1.5c0.4-0.4 0.7-1 0.7-1.5 0-0.2-0.1-0.3-0.1-0.5C10.6 7.3 8.3 5 5.8 5c-1.7 0-3.1 1.3-3.6 3 0 0-0.1 0.1-0.1 0.1-0.1 0.1-0.1 0.2-0.1 0.3 0 0.1-0.1 0.3-0.1 0.4C2.2 14 10 20 10 20c1.8 0 3.3-0.9 4.3-1.9l0.1 0.1c0.3-0.3 0.6-0.7 0.6-1.2 0-0.3-0.1-0.7-0.3-1l-1-3c-0.1-0.3-0.1-0.6 0-0.9s0.3-0.3 0.6-0.3c0.7-0.1 1.5 0 2.1 0.2l3 1c0.4 0.2 0.8 0.5 1 0.8l0.1 0.1c0.3 0.3 0.5 0.7 0.5 1.1 0 0.2 0 0.3-0.1 0.5l-0.1 0.1c0.2 0.4 0.3 0.9 0.3 1.3 0 2.2-1.7 4.2-4.1 5.3C12.7 22 10 22 9 22c-2.6 0-5.1-1-7-2.8-2-1.8-2.9-4.2-2.9-6.7 0-2.2 1.4-4.1 3.5-4.9 1.5-0.6 3.1-0.9 4.8-0.9l0.1 0c1.5 0 3 0.2 4.4 0.6 2.1 0.6 3.8 1.9 4.8 3.6L22 12c0-1.6-1-3-2.2-4L16 5c-0.3-0.3-0.6-0.5-0.9-0.6L12 1c-2 0-4 1.6-4 3.6z" />
      </svg>
    </a>
  );
}

const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
`;
document.head.appendChild(style);