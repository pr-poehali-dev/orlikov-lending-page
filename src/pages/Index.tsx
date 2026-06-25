import { useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const HERO_IMG = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/files/357df6d4-1e53-4779-88f1-51d65869a89e.jpg';
const OFFICE_IMG = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/files/f6c0343b-c3af-43f7-aadb-372663becf84.jpg';
const DETAIL_IMG = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/files/da3776f5-b661-4c2e-8cf1-9c16a69791a8.jpg';

const nav = [
  { id: 'hero', label: '01' },
  { id: 'map', label: '02' },
  { id: 'format', label: '03' },
  { id: 'before', label: '04' },
  { id: 'details', label: '05' },
  { id: 'economy', label: '06' },
  { id: 'realization', label: '07' },
  { id: 'terms', label: '08' },
  { id: 'progress', label: '09' },
  { id: 'final', label: '10' },
];

const Index = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      {/* Side nav */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {nav.map((n) => (
          <button
            key={n.id}
            onClick={() => scrollTo(n.id)}
            className="group flex items-center gap-2 justify-end"
          >
            <span className="text-[10px] tracking-widest text-muted-foreground opacity-0 group-hover:opacity-100 transition font-display">
              {n.label}
            </span>
            <span className="w-2.5 h-2.5 rounded-full border border-gold/50 group-hover:bg-gold transition" />
          </button>
        ))}
      </nav>

      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-navy-deep/70 border-b border-border">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 gold-gradient rounded-sm flex items-center justify-center">
              <Icon name="Building2" size={20} className="text-navy-deep" />
            </div>
            <div className="leading-tight">
              <p className="font-display font-600 tracking-wider text-sm">ОРЛИКОВ ПЕРЕУЛОК</p>
              <p className="text-[10px] text-muted-foreground tracking-widest">КРАСНЫЕ ВОРОТА</p>
            </div>
          </div>
          <Button
            onClick={() => scrollTo('terms')}
            className="gold-gradient text-navy-deep hover:opacity-90 font-display tracking-wide font-600 rounded-sm"
          >
            Условия входа
          </Button>
        </div>
      </header>

      {/* 01 — HERO */}
      <section id="hero" className="relative min-h-screen flex items-center grain">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Орликов переулок" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-transparent to-navy-deep/40" />
        </div>
        <div className="container relative z-10 pt-20">
          <div className="max-w-3xl animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-gold" />
              <span className="text-gold tracking-[0.3em] text-xs font-display">ИНВЕСТИЦИОННЫЙ ПРОЕКТ · 2026</span>
            </div>
            <h1 className="font-display font-700 leading-[0.95] text-5xl md:text-7xl lg:text-8xl mb-6">
              ОРЛИКОВ<br />
              <span className="gold-text-gradient">ПЕРЕУЛОК</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Редевелопмент офисных площадей в шаге от станции «Красные ворота». 
              Покупка, реконцепция и продажа мини-офисов с высокой доходностью.
            </p>
            <div className="flex flex-wrap gap-10 mb-12">
              {[
                { v: 'от 13 м²', l: 'нарезка офисов' },
                { v: '1 мин', l: 'до метро' },
                { v: 'ЦАО', l: 'Москва' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display font-700 text-3xl md:text-4xl gold-text-gradient">{s.v}</p>
                  <p className="text-xs tracking-widest text-muted-foreground uppercase mt-1">{s.l}</p>
                </div>
              ))}
            </div>
            <Button
              onClick={() => scrollTo('economy')}
              size="lg"
              className="gold-gradient text-navy-deep hover:opacity-90 font-display tracking-wide font-600 rounded-sm group"
            >
              Смотреть экономику проекта
              <Icon name="ArrowRight" size={18} className="ml-2 group-hover:translate-x-1 transition" />
            </Button>
          </div>
        </div>
        <button onClick={() => scrollTo('map')} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground animate-float-slow">
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* 02 — MAP */}
      <Section id="map" num="02" title="Расположение" sub="Премиальная локация в центре Москвы">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="reveal">
            <div className="space-y-6">
              {[
                { icon: 'Train', t: 'Красные ворота', d: 'Сокольническая линия — 1 минута пешком' },
                { icon: 'MapPin', t: 'Орликов переулок', d: 'Центральный административный округ, Москва' },
                { icon: 'Landmark', t: 'Деловое окружение', d: 'Три вокзала, Садовое кольцо, бизнес-центры класса А' },
                { icon: 'TrendingUp', t: 'Растущий спрос', d: 'Дефицит качественных малых офисов в локации' },
              ].map((it) => (
                <div key={it.t} className="flex gap-4 p-5 bg-card border border-border rounded-sm hover:border-gold/40 transition">
                  <div className="w-11 h-11 shrink-0 gold-gradient rounded-sm flex items-center justify-center">
                    <Icon name={it.icon} size={20} className="text-navy-deep" />
                  </div>
                  <div>
                    <p className="font-display font-600 tracking-wide">{it.t}</p>
                    <p className="text-sm text-muted-foreground mt-1">{it.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal relative">
            <div className="aspect-square rounded-sm overflow-hidden border border-border grain relative">
              <iframe
                title="Карта"
                className="w-full h-full grayscale contrast-125"
                style={{ filter: 'invert(0.9) hue-rotate(180deg) grayscale(0.4)' }}
                src="https://yandex.ru/map-widget/v1/?ll=37.645%2C55.769&z=16&pt=37.645,55.769,pm2rdm"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-navy-deep/90 backdrop-blur border border-gold/40 px-4 py-2 rounded-sm">
                <p className="font-display font-600 text-gold tracking-wide text-sm">ОРЛИКОВ ПЕР.</p>
                <p className="text-[10px] text-muted-foreground tracking-widest">КРАСНЫЕ ВОРОТА</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 — FORMAT */}
      <Section id="format" num="03" title="Формат офисов" sub="Правильная нарезка — основа доходности" dark>
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {[
            { size: '13–20 м²', t: 'Компактные', d: 'Для стартапов, ИП и небольших команд. Самый востребованный формат.' },
            { size: '20–35 м²', t: 'Стандарт', d: 'Оптимальный баланс площади и цены для растущего бизнеса.' },
            { size: '35–45 м²', t: 'Премиум', d: 'Просторные офисы для команд и представительств компаний.' },
          ].map((c, i) => (
            <div key={c.t} className="reveal p-8 bg-card border border-border rounded-sm hover:border-gold/50 transition group" style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="font-display font-700 text-4xl gold-text-gradient mb-3">{c.size}</p>
              <p className="font-display font-600 tracking-wide text-lg mb-2 group-hover:text-gold transition">{c.t}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="reveal grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: 'Coffee', t: 'Кухня' },
            { icon: 'Users', t: 'Переговорная' },
            { icon: 'DoorOpen', t: 'Входные зоны' },
            { icon: 'Bath', t: 'Раздельные санузлы' },
          ].map((it) => (
            <div key={it.t} className="flex items-center gap-3 p-4 bg-navy-deep border border-border rounded-sm">
              <Icon name={it.icon} size={20} className="text-gold" />
              <span className="text-sm font-display tracking-wide">{it.t}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 04 — BEFORE / AFTER */}
      <Section id="before" num="04" title="Было · Стало" sub="Реконцепция меняет ценность площади">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="reveal relative rounded-sm overflow-hidden border border-border grayscale">
            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
              <div className="text-center">
                <Icon name="Construction" size={48} className="text-muted-foreground mx-auto mb-3" />
                <p className="font-display tracking-widest text-muted-foreground">БЫЛО</p>
                <p className="text-xs text-muted-foreground mt-1">Устаревшие площади без отделки</p>
              </div>
            </div>
            <span className="absolute top-4 left-4 bg-navy-deep/90 px-3 py-1 rounded-sm text-xs font-display tracking-widest text-muted-foreground">БЫЛО</span>
          </div>
          <div className="reveal relative rounded-sm overflow-hidden border border-gold/40">
            <img src={OFFICE_IMG} alt="Стало" className="w-full aspect-[4/3] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
            <span className="absolute top-4 left-4 gold-gradient px-3 py-1 rounded-sm text-xs font-display font-600 tracking-widest text-navy-deep">СТАЛО</span>
          </div>
        </div>
        <p className="reveal text-center text-muted-foreground mt-8 max-w-2xl mx-auto">
          Продающий ремонт, дизайнерские входные зоны и удобная планировка увеличивают 
          стоимость квадратного метра и скорость реализации.
        </p>
      </Section>

      {/* 05 — DETAILS */}
      <Section id="details" num="05" title="Детали, которые вдохновляют" sub="Атмосфера, за которую платят" dark>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="reveal rounded-sm overflow-hidden border border-border grain relative">
            <img src={DETAIL_IMG} alt="Детали интерьера" className="w-full h-full object-cover" />
          </div>
          <div className="reveal space-y-5">
            {[
              { icon: 'Sparkles', t: 'Дизайнерская отделка', d: 'Натуральные материалы, латунь, дерево и продуманный свет' },
              { icon: 'Leaf', t: 'Озеленение и декор', d: 'Живые растения и арт-объекты создают премиальную атмосферу' },
              { icon: 'Sofa', t: 'Зоны отдыха', d: 'Лаунж-пространства и уютные общие зоны для резидентов' },
              { icon: 'Lightbulb', t: 'Сценарный свет', d: 'Архитектурная подсветка подчёркивает достоинства интерьера' },
            ].map((it) => (
              <div key={it.t} className="flex gap-4">
                <div className="w-10 h-10 shrink-0 border border-gold/40 rounded-sm flex items-center justify-center">
                  <Icon name={it.icon} size={18} className="text-gold" />
                </div>
                <div>
                  <p className="font-display font-600 tracking-wide">{it.t}</p>
                  <p className="text-sm text-muted-foreground mt-1">{it.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 06 — ECONOMY */}
      <Section id="economy" num="06" title="Экономика проекта" sub="Финансовый потенциал инвестиций">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { v: '120 млн ₽', l: 'Объём инвестиций', icon: 'Wallet' },
            { v: '+45%', l: 'Прирост стоимости', icon: 'TrendingUp' },
            { v: '32%', l: 'Целевая доходность', icon: 'PiggyBank' },
            { v: '14 мес', l: 'Срок проекта', icon: 'Clock' },
          ].map((s, i) => (
            <div key={s.l} className="reveal p-7 bg-card border border-border rounded-sm relative overflow-hidden group" style={{ transitionDelay: `${i * 70}ms` }}>
              <Icon name={s.icon} size={28} className="text-gold/30 absolute top-4 right-4 group-hover:text-gold/60 transition" />
              <p className="font-display font-700 text-4xl gold-text-gradient">{s.v}</p>
              <p className="text-xs tracking-widest text-muted-foreground uppercase mt-2">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="reveal grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-8 bg-card border border-border rounded-sm">
            <p className="font-display font-600 tracking-wide text-lg mb-6">Структура доходности</p>
            {[
              { l: 'Покупка площадей', v: 70, val: '70 %' },
              { l: 'Реконцепция и ремонт', v: 18, val: '18 %' },
              { l: 'Маржа проекта', v: 32, val: '+32 %', gold: true },
            ].map((b) => (
              <div key={b.l} className="mb-5 last:mb-0">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{b.l}</span>
                  <span className={`font-display font-600 ${b.gold ? 'text-gold' : ''}`}>{b.val}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${b.gold ? 'gold-gradient' : 'bg-secondary-foreground/40'}`} style={{ width: `${b.v}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="p-8 bg-navy-deep border border-gold/40 rounded-sm flex flex-col justify-center text-center">
            <p className="text-xs tracking-widest text-muted-foreground uppercase mb-2">Расчётная прибыль</p>
            <p className="font-display font-700 text-5xl gold-text-gradient mb-2">~38 млн ₽</p>
            <p className="text-sm text-muted-foreground">на горизонте проекта</p>
          </div>
        </div>
      </Section>

      {/* 07 — REALIZATION */}
      <Section id="realization" num="07" title="Реализация проекта" sub="От покупки до продажи мини-офисов" dark>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: '01', icon: 'Search', t: 'Покупка', d: 'Приобретение площади — от одного этажа до всего здания' },
            { n: '02', icon: 'Hammer', t: 'Реконцепция', d: 'Нарезка офисов, продающий ремонт, входные зоны' },
            { n: '03', icon: 'HandCoins', t: 'Продажа', d: 'Реализация готовых мини-офисов с маржой' },
          ].map((s, i) => (
            <div key={s.n} className="reveal p-8 bg-card border border-border rounded-sm relative" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="font-display font-700 text-6xl text-gold/15 absolute top-4 right-6">{s.n}</span>
              <div className="w-12 h-12 gold-gradient rounded-sm flex items-center justify-center mb-5">
                <Icon name={s.icon} size={22} className="text-navy-deep" />
              </div>
              <p className="font-display font-600 tracking-wide text-xl mb-2">{s.t}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 08 — TERMS */}
      <Section id="terms" num="08" title="Условия входа" sub="Прозрачные правила для инвестора">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="reveal p-8 bg-card border border-gold/40 rounded-sm">
            <p className="text-xs tracking-widest text-muted-foreground uppercase mb-2">Минимальный вход</p>
            <p className="font-display font-700 text-5xl gold-text-gradient mb-6">от 5 млн ₽</p>
            <div className="space-y-4">
              {[
                'Доля в проекте пропорционально вложениям',
                'Прозрачная отчётность на каждом этапе',
                'Юридическое сопровождение сделки',
                'Фиксация условий в инвестиционном договоре',
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <Icon name="Check" size={18} className="text-gold shrink-0 mt-0.5" />
                  <span className="text-sm">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal grid grid-cols-2 gap-4 content-start">
            {[
              { v: '32%', l: 'Доходность' },
              { v: '14 мес', l: 'Срок' },
              { v: '100%', l: 'Залог — актив' },
              { v: 'ЦАО', l: 'Локация' },
            ].map((s) => (
              <div key={s.l} className="p-7 bg-navy-deep border border-border rounded-sm text-center">
                <p className="font-display font-700 text-3xl gold-text-gradient">{s.v}</p>
                <p className="text-xs tracking-widest text-muted-foreground uppercase mt-2">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 09 — PROGRESS */}
      <Section id="progress" num="09" title="Ход реализации" sub="Дорожная карта проекта" dark>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          {[
            { q: 'Q1 2026', t: 'Подбор и покупка объекта', s: 'done' },
            { q: 'Q2 2026', t: 'Проектирование и согласования', s: 'active' },
            { q: 'Q3 2026', t: 'Реконцепция и ремонт', s: 'next' },
            { q: 'Q1 2027', t: 'Продажа мини-офисов', s: 'next' },
          ].map((it, i) => (
            <div key={it.q} className={`reveal relative flex md:items-center mb-8 last:mb-0 ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 pl-12 md:pl-0 md:px-10">
                <div className={`p-6 bg-card border rounded-sm ${it.s === 'active' ? 'border-gold/50' : 'border-border'}`}>
                  <p className="font-display font-600 text-gold tracking-widest text-sm mb-1">{it.q}</p>
                  <p className="font-display tracking-wide">{it.t}</p>
                </div>
              </div>
              <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 ${it.s === 'next' ? 'bg-muted border-border' : 'gold-gradient border-gold'}`} />
            </div>
          ))}
        </div>
      </Section>

      {/* 10 — FINAL */}
      <section id="final" className="relative grain">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-deep/90" />
        </div>
        <div className="container relative z-10 py-28 text-center">
          <div className="reveal max-w-2xl mx-auto">
            <span className="text-gold tracking-[0.3em] text-xs font-display">ОРЛИКОВ ПЕРЕУЛОК · КРАСНЫЕ ВОРОТА</span>
            <h2 className="font-display font-700 text-4xl md:text-6xl mt-6 mb-6 leading-tight">
              Инвестируйте в проект<br /><span className="gold-text-gradient">с понятной доходностью</span>
            </h2>
            <p className="text-muted-foreground mb-10 text-lg">
              Получите полную презентацию, финансовую модель и условия участия.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gold-gradient text-navy-deep hover:opacity-90 font-display tracking-wide font-600 rounded-sm">
                <Icon name="FileText" size={18} className="mr-2" />
                Запросить презентацию
              </Button>
              <Button size="lg" variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 font-display tracking-wide rounded-sm">
                <Icon name="Phone" size={18} className="mr-2" />
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
        <footer className="relative z-10 border-t border-border">
          <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground tracking-wider">
            <span className="font-display">ОРЛИКОВ ПЕРЕУЛОК © 2026</span>
            <span>Инвестиционный проект · Москва, ЦАО</span>
          </div>
        </footer>
      </section>
    </div>
  );
};

const Section = ({
  id, num, title, sub, dark, children,
}: {
  id: string; num: string; title: string; sub: string; dark?: boolean; children: React.ReactNode;
}) => (
  <section id={id} className={`py-24 ${dark ? 'bg-navy-deep' : 'bg-background'}`}>
    <div className="container">
      <div className="reveal mb-14">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-display font-700 text-gold/40 text-xl">{num}</span>
          <span className="h-px w-12 bg-gold" />
          <span className="text-gold tracking-[0.25em] text-xs font-display uppercase">{sub}</span>
        </div>
        <h2 className="font-display font-700 text-4xl md:text-5xl">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

export default Index;
