import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const TIZER_IMG    = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/bucket/d071a83d-77e9-4fd1-a637-28f45f6992e9.PNG';
const MEETING_IMG  = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/bucket/5bdab066-7128-4411-9e59-3a48401f2599.PNG';
const OFFICE_IMG   = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/bucket/031c5641-f2fa-4b18-a6f7-ff94706695ed.PNG';
const CORRIDOR_IMG = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/bucket/af78b587-6fd5-4cb6-9b8b-5b0ee78353cd.PNG';
const FLOOR_PLAN_IMG = 'https://cdn.poehali.dev/projects/c4931b79-a403-4476-b080-f3cb432215a4/bucket/a519303d-01cf-4adc-9539-228acebc69f9.png';

// Офисы для выбора (дисконт 15%)
const OFFICES = [
  { id: '401', area: 10,   price: 8_500_000,  discountPrice: 7_225_000  },
  { id: '402', area: 9.7,  price: 8_245_000,  discountPrice: 7_008_250  },
  { id: '403', area: 18.4, price: 15_640_000, discountPrice: 13_294_000 },
  { id: '404', area: 19.2, price: 16_320_000, discountPrice: 13_872_000 },
  { id: '405', area: 19.5, price: 16_575_000, discountPrice: 14_088_750 },
  { id: '406', area: 19.6, price: 16_660_000, discountPrice: 14_161_000 },
  { id: '407', area: 19.6, price: 16_660_000, discountPrice: 14_161_000 },
  { id: '408', area: 20.5, price: 17_425_000, discountPrice: 14_811_250 },
  { id: '409', area: 20.8, price: 17_680_000, discountPrice: 15_028_000 },
  { id: '410', area: 20.1, price: 17_085_000, discountPrice: 14_522_250 },
  { id: '411', area: 9.6,  price: 8_160_000,  discountPrice: 6_936_000  },
  { id: '412', area: 10.7, price: 9_095_000,  discountPrice: 7_730_750  },
  { id: '413', area: 21.2, price: 18_020_000, discountPrice: 15_317_000 },
  { id: '414', area: 7.7,  price: 6_545_000,  discountPrice: 5_563_250  },
  { id: '415', area: 17,   price: 14_450_000, discountPrice: 12_282_500 },
  { id: '416', area: 17.1, price: 14_535_000, discountPrice: 12_354_750 },
  { id: '417', area: 18,   price: 15_300_000, discountPrice: 13_005_000 },
  { id: '418', area: 18.2, price: 15_470_000, discountPrice: 13_149_500 },
  { id: '420', area: 19.4, price: 16_490_000, discountPrice: 14_016_500 },
  { id: '421', area: 17.5, price: 14_875_000, discountPrice: 12_643_750 },
  { id: '422', area: 37.3, price: 31_705_000, discountPrice: 26_949_250 },
  { id: '423', area: 25.4, price: 21_590_000, discountPrice: 18_351_500 },
  { id: '424', area: 23.1, price: 19_635_000, discountPrice: 16_689_750 },
  { id: '425', area: 36.9, price: 31_365_000, discountPrice: 26_660_250 },
  { id: '426', area: 36.9, price: 31_365_000, discountPrice: 26_660_250 },
  { id: '427', area: 37.2, price: 31_620_000, discountPrice: 26_877_000 },
  { id: '428', area: 37,   price: 31_450_000, discountPrice: 26_732_500 },
  { id: '429', area: 36.8, price: 31_280_000, discountPrice: 26_588_000 },
  { id: '430', area: 19.2, price: 16_320_000, discountPrice: 13_872_000 },
  { id: '431', area: 18.5, price: 15_725_000, discountPrice: 13_366_250 },
];

const fmt = (n: number) =>
  n >= 1_000_000
    ? `${(n / 1_000_000).toFixed(2)} млн ₽`
    : `${n.toLocaleString('ru-RU')} ₽`;

const navItems = [
  { id: 'hero',    title: 'Главная' },
  { id: 'models',  title: 'Модели' },
  { id: 'pool',    title: 'Пул' },
  { id: 'office',  title: 'Офис' },
  { id: 'object',  title: 'Объект' },
  { id: 'contact', title: 'Заявка' },
];

export default function Collective() {
  const [poolAmount, setPoolAmount] = useState(1_000_000);
  const [selectedOffice, setSelectedOffice] = useState(OFFICES[0]);
  const [form, setForm] = useState({ name: '', phone: '', model: 'pool', comment: '' });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  const printPDF = () => window.print();

  // Пул — расчёты
  const POOL_TOTAL  = 417_400_000;
  const POOL_PROFIT = 114_000_000;
  const poolShare   = poolAmount / POOL_TOTAL;
  const poolIncome  = Math.round(poolShare * POOL_PROFIT);
  const poolRoi     = ((poolIncome / poolAmount) * 100).toFixed(1);

  // Офис — расчёты
  const rentPerDesk = 42_500;
  const desks       = Math.floor(selectedOffice.area / 6);
  const monthlyRent = desks * rentPerDesk;
  const yearlyRent  = monthlyRent * 12;
  const officeRoi   = ((yearlyRent / selectedOffice.discountPrice) * 100).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

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
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 gold-gradient flex items-center justify-center text-[10px] font-display font-bold text-black tracking-wider">AMI</div>
            <div className="leading-tight">
              <p className="font-display font-600 tracking-[0.2em] text-sm text-gold">AMI GROUP</p>
              <p className="text-[9px] text-muted-foreground tracking-[0.3em] uppercase">Коллективные инвестиции</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={printPDF}
              variant="outline"
              className="border-gold/40 text-gold hover:bg-gold/10 font-sans tracking-wide text-sm rounded-none px-4 no-print"
            >
              <Icon name="Download" size={14} className="mr-1.5" />
              PDF
            </Button>
            <Button
              onClick={() => scrollTo('contact')}
              className="gold-gradient text-black hover:opacity-90 font-sans tracking-wide text-sm rounded-none px-6"
            >
              Оставить заявку
            </Button>
          </div>
        </div>
      </header>

      {/* ════ HERO ════ */}
      <section id="hero" className="relative min-h-screen flex items-center grain overflow-hidden">
        <div className="absolute inset-0">
          <img src={TIZER_IMG} alt="Орликов пер. д.3 стр.1" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
        </div>

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl animate-fade-up">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-gold/70" />
              <span className="text-gold/80 tracking-[0.35em] text-[10px] font-sans uppercase">Коллективные инвестиции · 2026</span>
            </div>

            <p className="text-muted-foreground text-sm tracking-[0.25em] uppercase mb-3 font-sans">
              Войди в проект с комфортной суммой
            </p>

            <h1 className="font-display font-600 leading-[0.9] text-[clamp(3rem,9vw,6.5rem)] mb-2">
              ОРЛИКОВ<br />
              <span className="gold-text-gradient italic">Пер., 3/1</span>
            </h1>

            <p className="font-display text-xl text-gold tracking-wide mb-8 mt-4">
              Два способа заработать на одном объекте
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-10">
              {[
                { icon: 'Users',      v: 'от 500 тыс',  l: 'Минимальный взнос в пул', sub: '₽' },
                { icon: 'TrendingUp', v: '24,5%',        l: 'Доходность инвестора',    sub: 'год' },
                { icon: 'Building2',  v: 'от 5,5 млн',  l: 'Офис с дисконтом 15%',   sub: '₽' },
                { icon: 'Clock',      v: '5',            l: 'Срок реализации проекта', sub: 'мес.' },
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
              <Button onClick={() => scrollTo('models')} size="lg" className="gold-gradient text-black hover:opacity-90 font-sans tracking-wide rounded-none group">
                Выбрать формат участия
                <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition" />
              </Button>
              <Button onClick={printPDF} size="lg" variant="outline" className="border-gold/40 text-gold hover:bg-gold/10 font-sans tracking-wide rounded-none">
                <Icon name="Download" size={16} className="mr-2" />
                Скачать PDF
              </Button>
            </div>
          </div>
        </div>

        <button onClick={() => scrollTo('models')} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-gold/60 animate-float-slow">
          <Icon name="ChevronDown" size={26} />
        </button>
      </section>

      {/* ════ МОДЕЛИ УЧАСТИЯ ════ */}
      <Sec id="models" num="01" title="Форматы участия" sub="Два способа инвестировать в один объект">
        <div className="reveal grid md:grid-cols-2 gap-6 mb-10">

          {/* Карточка Пул */}
          <div className="p-8 bg-black border border-gold/40 relative overflow-hidden group cursor-pointer hover:border-gold/70 transition" onClick={() => scrollTo('pool')}>
            <span className="font-display font-700 text-[6rem] text-gold/5 absolute top-0 right-2 leading-none">A</span>
            <div className="w-12 h-12 gold-gradient flex items-center justify-center mb-5">
              <Icon name="Users" size={22} className="text-black" />
            </div>
            <p className="font-display font-600 text-2xl tracking-wide mb-1">Коллективный пул</p>
            <p className="text-xs text-gold/70 tracking-widest font-sans uppercase mb-4">От 500 000 ₽</p>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-6">
              Вкладываешь любую сумму от 500 тыс. ₽ — получаешь пропорциональную долю в прибыли от реализации всего проекта. Без необходимости самостоятельно управлять недвижимостью.
            </p>
            <div className="space-y-2 mb-6">
              {['Доходность 24,5% годовых', 'Срок — 5 месяцев', 'Прибыль ~114 млн ₽ на весь пул', 'Юридически оформленная доля'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-xs font-sans">
                  <Icon name="Check" size={12} className="text-gold shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-gold text-sm font-sans group-hover:gap-3 transition-all">
              <span>Рассчитать доход</span>
              <Icon name="ArrowRight" size={14} />
            </div>
          </div>

          {/* Карточка Офис */}
          <div className="p-8 bg-card border border-border relative overflow-hidden group cursor-pointer hover:border-gold/40 transition" onClick={() => scrollTo('office')}>
            <span className="font-display font-700 text-[6rem] text-gold/5 absolute top-0 right-2 leading-none">B</span>
            <div className="w-12 h-12 gold-gradient flex items-center justify-center mb-5">
              <Icon name="Building2" size={22} className="text-black" />
            </div>
            <p className="font-display font-600 text-2xl tracking-wide mb-1">Покупка офиса</p>
            <p className="text-xs text-gold/70 tracking-widest font-sans uppercase mb-4">С дисконтом 15%</p>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-6">
              Покупаешь конкретный офис со скидкой 15% от рыночной цены. Сразу сдаёшь через управляющую компанию AMI Group или используешь для бизнеса.
            </p>
            <div className="space-y-2 mb-6">
              {['Дисконт 15% от рынка', 'Готовый отделанный офис', 'Доход от аренды от дня покупки', 'УК AMI Group берёт всё на себя'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-xs font-sans">
                  <Icon name="Check" size={12} className="text-gold shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-gold text-sm font-sans group-hover:gap-3 transition-all">
              <span>Подобрать офис</span>
              <Icon name="ArrowRight" size={14} />
            </div>
          </div>
        </div>

        {/* Сравнительная таблица */}
        <div className="reveal border border-border overflow-hidden">
          <div className="grid grid-cols-3 bg-card border-b border-border">
            <div className="p-4 text-[9px] tracking-widest text-muted-foreground font-sans uppercase border-r border-border">Параметр</div>
            <div className="p-4 text-[9px] tracking-widest text-gold/70 font-sans uppercase border-r border-border flex items-center gap-2">
              <Icon name="Users" size={10} /> Пул
            </div>
            <div className="p-4 text-[9px] tracking-widest text-gold/70 font-sans uppercase flex items-center gap-2">
              <Icon name="Building2" size={10} /> Офис
            </div>
          </div>
          {[
            { param: 'Минимальная сумма',  pool: 'от 500 000 ₽',   office: 'от 5,5 млн ₽' },
            { param: 'Тип дохода',         pool: 'Доля в прибыли',  office: 'Аренда + капитализация' },
            { param: 'Срок',               pool: '5 месяцев',        office: 'Постоянно' },
            { param: 'Доходность',         pool: '24,5% год.',       office: '~15–20% год.' },
            { param: 'Управление',         pool: 'AMI Group',        office: 'УК AMI Group' },
            { param: 'Риск',               pool: 'Средний',          office: 'Низкий' },
          ].map((r, i) => (
            <div key={r.param} className={`grid grid-cols-3 border-b border-border last:border-b-0 ${i % 2 ? 'bg-card/30' : ''}`}>
              <div className="p-3.5 text-xs font-sans text-muted-foreground border-r border-border">{r.param}</div>
              <div className="p-3.5 text-xs font-sans text-foreground border-r border-border">{r.pool}</div>
              <div className="p-3.5 text-xs font-sans text-foreground">{r.office}</div>
            </div>
          ))}
        </div>
      </Sec>

      {/* ════ ПУЛ ════ */}
      <Sec id="pool" num="02" title="Коллективный пул" sub="Вложи сумму — получи долю в прибыли проекта" dark>
        <div className="reveal grid lg:grid-cols-2 gap-8 items-start">

          {/* Калькулятор */}
          <div className="p-8 bg-card border border-gold/30">
            <p className="font-display font-500 text-xl tracking-wide mb-6">Калькулятор дохода</p>

            <div className="mb-6">
              <label className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase block mb-3">
                Сумма инвестиций
              </label>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="range"
                  min={500_000}
                  max={20_000_000}
                  step={500_000}
                  value={poolAmount}
                  onChange={(e) => setPoolAmount(Number(e.target.value))}
                  className="w-full accent-yellow-500 h-1"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {[500_000, 1_000_000, 3_000_000, 5_000_000, 10_000_000].map((v) => (
                  <button
                    key={v}
                    onClick={() => setPoolAmount(v)}
                    className={`px-3 py-1.5 text-xs font-sans border transition ${poolAmount === v ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground hover:border-gold/40'}`}
                  >
                    {v >= 1_000_000 ? `${v / 1_000_000} млн` : `${v / 1_000} тыс`}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 bg-black border border-gold/20 mb-5">
              <p className="font-display font-600 text-5xl gold-text-gradient leading-none mb-1">
                {fmt(poolIncome)}
              </p>
              <p className="text-sm text-muted-foreground font-sans mt-1">чистая прибыль за 5 месяцев</p>
            </div>

            <div className="grid grid-cols-3 gap-px bg-border">
              {[
                { l: 'Ваш взнос', v: fmt(poolAmount) },
                { l: 'Доля в проекте', v: `${(poolShare * 100).toFixed(3)}%` },
                { l: 'Доходность', v: `${poolRoi}%` },
              ].map((s) => (
                <div key={s.l} className="bg-card p-4 text-center">
                  <p className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase mb-1">{s.l}</p>
                  <p className="font-display font-600 text-lg gold-text-gradient leading-none">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Как это работает */}
          <div className="space-y-5">
            <p className="font-display font-500 text-xl tracking-wide mb-2">Как работает пул</p>
            {[
              { n: '01', t: 'Подаёшь заявку',         d: 'Указываешь сумму — от 500 000 ₽. Юристы AMI Group готовят договор инвестиционного участия.' },
              { n: '02', t: 'Вносишь средства',        d: 'Деньги идут на счёт эскроу. Объект покупается только после набора нужной суммы.' },
              { n: '03', t: 'Проект реализуется',      d: 'AMI Group проводит раскадастрирование, ремонт и продажу 31 офиса в течение 5 месяцев.' },
              { n: '04', t: 'Получаешь доход',         d: 'После реализации проекта получаешь пропорциональную долю от ~114 млн ₽ прибыли.' },
            ].map((step) => (
              <div key={step.n} className="flex gap-4">
                <div className="w-10 h-10 shrink-0 gold-gradient flex items-center justify-center text-black font-display font-700 text-sm">{step.n}</div>
                <div>
                  <p className="font-display font-600 tracking-wide mb-0.5">{step.t}</p>
                  <p className="text-xs text-muted-foreground font-sans leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 border border-gold/20 bg-gold/5">
              <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                Залоговое обеспечение — само здание в собственности. Юридическое сопровождение AMI Group на всех этапах. Прозрачная финансовая отчётность.
              </p>
            </div>

            <Button onClick={() => scrollTo('contact')} className="w-full gold-gradient text-black hover:opacity-90 font-sans tracking-wide rounded-none mt-2">
              Войти в пул
              <Icon name="ArrowRight" size={14} className="ml-2" />
            </Button>
          </div>
        </div>
      </Sec>

      {/* ════ ОФИС С ДИСКОНТОМ ════ */}
      <Sec id="office" num="03" title="Покупка офиса" sub="Выбери лот с дисконтом 15% — сдавай сразу">
        <div className="reveal grid lg:grid-cols-2 gap-8 items-start">

          {/* Выбор офиса */}
          <div>
            <p className="font-display font-500 text-xl tracking-wide mb-5">Выбери офис</p>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6 max-h-72 overflow-y-auto pr-1">
              {OFFICES.map((o) => (
                <button
                  key={o.id}
                  onClick={() => setSelectedOffice(o)}
                  className={`p-3 border text-left transition ${selectedOffice.id === o.id ? 'border-gold bg-gold/10' : 'border-border hover:border-gold/40 bg-card'}`}
                >
                  <p className="font-display font-600 text-base gold-text-gradient leading-none">№{o.id}</p>
                  <p className="text-[10px] text-muted-foreground font-sans mt-1">{o.area} м²</p>
                </button>
              ))}
            </div>

            {/* Детали выбранного офиса */}
            <div className="p-6 bg-black border border-gold/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase">Офис</p>
                  <p className="font-display font-600 text-3xl gold-text-gradient">№{selectedOffice.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase">Площадь</p>
                  <p className="font-display font-600 text-2xl">{selectedOffice.area} м²</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-px bg-border mb-4">
                <div className="bg-card p-4">
                  <p className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase mb-1">Рыночная цена</p>
                  <p className="font-display font-600 text-lg text-foreground line-through opacity-50">{fmt(selectedOffice.price)}</p>
                </div>
                <div className="bg-black p-4">
                  <p className="text-[9px] tracking-widest text-gold/70 font-sans uppercase mb-1">Цена с дисконтом 15%</p>
                  <p className="font-display font-600 text-xl gold-text-gradient">{fmt(selectedOffice.discountPrice)}</p>
                </div>
              </div>

              <div className="p-3 bg-gold/5 border border-gold/20 text-center">
                <p className="text-sm font-sans text-gold">
                  Экономия: <span className="font-600">{fmt(selectedOffice.price - selectedOffice.discountPrice)}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Доходность от аренды */}
          <div className="space-y-5">
            <p className="font-display font-500 text-xl tracking-wide">Доходность от аренды</p>

            <div className="p-6 bg-card border border-border">
              <div className="space-y-3 mb-5">
                {[
                  { l: 'Рабочих мест в офисе',      v: `${desks} места` },
                  { l: 'Ставка за место',            v: '42 500 ₽/мес' },
                  { l: 'Арендный доход в месяц',     v: fmt(monthlyRent) },
                  { l: 'Арендный доход в год',       v: fmt(yearlyRent) },
                ].map((r) => (
                  <div key={r.l} className="flex justify-between text-sm font-sans py-2 border-b border-border/50 last:border-b-0">
                    <span className="text-muted-foreground">{r.l}</span>
                    <span className="text-gold font-600">{r.v}</span>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-black border border-gold/30 text-center">
                <p className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase mb-1">Доходность на вложенные средства</p>
                <p className="font-display font-600 text-5xl gold-text-gradient leading-none">{officeRoi}%</p>
                <p className="text-xs text-muted-foreground font-sans mt-1">годовых от аренды</p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { icon: 'Key',         t: 'Готовый офис «под ключ»',       d: 'Полная отделка, мебель, IT-инфраструктура' },
                { icon: 'Users',       t: 'Управляющая компания',           d: 'AMI Group заполняет офис арендаторами' },
                { icon: 'ShieldCheck', t: 'Юридическая чистота',            d: 'Отдельный кадастровый номер, свидетельство о собственности' },
                { icon: 'TrendingUp',  t: 'Рост стоимости',                 d: 'Центр Москвы: дефицит малых офисов, ставки растут' },
              ].map((it) => (
                <div key={it.t} className="flex gap-3 p-3.5 bg-card border border-border hover:border-gold/30 transition">
                  <div className="w-8 h-8 shrink-0 gold-gradient flex items-center justify-center">
                    <Icon name={it.icon} size={14} className="text-black" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-600">{it.t}</p>
                    <p className="text-xs text-muted-foreground font-sans mt-0.5">{it.d}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button onClick={() => scrollTo('contact')} className="w-full gold-gradient text-black hover:opacity-90 font-sans tracking-wide rounded-none">
              Забронировать офис
              <Icon name="ArrowRight" size={14} className="ml-2" />
            </Button>
          </div>
        </div>
      </Sec>

      {/* ════ ОБЪЕКТ ════ */}
      <Sec id="object" num="04" title="Объект" sub="Фотографии и план этажа" dark>
        <div className="grid md:grid-cols-3 gap-3 mb-3">
          <div className="reveal relative overflow-hidden border border-gold/35 group md:col-span-2">
            <img src={MEETING_IMG} alt="Переговорная" className="w-full aspect-[16/9] object-cover group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[9px] tracking-widest text-gold/70 font-sans uppercase">Переговорная</span>
              <p className="font-display text-xl text-white">Конференц-зал</p>
            </div>
            <span className="absolute top-3 right-3 gold-gradient text-[9px] font-sans tracking-widest text-black px-2 py-1 uppercase">Готовый результат</span>
          </div>
          <div className="reveal relative overflow-hidden border border-border group" style={{ transitionDelay: '80ms' }}>
            <img src={OFFICE_IMG} alt="Офис" className="w-full aspect-[4/3] md:h-full object-cover group-hover:scale-105 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase">Офис</span>
              <p className="font-display text-lg text-white">Рабочее пространство</p>
            </div>
          </div>
        </div>

        <div className="reveal relative overflow-hidden border border-border group mb-8">
          <img src={CORRIDOR_IMG} alt="Коридор" className="w-full max-h-[380px] object-cover group-hover:scale-[1.02] transition duration-700" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 max-w-xs">
            <p className="font-display font-600 text-2xl italic text-white mb-1">Дизайнерский коридор</p>
            <p className="font-display font-700 text-2xl gold-text-gradient">Бизнес-центр класса B</p>
            <p className="text-xs text-muted-foreground font-sans mt-1">Орликов пер., д.3 стр.1 · м. Красные ворота — 5 мин</p>
          </div>
        </div>

        <div className="reveal border border-gold/30 overflow-hidden bg-white p-2">
          <img src={FLOOR_PLAN_IMG} alt="Поэтажный план" className="w-full h-auto" />
        </div>

        <div className="reveal grid md:grid-cols-4 gap-4 mt-5">
          {[
            { icon: 'MapPin',   t: 'м. Красные ворота — 5 мин', d: 'Садовое кольцо — 150 м' },
            { icon: 'Layers',   t: '31 офис · 4-й этаж',        d: '648,6 м² полезной площади' },
            { icon: 'Coffee',   t: 'Кухня и переговорная',       d: 'Дизайнерская зона общего пользования' },
            { icon: 'Wifi',     t: 'IT-инфраструктура',          d: 'СКС, интернет, охрана и контроль доступа' },
          ].map((it) => (
            <div key={it.t} className="flex items-start gap-3 p-4 bg-card border border-border">
              <Icon name={it.icon} size={16} className="text-gold shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-sans font-600">{it.t}</p>
                <p className="text-xs text-muted-foreground font-sans mt-0.5">{it.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      {/* ════ ФОРМА ЗАЯВКИ ════ */}
      <section id="contact" className="relative grain overflow-hidden bg-[#060606]">
        <div className="h-px w-full gold-gradient opacity-60" />
        <div className="container relative z-10 py-20">
          <div className="reveal grid lg:grid-cols-2 gap-12 items-start">

            {/* Левая — текст */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-gold/70" />
                <span className="text-gold/70 tracking-[0.3em] text-[9px] font-sans uppercase">05 · Оставить заявку</span>
              </div>
              <h2 className="font-display font-600 text-[clamp(2.2rem,5vw,3.5rem)] leading-tight mb-5 italic">
                Войдите в проект<br />
                <span className="gold-text-gradient">на выгодных условиях</span>
              </h2>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-8 max-w-md">
                Выберите формат — коллективный пул или покупка офиса с дисконтом. Менеджер AMI Group свяжется с вами в течение 2 часов и ответит на все вопросы.
              </p>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { v: 'от 500 тыс ₽', l: 'Минимальный взнос в пул' },
                  { v: '24,5%',         l: 'Доходность инвестора' },
                  { v: '15%',           l: 'Дисконт на покупку офиса' },
                  { v: '5 мес.',        l: 'Срок реализации проекта' },
                ].map((s) => (
                  <div key={s.l} className="p-4 bg-card border border-border text-center">
                    <p className="font-display font-600 text-2xl gold-text-gradient leading-none">{s.v}</p>
                    <p className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase mt-1.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Правая — форма */}
            <div className="p-8 bg-card border border-gold/30">
              {sent ? (
                <div className="text-center py-12">
                  <div className="w-14 h-14 gold-gradient flex items-center justify-center mx-auto mb-5">
                    <Icon name="Check" size={26} className="text-black" />
                  </div>
                  <p className="font-display font-600 text-2xl mb-2">Заявка отправлена</p>
                  <p className="text-muted-foreground font-sans text-sm">Менеджер AMI Group свяжется с вами в течение 2 часов.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="font-display font-500 text-xl tracking-wide mb-5">Оставить заявку</p>

                  <div>
                    <label className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase block mb-2">Ваше имя</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Иван Петров"
                      className="w-full bg-black border border-border px-4 py-3 text-sm font-sans focus:border-gold/50 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase block mb-2">Телефон</label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-black border border-border px-4 py-3 text-sm font-sans focus:border-gold/50 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase block mb-2">Формат участия</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { v: 'pool',   l: 'Коллективный пул' },
                        { v: 'office', l: 'Покупка офиса' },
                      ].map((o) => (
                        <button
                          key={o.v}
                          type="button"
                          onClick={() => setForm({ ...form, model: o.v })}
                          className={`px-4 py-3 text-xs font-sans border transition ${form.model === o.v ? 'border-gold bg-gold/10 text-gold' : 'border-border text-muted-foreground hover:border-gold/40'}`}
                        >
                          {o.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] tracking-widest text-muted-foreground font-sans uppercase block mb-2">Комментарий (необязательно)</label>
                    <textarea
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      placeholder="Сумма, вопросы, пожелания..."
                      rows={3}
                      className="w-full bg-black border border-border px-4 py-3 text-sm font-sans focus:border-gold/50 focus:outline-none transition resize-none"
                    />
                  </div>

                  <Button type="submit" className="w-full gold-gradient text-black hover:opacity-90 font-sans tracking-wide rounded-none py-6 text-sm">
                    Отправить заявку
                    <Icon name="ArrowRight" size={14} className="ml-2" />
                  </Button>

                  <p className="text-[10px] text-muted-foreground font-sans text-center">
                    Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 border-t border-border">
          <div className="container py-5 grid md:grid-cols-3 gap-4 text-[10px] text-muted-foreground tracking-wider font-sans">
            <div className="flex items-center gap-2">
              <Icon name="MapPin" size={12} className="text-gold" />
              <span>Орликов пер., д.3 стр.1 · м. Красные Ворота — 5 мин.</span>
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
