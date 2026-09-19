(function () {
  var PAGE_CONFIG = {
    index: { cta: { href: '#looking-for-heading', label: 'Get Started' } },
    rent: { cta: { href: '#availability-heading', label: 'Check Availability' } },
    buy: { cta: { href: '#quote-heading', label: 'Request Pricing' } },
    software: { cta: { href: '#', label: 'Explore Software ↗' } }
  };

  function renderHeader(header, config) {
    header.querySelectorAll('.header-nav-link').forEach(function (link) {
      if (link.getAttribute('data-nav') === config.page) link.classList.add('active');
    });

    var cta = header.querySelector('#header-cta');
    cta.href = config.cta.href;
    cta.textContent = config.cta.label;
  }

  function renderFooter(footer, config) {
    footer.querySelectorAll('.footer-nav-link').forEach(function (link) {
      if (link.getAttribute('data-nav') === config.page) link.classList.add('text-white');
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
