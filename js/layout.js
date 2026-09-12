(function () {
  var PAGE_CONFIG = {
    index: {
      cta: { href: '#looking-for-heading', label: 'Get Started' },
      footer: {
        ctas: [
          { href: 'rent.html', label: 'Explore Rentals', style: 'primary' },
          { href: '#looking-for-heading', label: 'Shop Booths', style: 'outline' },
          { href: 'software.html', label: 'Explore Software ↗', style: 'outline' }
        ],
        nav: [
          { href: '#looking-for-heading', label: 'Home' },
          { href: '#experience-heading', label: 'Gallery' },
          { href: '#cost-heading', label: 'Packages' },
          { href: '#faq-heading', label: 'FAQ' }
        ]
      }
    },
    rent: {
      cta: { href: '#availability-heading', label: 'Check Availability' },
      footer: {
        ctas: [
          { href: '#availability-heading', label: 'Check Availability', style: 'primary' },
          { href: 'buy.html', label: 'Shop Booths', style: 'outline' },
          { href: 'software.html', label: 'Explore Software ↗', style: 'outline' }
        ],
        nav: [
          { href: 'index.html', label: 'Home' },
          { href: '#catalog-heading', label: 'Booths' },
          { href: '#packages-heading', label: 'Packages' },
          { href: '#faq-heading', label: 'FAQ' }
        ]
      }
    },
    buy: {
      cta: { href: '#quote-heading', label: 'Request Pricing' },
      footer: {
        ctas: [
          { href: '#quote-heading', label: 'Request Pricing', style: 'primary' },
          { href: 'rent.html', label: 'Rent Instead', style: 'outline' },
          { href: 'software.html', label: 'Explore Software ↗', style: 'outline' }
        ],
        nav: [
          { href: 'index.html', label: 'Home' },
          { href: '#catalog-heading', label: 'Booths' },
          { href: '#packages-heading', label: 'Packages' },
          { href: '#faq-heading', label: 'FAQ' }
        ]
      }
    },
    software: {
      cta: { href: '#', label: 'Explore Software ↗' },
      footer: {
        ctas: [
          { href: '#', label: 'Explore Software ↗', style: 'primary' },
          { href: 'rent.html', label: 'Rent a Booth', style: 'outline' },
          { href: 'buy.html', label: 'Shop Booths', style: 'outline' }
        ],
        nav: [
          { href: 'index.html', label: 'Home' },
          { href: '#capabilities-heading', label: 'Capabilities' },
          { href: '#devices-heading', label: 'Compatibility' },
          { href: '#faq-heading', label: 'FAQ' }
        ]
      }
    }
  };

  function createFooterCta(item) {
    var a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    a.className = item.style === 'primary'
      ? 'rounded-full bg-white text-[#1c1c22] text-sm font-semibold px-5 py-3 text-center hover:bg-gray-100 transition'
      : 'rounded-full border-2 border-white text-white text-sm font-semibold px-5 py-3 text-center hover:bg-white/10 transition';
    return a;
  }

  function createFooterNavLink(item) {
    var a = document.createElement('a');
    a.href = item.href;
    a.textContent = item.label;
    a.className = 'hover:text-white transition';
    return a;
  }

  function renderHeader(header, config) {
    header.querySelectorAll('.header-nav-link').forEach(function (link) {
      if (link.getAttribute('data-nav') === config.page) link.classList.add('active');
    });

    var cta = header.querySelector('#header-cta');
    cta.href = config.cta.href;
    cta.textContent = config.cta.label;
  }

  function renderFooter(footer, config) {
    var ctas = footer.querySelector('#footer-ctas');
    config.footer.ctas.forEach(function (item) {
      ctas.appendChild(createFooterCta(item));
    });

    var nav = footer.querySelector('#footer-nav');
    config.footer.nav.forEach(function (item) {
      nav.appendChild(createFooterNavLink(item));
    });
  }

  function loadPartial(url, mountId, onLoaded) {
    var mount = document.getElementById(mountId);
    if (!mount) return;
    fetch(url)
      .then(function (res) { return res.text(); })
      .then(function (html) {
        mount.innerHTML = html;
        onLoaded(mount.firstElementChild);
      })
      .catch(function (err) {
        console.error('Failed to load ' + url, err);
      });
  }

  var page = document.body.getAttribute('data-page');
  var config = PAGE_CONFIG[page];
  if (!config) return;
  config.page = page;

  loadPartial('partials/header.html', 'site-header', function (header) {
    renderHeader(header, config);
  });
  loadPartial('partials/footer.html', 'site-footer', function (footer) {
    renderFooter(footer, config);
  });
})();
