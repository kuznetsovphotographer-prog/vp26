const zones = [
  { id: 'gold', group: 'Номерной фонд · 80 м²', name: 'Сьют «Золото»', detail: 'Общие планы, спальня, зона отдыха, санузел и детали', weight: .28,
    standard: { price: 15000, photos: [5, 6] }, premium: { price: 20000, photos: [8, 10] } },
  { id: 'platinum', group: 'Номерной фонд · 100 м²', name: 'Сьют «Платина»', detail: 'Интерьер, санузел, детали, вид и терраса', weight: .32,
    standard: { price: 20000, photos: [6, 7] }, premium: { price: 25000, photos: [10, 12] } },
  { id: 'diamond', group: 'Номерной фонд · 130 м²', name: 'Сьют «Бриллиант»', detail: 'Интерьер, санузел, собственная сауна и терраса', weight: .40,
    standard: { price: 25000, photos: [7, 8] }, premium: { price: 30000, photos: [12, 14] } },
  { id: 'spa', group: 'SPA & wellness', name: 'Полный SPA-комплекс', detail: 'Бассейн, джакузи, хаммам, сауна, массаж и релакс-зоны', weight: .85,
    standard: { price: 35000, photos: [23, 30] }, premium: { price: 40000, photos: [28, 35] } },
  { id: 'restaurant', group: 'Гостеприимство', name: 'Панорамный ресторан', detail: 'Общие виды, посадка, сервировка, окна и детали', weight: .28,
    standard: { price: 20000, photos: [9, 11] }, premium: { price: 25000, photos: [15, 18] } },
  { id: 'chamber', group: 'Мероприятия · 35 мест', name: 'Камерный зал', detail: 'Общий вид, варианты рассадки и атмосферные детали', weight: .12,
    standard: { price: 10000, photos: [3, 4] }, premium: { price: 12000, photos: [5, 6] } },
  { id: 'conference', group: 'Деловые пространства · 30 мест', name: 'Конференц-зал', detail: 'Рабочая расстановка, экран, оборудование и детали', weight: .15,
    standard: { price: 10000, photos: [4, 6] }, premium: { price: 12000, photos: [6, 8] } },
  { id: 'meeting', group: 'Деловые пространства · 20 мест', name: 'Переговорная', detail: 'Общий план, рабочие ракурсы и оборудование', weight: .10,
    standard: { price: 10000, photos: [3, 4] }, premium: { price: 12000, photos: [5, 6] } },
  { id: 'terrace', group: 'Гостеприимство · до 300 гостей', name: 'Открытая терраса', detail: 'Посадка, связь с архитектурой, дневной и вечерний свет', weight: .10,
    standard: { price: 10000, photos: [5, 6] }, premium: { price: 15000, photos: [8, 10] } },
  { id: 'public', group: 'Общественные пространства', name: 'Лобби, каминный зал и библиотека', detail: 'Интерьеры, игровая зона, навигация и выразительные детали', weight: .25,
    standard: { price: 20000, photos: [7, 9] }, premium: { price: 25000, photos: [12, 15] } },
  { id: 'fitness', group: 'Wellness', name: 'Фитнес-зал', detail: 'Общие ракурсы, оборудование, свет и детали', weight: .15,
    standard: { price: 10000, photos: [4, 5] }, premium: { price: 12000, photos: [6, 8] } },
  { id: 'territory', group: 'Территория · 60 гектаров', name: 'Парк, фасады и территория', detail: 'Волга, маршруты, ландшафт, арт-объекты, рассвет и закат', weight: 1,
    standard: { price: 25000, photos: [20, 25] }, premium: { price: 35000, photos: [25, 30] } }
];

const schedulePlan = [
  {
    ids: ['gold', 'platinum', 'diamond'],
    title: 'Номерной фонд',
    text: 'Снимаем по одному полностью подготовленному представителю каждой категории: общие планы, спальни, зоны отдыха, санузлы, детали, виды, террасы и сауну в сьюте «Бриллиант».'
  },
  {
    ids: ['spa', 'fitness'],
    title: 'SPA и wellness',
    text: 'Ранний старт до прихода гостей: бассейн и вода в спокойном состоянии, затем джакузи, хаммам, сауна, массажные кабинеты, зоны отдыха, переходы и фитнес.'
  },
  {
    ids: ['restaurant', 'chamber', 'conference', 'meeting', 'public'],
    title: 'Ресторан и общественные пространства',
    text: 'Ресторан снимаем до начала сервиса, затем камерный и деловые залы в согласованных расстановках. Завершаем лобби, библиотекой, игровой и каминной зонами.'
  },
  {
    ids: ['territory', 'terrace'],
    title: 'Территория и архитектура',
    text: 'Рассвет — фасады и подъезд, днем — парк, маршруты, арт-объекты и ландшафт. На закате снимаем Волгу, панорамы, открытую террасу и вечерний свет.'
  }
];

const state = { package: 'premium', lodging: 'client', selected: new Set(zones.map(zone => zone.id)) };
const formatMoney = value => `${new Intl.NumberFormat('ru-RU').format(value)} ₽`;
const pluralDays = value => value === 1 ? 'день' : value < 5 ? 'дня' : 'дней';
const pluralNights = value => value % 10 === 1 && value % 100 !== 11 ? 'ночь' : [2, 3, 4].includes(value % 10) && ![12, 13, 14].includes(value % 100) ? 'ночи' : 'ночей';
const list = document.querySelector('#zones-list');
const template = document.querySelector('#zone-template');

zones.forEach((zone, index) => {
  const node = template.content.cloneNode(true);
  const card = node.querySelector('.zone-card');
  const input = node.querySelector('input');
  card.dataset.id = zone.id;
  card.style.animationDelay = `${Math.min(index * 35, 280)}ms`;
  card.classList.add('reveal');
  input.dataset.id = zone.id;
  input.setAttribute('aria-label', `Добавить в расчет: ${zone.name}`);
  node.querySelector('.zone-kicker').textContent = zone.group;
  node.querySelector('.zone-name').textContent = zone.name;
  node.querySelector('.zone-detail').textContent = zone.detail;
  input.addEventListener('change', event => {
    event.target.checked ? state.selected.add(zone.id) : state.selected.delete(zone.id);
    update();
  });
  list.append(node);
});

function getTotals() {
  const selectedZones = zones.filter(zone => state.selected.has(zone.id));
  const totals = selectedZones.reduce((acc, zone) => {
    const offer = zone[state.package];
    acc.raw += offer.price;
    acc.minPhotos += offer.photos[0];
    acc.maxPhotos += offer.photos[1];
    acc.weight += zone.weight;
    return acc;
  }, { raw: 0, minPhotos: 0, maxPhotos: 0, weight: 0 });

  const qualifiesForBundle = selectedZones.length >= 4;
  const work = qualifiesForBundle ? Math.round((totals.raw * .94) / 1000) * 1000 : totals.raw;
  const discount = totals.raw - work;
  const uniqueMax = totals.maxPhotos ? Math.max(totals.minPhotos, Math.round(totals.maxPhotos * .93)) : 0;
  const colorMin = totals.minPhotos ? totals.minPhotos * 2 : 0;
  const colorMax = uniqueMax ? Math.ceil((uniqueMax * 2.5) / 5) * 5 : 0;
  const days = totals.weight ? Math.max(1, Math.ceil(totals.weight)) : 0;
  const nights = days ? days + 1 : 0;
  const road = work ? 5000 : 0;
  const lodging = state.lodging === 'self' ? nights * 4000 : 0;
  const grand = work + road + lodging;
  const prepayment = Math.round(grand * .2);
  return { ...totals, selectedZones, work, discount, uniqueMax, colorMin, colorMax, days, nights, road, lodging, grand, prepayment };
}

function renderSchedule() {
  const grid = document.querySelector('#schedule-grid');
  const activeDays = schedulePlan
    .map(day => ({ ...day, zones: zones.filter(zone => day.ids.includes(zone.id) && state.selected.has(zone.id)) }))
    .filter(day => day.zones.length);

  if (!activeDays.length) {
    grid.innerHTML = '<div class="schedule-empty">Выберите зоны — здесь появится ориентировочный план съемочных дней.</div>';
    return;
  }

  grid.innerHTML = activeDays.map((day, index) => `
    <article class="schedule-day">
      <span class="schedule-number">0${index + 1}</span>
      <h3>День ${index + 1}<br>${day.title}</h3>
      <p>${day.text}</p>
      <div class="schedule-tags">${day.zones.map(zone => `<span>${zone.name}</span>`).join('')}</div>
    </article>
  `).join('');
}

function update() {
  document.querySelectorAll('.zone-card').forEach(card => {
    const zone = zones.find(item => item.id === card.dataset.id);
    const offer = zone[state.package];
    const offerColorMin = offer.photos[0] * 2;
    const offerColorMax = Math.ceil(offer.photos[1] * 2.5);
    const enabled = state.selected.has(zone.id);
    card.classList.toggle('is-off', !enabled);
    card.querySelector('input').checked = enabled;
    card.querySelector('.zone-photos').textContent = `${offer.photos[0]}–${offer.photos[1]} на ретушь`;
    card.querySelector('.zone-color-photos').textContent = `≈ ${offerColorMin}–${offerColorMax} с цветокоррекцией`;
    card.querySelector('.zone-price').textContent = formatMoney(offer.price);
  });

  const totals = getTotals();
  document.querySelector('#selected-count').textContent = state.selected.size;
  document.querySelector('#work-total').textContent = formatMoney(totals.work);
  document.querySelector('#road-total').textContent = totals.road ? formatMoney(totals.road) : '—';
  document.querySelector('#lodging-total').textContent = !totals.work ? '—' : state.lodging === 'self' ? formatMoney(totals.lodging) : 'Предоставляет объект';
  document.querySelector('#night-count').textContent = `${totals.nights} ${pluralNights(totals.nights)}`;
  document.querySelector('#grand-total').textContent = formatMoney(totals.grand);
  document.querySelector('#prepayment-total').textContent = totals.prepayment ? formatMoney(totals.prepayment) : '—';
  document.querySelector('#photo-total').textContent = totals.minPhotos ? `≈ ${totals.minPhotos}–${totals.uniqueMax}` : '—';
  document.querySelector('#color-photo-total').textContent = totals.colorMin ? `≈ ${totals.colorMin}–${totals.colorMax}` : '—';
  document.querySelector('#retouch-selection-total').textContent = totals.minPhotos ? `≈ ${totals.minPhotos}–${totals.uniqueMax}` : '—';
  document.querySelector('#color-selection-total').textContent = totals.colorMin ? `≈ ${totals.colorMin}–${totals.colorMax}` : '—';
  document.querySelector('#day-total').textContent = totals.days ? `${totals.days} ${pluralDays(totals.days)}` : '—';
  document.querySelector('#discount-value').textContent = `−${formatMoney(totals.discount)}`;
  document.querySelector('#discount-line').classList.toggle('hidden', !totals.discount);
  document.querySelector('#select-all').textContent = state.selected.size === zones.length ? 'Снять выбор' : 'Снять все зоны';
  renderSchedule();
}

document.querySelectorAll('[data-package]').forEach(button => {
  button.addEventListener('click', () => {
    state.package = button.dataset.package;
    document.querySelectorAll('[data-package]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-checked', String(active));
    });
    document.querySelector('#package-explainer').innerHTML = state.package === 'premium'
      ? '<b>Премиум</b> — расширенный фотобанк по всем выбранным зонам: общие планы, детали, вертикальные и горизонтальные кадры для сайта, соцсетей, презентаций и PR.'
      : '<b>Стандарт</b> — компактная выдача ключевых ракурсов по выбранным зонам — для обновления сайта, соцсетей и презентаций.';
    update();
  });
});

document.querySelector('#select-all').addEventListener('click', () => {
  state.selected = state.selected.size === zones.length ? new Set() : new Set(zones.map(zone => zone.id));
  update();
});

document.querySelectorAll('[data-lodging]').forEach(button => {
  button.addEventListener('click', () => {
    state.lodging = button.dataset.lodging;
    document.querySelectorAll('[data-lodging]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-checked', String(active));
    });
    update();
  });
});

document.querySelector('#copy-button').addEventListener('click', async event => {
  const totals = getTotals();
  const packageName = state.package === 'premium' ? 'Премиум' : 'Стандарт';
  const zoneNames = totals.selectedZones.map(zone => `— ${zone.name}`).join('\n');
  const lodgingText = state.lodging === 'self' ? `${totals.nights} ${pluralNights(totals.nights)} × 4 000 ₽ = ${formatMoney(totals.lodging)}` : 'предоставляет Villa Plyos';
  const text = `Villa Plyos — расчет интерьерной съемки\nПакет: ${packageName}\n\n${zoneNames || 'Зоны не выбраны'}\n\nРабота: ${formatMoney(totals.work)}\nДорога: ${totals.road ? formatMoney(totals.road) : '—'}\nПроживание: ${totals.work ? lodgingText : '—'}\nИтого: ${formatMoney(totals.grand)}\nПредоплата 20%: ${totals.prepayment ? formatMoney(totals.prepayment) : '—'}\nС детальной ретушью: ${totals.minPhotos ? `ориентировочно ${totals.minPhotos}–${totals.uniqueMax}` : '—'}\nС цветокоррекцией: ${totals.colorMin ? `ориентировочно ${totals.colorMin}–${totals.colorMax}` : '—'}\nСъемка: ${totals.days ? `${totals.days} ${pluralDays(totals.days)}` : '—'}\nОтбор и цветокоррекция: в течение 10 дней.\nФинальная ретушь выбранных кадров: в течение 20 дней после выбора.\n\nДля фиксации дат съемки заключается договор и вносится предоплата 20%. Оставшиеся 80% оплачиваются после завершения ретуши и передачи готового архива.\nПитание согласовывается отдельно.`;
  const label = event.currentTarget.querySelector('span');
  try {
    await navigator.clipboard.writeText(text);
    label.textContent = 'Расчет скопирован';
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    document.body.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
    label.textContent = 'Расчет скопирован';
  }
  window.setTimeout(() => { label.textContent = 'Скопировать расчет'; }, 1800);
});

update();
