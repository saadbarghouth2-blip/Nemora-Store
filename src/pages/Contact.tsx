import { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact = () => {
  const { language, t, dir } = useLanguage();
  
  // حركنا تعريف isAr هنا فوق عشان يكون متاح في كل مكان في الكود
  const isAr = language === 'ar' || language === 'eg';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      const elements = ref.current.querySelectorAll('.fade-in');
      elements.forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const myNumber = "201067431264";

    let text = isAr 
      ? `*رسالة جديدة من نموذج الاتصال (NEMORA)* 📩\n\n`
      : `*New Message from Contact Form (NEMORA)* 📩\n\n`;
    
    text += `👤 *${isAr ? 'الاسم' : 'Name'}:* ${formData.name}\n`;
    text += `📧 *${isAr ? 'الإيميل' : 'Email'}:* ${formData.email}\n\n`;
    text += `💬 *${isAr ? 'الرسالة' : 'Message'}:*\n${formData.message}`;

    const whatsappUrl = `https://wa.me/${myNumber}?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="contact-page" dir={dir} ref={ref} style={{ paddingBottom: '80px' }}>
      <section className="contact-hero fade-in">
        <h1 style={{ fontSize: '3rem', fontWeight: 900 }}>{t('getInTouch')}</h1>
        <p>
          {isAr 
            ? 'عندك سؤال أو محتاج مساعدة؟ احنا حابين نسمع منك.' 
            : 'Have a question or need help? We would love to hear from you.'}
        </p>
      </section>

      <div className="contact-content">
        <div className="contact-info fade-in">
          <div className="contact-item">
            <div className="contact-icon-wrapper">
              <Mail size={24} />
            </div>
            <div>
              <h3>{isAr ? 'الإيميل' : 'Email'}</h3>
              <p>info@nemora.com</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon-wrapper">
              <Phone size={24} />
            </div>
            <div>
              <h3>{isAr ? 'التليفون' : 'Phone'}</h3>
              <p>+20 106 743 1264</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon-wrapper">
              <MapPin size={24} />
            </div>
            <div>
              <h3>{isAr ? 'العنوان' : 'Address'}</h3>
              <p>{isAr ? 'القاهرة، مصر' : 'Cairo, Egypt'}</p>
            </div>
          </div>
        </div>

        <form className="contact-form fade-in" onSubmit={handleSubmit}>
          <h2>{t('sendMessage')}</h2>
          <div className="form-group">
            <label htmlFor="name">{t('name')}</label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('email')}</label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              dir="ltr"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">{t('message')}</label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            <Send size={20} />
            {isSubmitting ? (isAr ? 'جاري التحويل...' : 'Redirecting...') : t('send')}
          </button>
        </form>
      </div>
    </div>
  );
};