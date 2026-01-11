import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom'; // إضافة Link للتنقل
import { useLanguage } from '../contexts/LanguageContext';
import { Heart, Award, Target, Users, Sparkles, ShieldCheck, Zap, Globe2, ArrowRight } from 'lucide-react';

export const About = () => {
  const { language, t, dir } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const fullContent = {
    ar: {
      heroTitle: "نصمم للمستقبل، نحترم الماضي",
      storyTitle: "جوهر Nemora",
      storyText: "في Nemora، نحن لا نتبع الموضة، نحن نصنعها. بدأت رحلتنا كبحث عن الكمال في أبسط الأشياء: التيشيرت. اليوم، تطورت رؤيتنا لنصبح علامة تجارية تمثل التميز الشخصي. نستخدم أجود أنواع القطن طويل التيلة وتقنيات طباعة النانو لضمان أن كل قطعة تقتنيها هي استثمار طويل الأمد في مظهرك.",
      missionTitle: "فلسفتنا",
      missionText: "نؤمن بأن الفخامة لا يجب أن تكون معقدة. مهمتنا هي تقديم قطع ملابس تتحدث عنك قبل أن تتحدث أنت. نحن نجمع بين حرفية اليد المصرية الأصيلة وأحدث ابتكارات التصميم الرقمي لنقدم لك تجربة لا تنسى.",
      visionTitle: "آفاقنا",
      visionText: "نتطلع إلى عالم يرتدي فيه الجميع ملابس تعبر عن هويتهم الحقيقية بكل ثقة. Nemora هي خطوتنا الأولى نحو هذا المستقبل.",
      stats: ["+50k عميل", "100% قطن مصري", "دعم 24/7"]
    },
    eg: {
      heroTitle: "بنعمل لبس يعيش معاك ويحكي عنك",
      storyTitle: "إيه هي Nemora؟",
      storyText: "نمورا مش مجرد محل لبس، إحنا براند هدفه إنه يرجع قيمة 'القطعة المظبوطة'. بدأنا عشان ننهي عصر اللبس اللي بيبوظ من أول غسلة. بنهتم بكل فتلة وبكل تفصيلة في التصميم عشان لما تلبس نمورا تحس إنك لابس حاجة معمولة عشانك إنت مخصوص. جودة عالمية بأيادي مصرية مية في المية.",
      missionTitle: "إحنا هنا ليه؟",
      missionText: "مهمتنا بسيطة: تخليك شيك ومرتاح ومطمن. بنستخدم أحسن خامات في السوق وبنوفر لك تجربة شراء سهلة وأمان. هدفنا إن كل عميل يدخل عيلة نمورا يفضل معانا طول العمر.",
      visionTitle: "حلمنا",
      visionText: "حلمنا إن نمورا تكون في كل دولاب في مصر والمنطقة، ونثبت إن البراند المصري يقدر ينافس ويغلب البراندات العالمية بشطارة وجودة.",
      stats: ["+50 ألف بطل", "قطن 100%", "خدمة عملاء صحبة"]
    },
    en: {
      heroTitle: "Crafting Tomorrow's Legacy Today",
      storyTitle: "The Essence of Nemora",
      storyText: "At Nemora, we don't just follow trends; we set them. Our journey began as a quest for perfection in the most fundamental garment: the T-shirt. Today, we've evolved into a brand that symbolizes personal distinction. Using premium long-staple cotton and nano-printing tech, we ensure every piece is a lifelong investment in your style.",
      missionTitle: "Our Philosophy",
      missionText: "We believe luxury should be effortless. Our mission is to provide apparel that speaks for you before you do. We blend authentic Egyptian craftsmanship with cutting-edge digital innovation to deliver an unforgettable experience.",
      visionTitle: "The Horizon",
      visionText: "We envision a world where everyone wears their identity with absolute confidence. Nemora is our first step toward that future.",
      stats: ["50k+ Members", "100% Egyptian Cotton", "24/7 Elite Support"]
    }
  };

  const c = fullContent[language] || fullContent.en;

  return (
    <div className="about-page" dir={dir}>
      <style>{`
        :root {
          --glass: rgba(255, 255, 255, 0.03);
          --glass-border: rgba(255, 255, 255, 0.1);
        }
        [data-theme='dark'] {
          --glass: rgba(15, 23, 42, 0.6);
          --glass-border: rgba(255, 255, 255, 0.05);
        }

        .about-page { padding-bottom: 100px; }
        
        .hero-v2 {
          height: 80vh; display: flex; flex-direction: column; align-items: center; 
          justify-content: center; text-align: center; position: relative; overflow: hidden;
          background: radial-gradient(circle at center, var(--primary-soft) 0%, transparent 70%);
        }
        .hero-v2 h1 { 
          font-size: clamp(3rem, 10vw, 6rem); 
          font-weight: 950; 
          letter-spacing: -3px; 
          line-height: 1.1; 
          margin-bottom: 30px;
          background: var(--gradient-primary);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .stats-bar {
          display: flex; gap: 50px; margin-top: 50px; padding: 30px 50px;
          background: var(--glass); backdrop-filter: blur(20px);
          border: 2px solid var(--glass-border); border-radius: 100px;
          box-shadow: var(--shadow-lg);
        }
        .stat-item { text-align: center; position: relative; }
        .stat-item:not(:last-child)::after {
          content: ''; position: absolute; right: -25px; top: 50%; transform: translateY(-50%);
          width: 1px; height: 60%; background: var(--border); opacity: 0.3;
        }
        .stat-number {
          font-size: 2.5rem; font-weight: 900; background: var(--gradient-primary);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1; margin-bottom: 8px; display: block;
        }
        .stat-label { font-size: 0.9rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; }

        .content-card {
          max-width: 1100px; margin: -100px auto 0; position: relative; z-index: 10;
          background: var(--bg-card); border-radius: var(--radius-xl); padding: 80px 60px;
          box-shadow: var(--shadow-xl); border: 2px solid var(--border); backdrop-filter: blur(10px);
        }

        .grid-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-top: 60px; }
        
        .modern-list { list-style: none; margin-top: 30px; }
        .modern-list li { 
          display: flex; align-items: flex-start; gap: 20px; margin-bottom: 25px;
          padding: 20px; background: var(--bg-secondary); border-radius: var(--radius-lg);
          border: 1px solid var(--border); transition: var(--transition);
        }
        .modern-list li:hover { background: var(--bg-hover); border-color: var(--primary); transform: translateX(5px); }
        .check-icon { color: var(--primary); background: var(--primary-soft); padding: 10px; border-radius: var(--radius); width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

        .floating-blobs { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
        .blob { position: absolute; filter: blur(80px); opacity: 0.4; border-radius: 50%; background: var(--primary); }

        @media (max-width: 900px) {
          .grid-layout { grid-template-columns: 1fr; gap: 40px; }
          .content-card { margin: -50px 20px 0; padding: 40px 25px; }
          .stats-bar { flex-direction: column; gap: 15px; border-radius: 20px; padding: 20px; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="hero-v2">
        <div className="floating-blobs">
          <motion.div animate={{ x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 10, repeat: Infinity }} className="blob" style={{ width: '300px', height: '300px', top: '10%', left: '10%' }} />
          <motion.div animate={{ x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 12, repeat: Infinity }} className="blob" style={{ width: '400px', height: '400px', bottom: '10%', right: '10%', background: 'var(--accent)' }} />
        </div>

        <motion.h1 style={{ scale }}>{c.heroTitle}</motion.h1>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="stats-bar">
          <div className="stat-item"><span className="stat-number">50K+</span><span className="stat-label">{language === 'en' ? 'Happy Customers' : 'عملاء سعداء'}</span></div>
          <div className="stat-item"><span className="stat-number">98%</span><span className="stat-label">{language === 'en' ? 'Satisfaction Rate' : 'معدل الرضا'}</span></div>
          <div className="stat-item"><span className="stat-number">24/7</span><span className="stat-label">{language === 'en' ? 'Support' : 'دعم فني'}</span></div>
          <div className="stat-item"><span className="stat-number">100%</span><span className="stat-label">{language === 'en' ? 'Egyptian Cotton' : 'قطن مصري'}</span></div>
        </motion.div>
      </section>

      {/* Main Content Card */}
      <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="content-card">
        <div className="grid-layout">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', marginBottom: '20px' }}>
              <Sparkles size={24} />
              <span style={{ fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>Nemora Spirit</span>
            </div>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '25px', lineHeight: 1 }}>{c.storyTitle}</h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.9, marginBottom: '20px' }}>{c.storyText}</p>
            
            <ul className="modern-list">
              <li>
                <div className="check-icon"><ShieldCheck size={20}/></div>
                <div><strong>{language === 'en' ? 'Authentic Materials' : 'خامات أصلية'}</strong><br/><small>{language === 'en' ? '100% premium Egyptian cotton' : 'قطن مصري فاخر 100%'}</small></div>
              </li>
              <li>
                <div className="check-icon"><Zap size={20}/></div>
                <div><strong>{language === 'en' ? 'Eco-friendly Printing' : 'طباعة صديقة للبيئة'}</strong><br/><small>{language === 'en' ? 'Sustainable printing technology' : 'تقنيات طباعة مستدامة'}</small></div>
              </li>
              <li>
                <div className="check-icon"><Globe2 size={20}/></div>
                <div><strong>{language === 'en' ? 'Nationwide Shipping' : 'شحن لجميع المحافظات'}</strong><br/><small>{language === 'en' ? 'Fast delivery across Egypt' : 'توصيل سريع لجميع أنحاء مصر'}</small></div>
              </li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '30px' }}>
            <motion.div whileHover={{ x: 10 }} style={{ padding: '35px', background: 'var(--gradient-soft)', borderRadius: 'var(--radius-xl)', border: '2px solid var(--primary)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px', fontWeight: 800 }}>
                <Target size={24} /> {c.missionTitle}
              </h3>
              <p>{c.missionText}</p>
            </motion.div>

            <motion.div whileHover={{ x: 10 }} style={{ padding: '35px', background: 'var(--bg-card)', borderRadius: 'var(--radius-xl)', border: '2px solid var(--border)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px', fontWeight: 800 }}>
                <Award size={24} /> {c.visionTitle}
              </h3>
              <p>{c.visionText}</p>
            </motion.div>
          </div>
        </div>

        {/* زر الانتقال للمتجر مع أنميشن النبض */}
        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: ["0 0 0 0px rgba(37, 99, 235, 0.4)", "0 0 0 20px rgba(37, 99, 235, 0)"] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5 
              }}
              style={{ 
                padding: '20px 50px', borderRadius: '100px', background: 'var(--primary)', 
                color: 'white', border: 'none', fontSize: '1.2rem', fontWeight: 800, 
                cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '15px'
              }}
            >
              {language === 'en' ? 'Explore Collections' : 'استكشف كولكشن نمورا'}
              <ArrowRight size={24} />
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <section style={{ marginTop: '100px', textAlign: 'center', opacity: 0.5 }}>
        <p style={{ letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Crafted with passion in Egypt</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
          <Heart size={30} /> <Award size={30} /> <Users size={30} />
        </div>
      </section>
    </div>
  );
};