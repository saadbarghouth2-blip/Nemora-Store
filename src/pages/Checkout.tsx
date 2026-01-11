import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, MessageCircle, User, AlertCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useLanguage } from '../contexts/LanguageContext';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { language, t, dir } = useLanguage();
  const isAr = language === 'ar' || language === 'eg';

  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
  });

  const total = getTotalPrice();
  const shipping = total > 2000 ? 0 : 60;
  const finalTotal = total + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const sendWhatsAppOrder = () => {
    const phoneNumber = "201067431264"; 
    let message = isAr ? `*📦 طلب جديد من نيمورا (NEMORA)*\n` : `*📦 New Order from NEMORA*\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    message += `👤 *${isAr ? 'العميل' : 'Customer'}:* ${shippingInfo.name}\n`;
    message += `📞 *${isAr ? 'الهاتف' : 'Phone'}:* ${shippingInfo.phone}\n`;
    message += `📍 *${isAr ? 'العنوان' : 'Address'}:* ${shippingInfo.city}, ${shippingInfo.address}\n`;
    message += `━━━━━━━━━━━━━━━\n`;
    message += `🛍️ *${isAr ? 'المنتجات' : 'Items'}:*\n`;

    cartItems.forEach((item, index) => {
      const name = isAr ? item.name : (item.nameEn || item.name);
      message += `${index + 1}. *${name}*\n   [${item.selectedSize}] x${item.quantity}\n`;
    });

    message += `━━━━━━━━━━━━━━━\n💰 *${isAr ? 'الإجمالي' : 'Total'}: ${finalTotal} EGP*`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    sendWhatsAppOrder();
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      navigate('/', { replace: true });
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container" style={{ padding: '150px 20px', textAlign: 'center' }}>
        <ShoppingBag size={80} style={{ opacity: 0.1, marginBottom: '20px' }} />
        <h2>{isAr ? 'سلتك فارغة' : 'Your bag is empty'}</h2>
        <button onClick={() => navigate('/products')} className="shop-now-btn" style={{ marginTop: '20px' }}>
          {t('browseProductsCart')}
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page" dir={dir}>
      <div className="checkout-header">
        <h1>{t('checkout')}</h1>
        <p>{isAr ? 'أكمل بياناتك لتأكيد الطلب' : 'Complete your details'}</p>
      </div>

      <div className="checkout-container">
        {/* ملخص الطلب - يظهر أولاً في الموبايل */}
        <aside className="checkout-summary">
          <div className="summary-card">
            <h2>{t('orderSummary')}</h2>
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.cartItemId} className="checkout-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h4>{isAr ? item.name : item.nameEn}</h4>
                    <small>{item.selectedSize} • {item.quantity}x</small>
                  </div>
                  <span>{item.price * item.quantity} EGP</span>
                </div>
              ))}
            </div>
            <div className="checkout-totals">
              <div className="total-row"><span>{t('subtotal')}</span><span>{total} EGP</span></div>
              <div className="total-row"><span>{t('shipping')}</span><span>{shipping === 0 ? t('free') : `${shipping} EGP`}</span></div>
              <div className="total-row final"><span>{t('total')}</span><span>{finalTotal} EGP</span></div>
            </div>
          </div>
        </aside>

        {/* نموذج البيانات */}
        <form onSubmit={handleSubmit} className="checkout-form">
          <div className="checkout-section">
            <h2><User size={20} /> {isAr ? 'بيانات الشحن' : 'Shipping'}</h2>
            
            <div className="form-group">
              <label>{t('fullName')}</label>
              <input required name="name" value={shippingInfo.name} onChange={handleInputChange} placeholder={isAr ? "الاسم ثلاثي" : "Full Name"} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>{isAr ? 'رقم الموبايل' : 'Phone'}</label>
                <input required name="phone" type="tel" value={shippingInfo.phone} onChange={handleInputChange} placeholder="01xxxxxxxxx" />
              </div>
              <div className="form-group">
                <label>{t('city')}</label>
                <input required name="city" value={shippingInfo.city} onChange={handleInputChange} placeholder={isAr ? "المحافظة" : "City"} />
              </div>
            </div>

            <div className="form-group">
              <label>{t('address')}</label>
              <input required name="address" value={shippingInfo.address} onChange={handleInputChange} placeholder={isAr ? "العنوان بالتفصيل" : "Detailed Address"} />
            </div>
          </div>

          <button type="submit" disabled={isProcessing} className="submit-payment-button desktop-only">
            {isProcessing ? t('processing') : <><MessageCircle size={22} /> {isAr ? 'تأكيد الطلب عبر واتساب' : 'Confirm via WhatsApp'}</>}
          </button>
        </form>
      </div>

      {/* زر الموبايل العائم (Sticky Footer) */}
      <div className="mobile-sticky-footer">
        <div className="mobile-total-box">
          <span>{isAr ? 'الإجمالي:' : 'Total:'}</span>
          <span className="price">{finalTotal} EGP</span>
        </div>
        <button onClick={handleSubmit} disabled={isProcessing} className="submit-payment-button">
          {isProcessing ? t('processing') : <><MessageCircle size={20} /> {isAr ? 'تأكيد الطلب' : 'Confirm Order'}</>}
        </button>
      </div>
    </div>
  );
};