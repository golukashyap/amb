async function loadContent() {
  try {
    const response = await fetch('content.json', { cache: 'no-cache' });
    const content = await response.json();

    setBrand(content?.brand);
    setNavigation(content?.navigation);
    setHero(content?.hero);
    setStats(content?.stats);
    setInitiatives(content?.initiatives);
    setResources(content?.resources);
    setPartners(content?.partners);
    setCTA(content?.cta);
    setFooter(content?.footer, content?.navigation);
  } catch (error) {
    console.error('Failed to load content.json', error);
  }
}

function setBrand(brand) {
  if (!brand) return;
  const brandName = document.getElementById('brandName');
  const footerBrand = document.getElementById('footerBrand');
  if (brandName) brandName.textContent = brand.name || brandName.textContent;
  if (footerBrand) footerBrand.textContent = brand.name || footerBrand.textContent;
}

function setNavigation(navigation) {
  const navList = document.querySelector('[data-nav]');
  const footerNav = document.querySelector('[data-footer-nav]');
  if (!navList || !navigation) return;
  navList.innerHTML = '';
  navigation.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    li.appendChild(a);
    navList.appendChild(li);
  });
  if (footerNav) {
    footerNav.innerHTML = '';
    navigation.forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.label;
      footerNav.appendChild(a);
    });
  }
}

function setHero(hero) {
  if (!hero) return;
  const title = document.querySelector('[data-hero-title]');
  const subtitle = document.querySelector('[data-hero-subtitle]');
  const cta = document.querySelector('[data-hero-cta]');
  const meta = document.querySelector('[data-hero-meta]');
  const media = document.querySelector('[data-hero-media]');
  if (title && hero.title) title.textContent = hero.title;
  if (subtitle && hero.subtitle) subtitle.textContent = hero.subtitle;
  if (cta && Array.isArray(hero.cta)) {
    cta.innerHTML = '';
    hero.cta.forEach(btn => {
      const a = document.createElement('a');
      a.className = `button${btn.variant === 'ghost' ? ' button--ghost' : ''}`;
      a.href = btn.href || '#';
      a.textContent = btn.label;
      cta.appendChild(a);
    });
  }
  if (meta && Array.isArray(hero.meta)) {
    meta.innerHTML = '';
    hero.meta.forEach(entry => {
      const wrap = document.createElement('div');
      const dt = document.createElement('dt');
      const dd = document.createElement('dd');
      dt.textContent = entry.term;
      dd.textContent = entry.description;
      wrap.appendChild(dt);
      wrap.appendChild(dd);
      meta.appendChild(wrap);
    });
  }
  if (media && Array.isArray(hero.mediaCards)) {
    media.innerHTML = '';
    hero.mediaCards.forEach(card => {
      const el = document.createElement('div');
      el.className = 'media-card';
      el.innerHTML = `
        <div class="media-badge${card.variant === 'secondary' ? ' media-badge--secondary' : ''}">${card.badge}</div>
        <h3>${card.title}</h3>
        <p>${card.text}</p>
      `;
      media.appendChild(el);
    });
  }
}

function setStats(stats) {
  if (!stats) return;
  const title = document.querySelector('[data-stats-title]');
  const grid = document.querySelector('[data-stats-grid]');
  if (title && stats.title) title.textContent = stats.title;
  if (grid && Array.isArray(stats.items)) {
    grid.innerHTML = '';
    stats.items.forEach(s => {
      const card = document.createElement('article');
      card.className = 'stat-card';
      card.innerHTML = `
        <h3>${s.label}</h3>
        <p class="stat-number">${s.value}</p>
        <p class="stat-desc">${s.description || ''}</p>
      `;
      grid.appendChild(card);
    });
  }
}

function setInitiatives(initiatives) {
  if (!initiatives) return;
  const title = document.querySelector('[data-initiatives-title]');
  const grid = document.querySelector('[data-initiatives-grid]');
  if (title && initiatives.title) title.textContent = initiatives.title;
  if (grid && Array.isArray(initiatives.items)) {
    grid.innerHTML = '';
    initiatives.items.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.text}</p>
        ${item.link ? `<a class="card-link" href="${item.link.href}">${item.link.label}</a>` : ''}
      `;
      grid.appendChild(card);
    });
  }
}

function setResources(resources) {
  if (!resources) return;
  const title = document.querySelector('[data-resources-title]');
  const list = document.querySelector('[data-resources-list]');
  if (title && resources.title) title.textContent = resources.title;
  if (list && Array.isArray(resources.items)) {
    list.innerHTML = '';
    resources.items.forEach(r => {
      const a = document.createElement('a');
      a.className = 'resource-item';
      a.href = r.href || '#';
      a.innerHTML = `
        <span class="resource-title">${r.title}</span>
        <span class="resource-meta">${r.meta || ''}</span>
      `;
      list.appendChild(a);
    });
  }
}

function setPartners(partners) {
  if (!partners) return;
  const title = document.querySelector('[data-partners-title]');
  const logos = document.querySelector('[data-partners-logos]');
  if (title && partners.title) title.textContent = partners.title;
  if (logos && Array.isArray(partners.items)) {
    logos.innerHTML = '';
    partners.items.forEach(name => {
      const div = document.createElement('div');
      div.className = 'logo';
      div.textContent = name;
      logos.appendChild(div);
    });
  }
}

function setCTA(cta) {
  if (!cta) return;
  const title = document.querySelector('[data-cta-title]');
  const subtitle = document.querySelector('[data-cta-subtitle]');
  if (title && cta.title) title.textContent = cta.title;
  if (subtitle && cta.subtitle) subtitle.textContent = cta.subtitle;
}

function setFooter(footer, navigation) {
  if (!footer) return;
  const copy = document.querySelector('[data-footer-copy]');
  if (copy && footer.copy) copy.textContent = footer.copy;
  setNavigation(navigation);
}

window.addEventListener('DOMContentLoaded', loadContent);
