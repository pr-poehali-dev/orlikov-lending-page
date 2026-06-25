import { useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

// Реальные фото объекта
const TIZER_IMG        = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/bucket/5031d015-d9e3-4f90-bdc8-7d75ee0c94db.PNG';
const MEETING_IMG      = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/bucket/5bdab066-7128-4411-9e59-3a48401f2599.PNG';
const OFFICE_IMG       = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/bucket/031c5641-f2fa-4b18-a6f7-ff94706695ed.PNG';
const CORRIDOR_IMG     = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/bucket/af78b587-6fd5-4cb6-9b8b-5b0ee78353cd.PNG';
const FLOOR_PLAN_IMG   = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/bucket/a6354a7d-0b4f-49d4-93c2-20a43e3a4eb2.png';

// Офисы из финмодели — план продаж
const SALES_PLAN = [
  { month: 1, sold: 5,  rest: 31 },
  { month: 2, sold: 7,  rest: 24 },
  { month: 3, sold: 7,  rest: 17 },
  { month: 4, sold: 7,  rest: 10 },
  { month: 5, sold: 10, rest: 0  },
];

const navItems = [
  { id: 'hero',        label: '01', title: 'Проект' },
  { id: 'map',         label: '02', title: 'Локация' },
  { id: 'format',      label: '03', title: 'Офисы' },
  { id: 'gallery',     label: '04', title: 'Объект' },
  { id: 'floor-plan',  label: '04b', title: 'План этажа' },
  { id: 'economy',     label: '05', title: 'Экономика' },
  { id: 'sales-plan',  label: '06', title: 'План продаж' },
  { id: 'realization', label: '07', title: 'Реализация' },
  { id: 'terms',       label: '08', title: 'Условия' },
  { id: 'progress',    label: '09', title: 'Дорожная карта' },
  { id: 'final',       label: '10', title: 'Контакты' },
];

export default function Index() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="bg-background text-foreground overflow-x-hidden">

      {/* Side nav dots */}
      <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3.5">
        {navItems.map((n) => (
          <button key={n.id} onClick={() => scrollTo(n.id)} className="group flex items-center gap-2 justify-end">
            <span className="text-[9px] tracking-widest text-muted-foreground opacity-0 group-hover:opacity-100 transition font-sans uppercase">{n.title}</span>
            <span className="w-2 h-2 rounded-full border border-gold/40 group-hover:bg-gold group-hover:border-gold transition" />
          </button>
        ))}
      </nav>

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="container flex items-center justify-between py-3.5">
          {/* AMI Group Logo text */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gold-gradient flex items-center justify-center text-[10px] font-display font-bold text-black tracking-wider">AMI</div>
            <div className="leading-tight">
              <p className="font-display font-600 tracking-[0.2em] text-sm text-gold">AMI GROUP</p>
              <p className="text-[9px] text-muted-foreground tracking-[0.3em] uppercase">Инвестиции в недвижимость</p>
            </div>
          </div>
          <Button
            onClick={() => scrollTo('terms')}
            className="gold-gradient text-black hover:opacity-90 font-sans tracking-wide text-sm rounded-none px-6"
          >
            Условия входа
          </Button>
        </div>
      </header>

      {/* ════ 01 HERO ════ */}
      <section id="hero" className="relative min-h-screen flex items-center grain overflow-hidden">
        {/* Тизер как фон */}
        <div className="absolute inset-0">
          <img src={TIZER_IMG} alt="Орликов пер. 5" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl animate-fade-up">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-gold/70" />
              <span className="text-gold/80 tracking-[0.35em] text-[10px] font-sans uppercase">Инвестиционный проект · 2026</span>
            </div>

            <p className="text-muted-foreground text-sm tracking-[0.25em] uppercase mb-3 font-sans">
              Инвестируйте в готовый арендный бизнес
            </p>

            <h1 className="font-display font-600 leading-[0.9] text-[clamp(3.5rem,10vw,7rem)] mb-2">
              ОРЛИКОВ<br />
              <span className="gold-text-gradient italic">Пер., 5</span>
            </h1>

            <p className="font-display text-xl text-gold tracking-wide mb-8 mt-4">
              Бизнес-центр класса B · 5 минут от Красных ворот
            </p>

            {/* KPI блок из тизера */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-10">
              {[
                { icon: 'TrendingUp', v: '24,5%', l: 'Доходность инвестора', sub: 'годовых' },
                { icon: 'Wallet',     v: '417,4', l: 'Сумма инвестиций', sub: 'млн ₽' },
                { icon: 'Clock',      v: '5',     l: 'Срок реализации', sub: 'месяцев' },
                { icon: 'PiggyBank',  v: '20,39%',l: 'Прогнозируемый ROI', sub: '' },
              ].map((s) => (
                <div key={s.l} className="bg-black/90 p-5 flex flex-col gap-1">
                  <Icon name={s.icon} size={16} className="text-gold mb-1" />
                  <p className="text-[9px] tracking-widest text-muted-foreground uppercase font-sans">{s.l}</p>
                  <p className="font-display font-600 text-3xl gold-text-gradient leading-none">
                    {s.v}<span className="text-lg font-400 ml-1">{s.sub}</span>
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => scrollTo('economy')}
                size="lg"
                className="gold-gradient text-black hover:opacity-90 font-sans tracking-wide rounded-none group"
              >
                Смотреть экономику
                <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition" />
              </Button>
              <Button
                onClick={() => scrollTo('final')}
                size="lg"
                variant="outline"
                className="border-gold/40 text-gold hover:bg-gold/10 font-sans tracking-wide rounded-none"
              >
                Запросить презентацию
              </Button>
            </div>
          </div>
        </div>

        <button onClick={() => scrollTo('map')} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gold/60 animate-float-slow">
          <Icon name="ChevronDown" size={26} />
        </button>
      </section>

      {/* ════ 02 MAP ════ */}
      <Sec id="map" num="02" title="Расположение" sub="Премиальная локация в центре Москвы">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="reveal space-y-4">
            {[
              { icon: 'Train',    t: 'м. Красные ворота', d: 'Сокольническая линия — 5 минут пешком' },
              { icon: 'MapPin',   t: 'Орликов переулок, 5', d: 'Центральный административный округ, Москва' },
              { icon: 'Landmark', t: 'Деловое окружение', d: 'Три вокзала, Садовое кольцо, офисы класса А/B' },
              { icon: 'TrendingUp', t: 'Дефицит малых офисов', d: 'Устойчивый спрос — ставки аренды растут' },
            ].map((it) => (
              <div key={it.t} className="flex gap-4 p-4 bg-card border border-border hover:border-gold/30 transition">
                <div className="w-10 h-10 shrink-0 gold-gradient flex items-center justify-center">
                  <Icon name={it.icon} size={18} className="text-black" />
                </div>
                <div>
                  <p className="font-display font-600 tracking-wide text-base">{it.t}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 font-sans">{it.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal relative aspect-square border border-border overflow-hidden">
            <iframe
              title="Карта"
              className="w-full h-full"
              style={{ filter: 'invert(0.88) hue-rotate(180deg) saturate(0.6) brightness(0.95)' }}
              src="https://yandex.ru/map-widget/v1/?ll=37.6447%2C55.7694&z=16&pt=37.6447,55.7694,pm2rdm"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 bg-black/90 backdrop-blur border border-gold/40 px-4 py-2">
              <p className="font-display font-600 text-gold tracking-widest text-sm">ОРЛИКОВ ПЕР., 5</p>
              <p className="text-[9px] text-muted-foreground tracking-widest font-sans uppercase">Красные ворота · 5 мин</p>
            </div>
          </div>
        </div>
      </Sec>

      {/* ════ 03 FORMAT ════ */}
      <Sec id="format" num="03" title="Форматы офисов" sub="Нарезка от 9 м² — максимальная ликвидность" dark>
        <div className="grid lg:grid-cols-3 gap-5 mb-8">
          {[
            { size: '9–16 м²',  t: 'Микро',    d: 'ИП, фрилансеры, малые команды. Самый быстрый в продаже.' },
            { size: '17–25 м²', t: 'Стандарт', d: 'Команды 3–6 человек, оптимальное соотношение цены и площади.' },
            { size: '30–37 м²', t: 'Комфорт',  d: 'Представительские офисы, команды до 10 человек.' },
          ].map((c, i) => (
            <div key={c.t} className="reveal p-7 bg-card border border-border hover:border-gold/40 transition group" style={{ transitionDelay: `${i * 80}ms` }}>
              <p className="font-display font-600 text-4xl gold-text-gradient mb-2">{c.size}</p>
              <p className="font-display font-500 text-xl mb-2 group-hover:text-gold transition tracking-wide">{c.t}</p>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">{c.d}</p>
            </div>
          ))}
        </div>

        {/* Общая площадь / офисов */}
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
          {[
            { v: '849 м²',  l: 'Общая площадь' },
            { v: '648,6 м²',l: 'Полезная площадь' },
            { v: '31',      l: 'Офисов к продаже' },
            { v: '23,6%',   l: 'Коэффициент потерь' },
          ].map((s) => (
            <div key={s.l} className="bg-card p-5 text-center">
              <p className="font-display font-600 text-3xl gold-text-gradient">{s.v}</p>
              <p className="text-[10px] tracking-widest text-muted-foreground uppercase mt-1 font-sans">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="reveal grid md:grid-cols-4 gap-3 mt-5">
          {[
            { icon: 'Coffee',   t: 'Дизайнерская кухня' },
            { icon: 'Users',    t: 'Переговорная комната' },
            { icon: 'Wifi',     t: 'IT / СКС / интернет' },
            { icon: 'Shield',   t: 'Охрана и контроль доступа' },
          ].map((it) => (
            <div key={it.t} className="flex items-center gap-3 p-3.5 bg-black border border-border">
              <Icon name={it.icon} size={16} className="text-gold shrink-0" />
              <span className="text-xs font-sans tracking-wide">{it.t}</span>
            </div>
          ))}
        </div>
      </Sec>

      {/* ════ 04 GALLERY — реальные фото ════ */}
      <Sec id="gallery" num="04" title="Объект" sub="Реальные фотографии">
        {/* 3 фото в сетке */}
        <div className="grid md:grid-cols-3 gap-3 mb-3">
          <div className="reveal relative overflow-hidden border border-gold/35 group md:col-span-2">
            <img src={MEETING_IMG} alt="Переговорная комната" className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[9px] tracking-widest text-gold/70 font-sans uppercase">Переговорная</span>
              <p className="font-display text-xl text-white">Конференц-зал</p>
            </div>
            <span className="absolute top-3 right-3 gold-gradient text-[9px] font-sans tracking-widest text-black px-2 py-1 uppercase">Готовый результат</span>
          </div>

          <div className="reveal relative overflow-hidden border border-border group" style={{ transitionDelay: '80ms' }}>
            <img src={OFFICE_IMG} alt="Рабочий офис AMI Group" className="w-full aspect-[4/3] md:h-full object-cover group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase">Офис</span>
              <p className="font-display text-lg text-white">Рабочее пространство</p>
            </div>
          </div>
        </div>

        {/* Коридор — полная ширина */}
        <div className="reveal relative overflow-hidden border border-border group">
          <img src={CORRIDOR_IMG} alt="Коридор" className="w-full max-h-[420px] object-cover group-hover:scale-[1.02] transition duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 max-w-xs">
            <p className="font-display font-600 text-2xl italic text-white mb-1">Дизайнерский коридор</p>
            <p className="font-display font-700 text-3xl gold-text-gradient">Стабильный арендный поток</p>
            <p className="text-xs text-muted-foreground font-sans mt-1">Заполняемость — 100% · 31 офис</p>
          </div>
        </div>
      </Sec>

      {/* ════ 04b FLOOR PLAN ════ */}
      <Sec id="floor-plan" num="04b" title="Поэтажный план" sub="Планировка 4-го этажа · 31 офис">
        <div className="reveal mb-6">
          <div className="border border-gold/30 overflow-hidden bg-white p-2">
            <img
              src={FLOOR_PLAN_IMG}
              alt="Поэтажный план Орликов пер. 5"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="reveal grid md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 p-4 bg-card border border-border">
            <span className="w-4 h-4 shrink-0 mt-0.5 border-2 border-[#22c55e] bg-[#22c55e]/20" />
            <div>
              <p className="font-sans text-xs font-600 text-foreground">Свободные офисы</p>
              <p className="font-sans text-[11px] text-muted-foreground mt-0.5">Доступны к покупке прямо сейчас</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-card border border-border">
            <span className="w-4 h-4 shrink-0 mt-0.5 border-2 border-[#38bdf8] bg-[#38bdf8]/20" />
            <div>
              <p className="font-sans text-xs font-600 text-foreground">Зарезервированные</p>
              <p className="font-sans text-[11px] text-muted-foreground mt-0.5">Находятся на стадии оформления</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-card border border-border">
            <Icon name="MapPin" size={14} className="text-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-sans text-xs font-600 text-foreground">м. Красные ворота — 350 м</p>
              <p className="font-sans text-[11px] text-muted-foreground mt-0.5">Садовое кольцо — 150 м · МЦД 9 мин</p>
            </div>
          </div>
        </div>
      </Sec>

      {/* ════ 05 ECONOMY ════ */}
      <Sec id="economy" num="05" title="Экономика проекта" sub="Финансовый потенциал инвестиций" dark>
        {/* 4 главных KPI */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-6">
          {[
            { v: '417,4 млн', l: 'Сумма инвестиций',   sub: '₽', icon: 'Wallet' },
            { v: '531,4 млн', l: 'Выручка от продаж',  sub: '₽', icon: 'TrendingUp' },
            { v: '~114 млн',  l: 'Валовая прибыль',    sub: '₽', icon: 'PiggyBank' },
            { v: '24,5%',     l: 'Доходность инвестора', sub: 'год', icon: 'BarChart2' },
          ].map((s, i) => (
            <div key={s.l} className="reveal bg-card p-6 relative overflow-hidden" style={{ transitionDelay: `${i * 70}ms` }}>
              <Icon name={s.icon} size={32} className="text-gold/10 absolute top-3 right-3" />
              <p className="text-[9px] tracking-widest text-muted-foreground uppercase font-sans mb-2">{s.l}</p>
              <p className="font-display font-600 text-3xl gold-text-gradient leading-none">
                {s.v}<span className="text-base font-400 ml-1 text-gold">{s.sub}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="reveal grid lg:grid-cols-3 gap-5">
          {/* Структура */}
          <div className="lg:col-span-2 p-7 bg-card border border-border">
            <p className="font-display font-500 text-xl tracking-wide mb-6">Структура финансирования</p>
            {[
              { l: 'Покупка объекта',           pct: 75, val: '~313 млн ₽' },
              { l: 'CAPEX (ремонт, отделка)',    pct: 25, val: '~104 млн ₽' },
              { l: 'Выручка от продажи офисов',  pct: 100, val: '531,4 млн ₽', gold: true },
            ].map((b) => (
              <div key={b.l} className="mb-5 last:mb-0">
                <div className="flex justify-between text-xs mb-1.5 font-sans">
                  <span className="text-muted-foreground">{b.l}</span>
                  <span className={b.gold ? 'text-gold font-600' : ''}>{b.val}</span>
                </div>
                <div className="h-1.5 bg-muted overflow-hidden">
                  <div
                    className={b.gold ? 'h-full gold-gradient' : 'h-full bg-foreground/25'}
                    style={{ width: `${b.pct}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="mt-6 p-4 border border-gold/20 bg-gold/5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase">ROI проекта</p>
                  <p className="font-display font-600 text-2xl gold-text-gradient">20,39%</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase">Освоение</p>
                  <p className="font-display font-600 text-2xl text-foreground">60% / 40%</p>
                  <p className="text-[9px] text-muted-foreground font-sans">по траншам</p>
                </div>
              </div>
            </div>
          </div>

          {/* Итог */}
          <div className="p-7 bg-black border border-gold/35 flex flex-col justify-center">
            <p className="text-[9px] tracking-widest text-muted-foreground uppercase font-sans mb-3">Расчётная прибыль</p>
            <p className="font-display font-600 text-5xl gold-text-gradient leading-none mb-1">~114</p>
            <p className="font-display text-2xl text-gold">млн ₽</p>
            <div className="mt-5 h-px bg-border" />
            <div className="mt-5 space-y-3">
              {[
                { l: 'Срок проекта', v: '5 мес.' },
                { l: 'Ставка аренды', v: '82 469 ₽/м²' },
                { l: 'Заполняемость', v: '100%' },
              ].map((r) => (
                <div key={r.l} className="flex justify-between text-xs font-sans">
                  <span className="text-muted-foreground">{r.l}</span>
                  <span className="text-gold">{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sec>

      {/* ════ 06 SALES PLAN ════ */}
      <Sec id="sales-plan" num="06" title="План продаж" sub="Реализация 31 офиса за 5 месяцев">
        <div className="reveal mb-8">
          {/* Визуальный прогресс продаж */}
          <div className="grid grid-cols-5 gap-2 mb-6">
            {SALES_PLAN.map((m) => {
              const soldPct = (m.sold / 31) * 100;
              return (
                <div key={m.month} className="text-center">
                  <div className="relative h-28 bg-card border border-border flex flex-col justify-end overflow-hidden mb-2">
                    <div
                      className="gold-gradient w-full"
                      style={{ height: `${soldPct * 2.8}%`, minHeight: '4px' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display font-600 text-2xl gold-text-gradient">{m.sold}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-sans tracking-wide">Мес. {m.month}</p>
                  <p className="text-[10px] text-muted-foreground font-sans">Остаток: {m.rest}</p>
                </div>
              );
            })}
          </div>

          {/* Таблица */}
          <div className="border border-border overflow-hidden">
            <div className="grid grid-cols-4 bg-card border-b border-border">
              {['Месяц', 'Продано офисов', 'Остаток', 'Выручка (млн ₽)'].map((h) => (
                <div key={h} className="p-3.5 text-[9px] tracking-widest text-muted-foreground font-sans uppercase border-r border-border last:border-r-0">{h}</div>
              ))}
            </div>
            {SALES_PLAN.map((m, i) => {
              const avgPrice = 531.4 / 31;
              const revenue = (m.sold * avgPrice).toFixed(1);
              return (
                <div key={m.month} className={`grid grid-cols-4 border-b border-border last:border-b-0 ${i % 2 ? 'bg-card/50' : ''}`}>
                  <div className="p-3.5 font-display text-lg gold-text-gradient border-r border-border">{m.month}</div>
                  <div className="p-3.5 font-display text-lg border-r border-border">{m.sold}</div>
                  <div className="p-3.5 text-sm font-sans text-muted-foreground border-r border-border">{m.rest}</div>
                  <div className="p-3.5 text-sm font-sans text-gold">{revenue}</div>
                </div>
              );
            })}
            <div className="grid grid-cols-4 bg-black border-t border-gold/30">
              <div className="p-3.5 font-display text-sm text-gold tracking-wide">ИТОГО</div>
              <div className="p-3.5 font-display text-lg gold-text-gradient border-l border-border">31</div>
              <div className="p-3.5 text-sm font-sans text-muted-foreground border-l border-border">0</div>
              <div className="p-3.5 text-sm font-sans text-gold border-l border-border">531,4</div>
            </div>
          </div>
        </div>

        {/* Цены из финмодели */}
        <div className="reveal grid md:grid-cols-2 gap-4">
          <div className="p-6 bg-card border border-border">
            <p className="font-display font-500 text-lg tracking-wide mb-4">Диапазон цен офисов</p>
            <div className="space-y-2 text-xs font-sans text-muted-foreground">
              <div className="flex justify-between py-2 border-b border-border/50">
                <span>Минимальная цена за м²</span>
                <span className="text-foreground font-600">810 000 ₽</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span>Средняя цена за м²</span>
                <span className="text-gold font-600">~820 000 ₽</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Максимальная цена за м²</span>
                <span className="text-foreground font-600">850 000 ₽</span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-card border border-border">
            <p className="font-display font-500 text-lg tracking-wide mb-4">Диапазон стоимости офисов</p>
            <div className="space-y-2 text-xs font-sans text-muted-foreground">
              <div className="flex justify-between py-2 border-b border-border/50">
                <span>Минимальная стоимость офиса</span>
                <span className="text-foreground font-600">6,5 млн ₽</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border/50">
                <span>Средняя стоимость офиса</span>
                <span className="text-gold font-600">~17,1 млн ₽</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Максимальная стоимость офиса</span>
                <span className="text-foreground font-600">30,2 млн ₽</span>
              </div>
            </div>
          </div>
        </div>
      </Sec>

      {/* ════ 07 REALIZATION ════ */}
      <Sec id="realization" num="07" title="Реализация" sub="Три шага от покупки до продажи" dark>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { n: '01', icon: 'Search',     t: 'Покупка',       d: 'Приобретение здания, юридическая проверка DD, подготовка документов к сделке.' },
            { n: '02', icon: 'Hammer',     t: 'Реконцепция',   d: 'Нарезка офисов, продающий ремонт, дизайнерские входные зоны и кухня.' },
            { n: '03', icon: 'HandCoins',  t: 'Продажа',       d: 'Маркетинг, реализация 31 офиса, передача помещений покупателям.' },
          ].map((s, i) => (
            <div key={s.n} className="reveal p-7 bg-card border border-border relative" style={{ transitionDelay: `${i * 90}ms` }}>
              <span className="font-display font-700 text-[5rem] text-gold/8 absolute top-2 right-4 leading-none">{s.n}</span>
              <div className="w-11 h-11 gold-gradient flex items-center justify-center mb-5">
                <Icon name={s.icon} size={20} className="text-black" />
              </div>
              <p className="font-display font-600 text-2xl tracking-wide mb-2">{s.t}</p>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">{s.d}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* ════ 08 TERMS ════ */}
      <Sec id="terms" num="08" title="Условия входа" sub="Прозрачные условия для инвестора">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="reveal p-8 bg-card border border-gold/35">
            <p className="text-[9px] tracking-widest text-muted-foreground uppercase font-sans mb-2">Минимальный порог входа</p>
            <p className="font-display font-600 text-5xl gold-text-gradient mb-6">от 5 млн ₽</p>
            <div className="space-y-4 mb-6">
              {[
                'Доля в проекте пропорционально вложениям',
                'Юридическое сопровождение AMI Group',
                'Прозрачная финансовая отчётность',
                'Фиксация условий в инвестиционном договоре',
                'Залог — актив в собственности',
                'Полный пакет документов',
              ].map((t) => (
                <div key={t} className="flex items-start gap-3">
                  <Icon name="Check" size={14} className="text-gold shrink-0 mt-0.5" />
                  <span className="text-xs font-sans">{t}</span>
                </div>
              ))}
            </div>
            <Button
              onClick={() => scrollTo('final')}
              className="w-full gold-gradient text-black hover:opacity-90 font-sans tracking-wide rounded-none"
            >
              Получить полный пакет документов
            </Button>
          </div>

          <div className="reveal grid grid-cols-2 gap-3 content-start">
            {[
              { v: '24,5%', l: 'Доходность инвестора', sub: 'годовых' },
              { v: '20,39%', l: 'Прогнозируемый ROI', sub: '' },
              { v: '5 мес.', l: 'Срок проекта', sub: '' },
              { v: '60/40', l: 'Транши освоения', sub: '' },
              { v: '417,4', l: 'Инвестиций', sub: 'млн ₽' },
              { v: '531,4', l: 'Выручка', sub: 'млн ₽' },
            ].map((s) => (
              <div key={s.l} className="p-5 bg-black border border-border text-center">
                <p className="font-display font-600 text-2xl gold-text-gradient leading-none">
                  {s.v}
                  {s.sub && <span className="text-sm font-400 ml-1 text-gold/70">{s.sub}</span>}
                </p>
                <p className="text-[9px] tracking-widest text-muted-foreground uppercase mt-1.5 font-sans">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </Sec>

      {/* ════ 09 PROGRESS ════ */}
      <Sec id="progress" num="09" title="Дорожная карта" sub="Динамика проекта по месяцам" dark>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          {[
            { q: 'Мес. 1',   t: 'Получение инвестиций, DD, покупка объекта',       s: 'done'   },
            { q: 'Мес. 2–3', t: 'Проектирование, согласования, разрешительная документация', s: 'active' },
            { q: 'Мес. 3–5', t: 'Ремонт, отделка, меблировка, брендирование',      s: 'next'   },
            { q: 'Мес. 1–5', t: 'Маркетинг и продажа 31 офиса (5–10 в месяц)',     s: 'next'   },
          ].map((it, i) => (
            <div key={it.q} className={`reveal relative flex md:items-center mb-7 last:mb-0 ${i % 2 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:w-1/2 pl-10 md:pl-0 md:px-8">
                <div className={`p-5 bg-card border ${it.s === 'active' ? 'border-gold/50' : 'border-border'}`}>
                  <p className="font-display font-600 text-gold tracking-widest text-sm mb-1">{it.q}</p>
                  <p className="font-display text-lg">{it.t}</p>
                </div>
              </div>
              <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-3.5 h-3.5 border-2 ${it.s === 'next' ? 'bg-muted border-border' : 'gold-gradient border-gold'}`} />
            </div>
          ))}
        </div>
      </Sec>

      {/* ════ 10 FINAL / CTA ════ */}
      <section id="final" className="relative grain overflow-hidden bg-[#060606]">
        {/* Тонкая золотая полоска сверху */}
        <div className="h-px w-full gold-gradient opacity-60" />
        <div className="container relative z-10 py-24 text-center">
          <div className="reveal max-w-2xl mx-auto">
            <span className="text-[9px] tracking-[0.35em] text-gold/70 font-sans uppercase">AMI Group · Орликов пер., 5</span>
            <h2 className="font-display font-600 text-[clamp(2.5rem,6vw,4.5rem)] mt-5 mb-4 leading-[1.05] italic">
              Инвестируйте<br />
              <span className="gold-text-gradient">в готовый арендный бизнес</span>
            </h2>
            <p className="text-muted-foreground mb-10 font-sans text-sm max-w-lg mx-auto leading-relaxed">
              Бизнес-центр класса B в 5 минутах от м. Красные ворота. 
              24,5% годовых, ROI 20,39%, срок реализации — 5 месяцев.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="gold-gradient text-black hover:opacity-90 font-sans tracking-wide rounded-none">
                <Icon name="FileText" size={16} className="mr-2" />
                Запросить презентацию
              </Button>
              <Button size="lg" variant="outline" className="border-gold/40 text-gold hover:bg-gold/10 font-sans tracking-wide rounded-none">
                <Icon name="Phone" size={16} className="mr-2" />
                Связаться с AMI Group
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-border">
          <div className="container py-5 grid md:grid-cols-3 gap-4 text-[10px] text-muted-foreground tracking-wider font-sans">
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={12} className="text-gold" />
              <span>Орликов пер., 5 · м. Красные Ворота — 5 мин.</span>
            </div>
            <div className="flex items-center gap-2 md:justify-center">
              <Icon name="FileCheck" size={12} className="text-gold" />
              <span>Полный пакет документов · Юр. сопровождение</span>
            </div>
            <div className="flex items-center gap-2 md:justify-end">
              <Icon name="BarChart2" size={12} className="text-gold" />
              <span>AMI Group — эксперты в инвестициях в недвижимость</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function Sec({
  id, num, title, sub, dark, children,
}: {
  id: string; num: string; title: string; sub: string; dark?: boolean; children: React.ReactNode;
}) {
  return (
    <section id={id} className={`py-20 ${dark ? 'bg-black' : 'bg-background'}`}>
      <div className="container">
        <div className="reveal mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-display text-gold/30 text-lg font-600">{num}</span>
            <span className="h-px w-8 bg-gold/60" />
            <span className="text-gold/70 tracking-[0.3em] text-[9px] font-sans uppercase">{sub}</span>
          </div>
          <h2 className="font-display font-600 text-[clamp(2rem,4vw,3.5rem)] leading-tight">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}