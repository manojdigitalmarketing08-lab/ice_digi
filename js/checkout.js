(function () {
  var state = { orderType: 'rent' };

  var pricing = {
    rent: { productLabel: 'Rental (1 day)', product: 1850.00, config: 310.00, addons: 165.00, logisticsLabel: 'Delivery & Pickup', logistics: 175.00 },
    buy:  { productLabel: 'Product Price', product: 4200.00, config: 310.00, addons: 165.00, logisticsLabel: 'Shipping', logistics: 149.00 }
  };

  function fmt(n) { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }

  function recalc() {
    var p = pricing[state.orderType];
    var subtotal = p.product + p.config + p.addons + p.logistics;
    var tax = subtotal * 0.08;
    var total = subtotal + tax;

    document.querySelectorAll('[data-line-product-label]').forEach(function (el) { el.textContent = p.productLabel; });
    document.querySelectorAll('[data-line-product]').forEach(function (el) { el.textContent = fmt(p.product); });
    document.querySelectorAll('[data-line-config]').forEach(function (el) { el.textContent = fmt(p.config); });
    document.querySelectorAll('[data-line-addons]').forEach(function (el) { el.textContent = fmt(p.addons); });
    document.querySelectorAll('[data-line-logistics-label]').forEach(function (el) { el.textContent = p.logisticsLabel; });
    document.querySelectorAll('[data-line-logistics]').forEach(function (el) { el.textContent = fmt(p.logistics); });
    document.querySelectorAll('[data-line-tax]').forEach(function (el) { el.textContent = fmt(tax); });
    document.querySelectorAll('[data-summary-total-full], [data-summary-total-mobile], [data-summary-total]').forEach(function (el) { el.textContent = fmt(total); });
    document.querySelectorAll('[data-confirm-total]').forEach(function (el) { el.textContent = fmt(total); });

    var mobileBody = document.getElementById('mobile-summary-body');
    mobileBody.innerHTML =
      '<div class="flex justify-between text-sm py-1"><span class="text-[#8b87a0]">' + p.productLabel + '</span><span class="text-[#3a3550]">' + fmt(p.product) + '</span></div>' +
      '<div class="flex justify-between text-sm py-1"><span class="text-[#8b87a0]">Configuration</span><span class="text-[#3a3550]">' + fmt(p.config) + '</span></div>' +
      '<div class="flex justify-between text-sm py-1"><span class="text-[#8b87a0]">Add-ons</span><span class="text-[#3a3550]">' + fmt(p.addons) + '</span></div>' +
      '<div class="flex justify-between text-sm py-1"><span class="text-[#8b87a0]">' + p.logisticsLabel + '</span><span class="text-[#3a3550]">' + fmt(p.logistics) + '</span></div>' +
      '<div class="flex justify-between text-sm py-1"><span class="text-[#8b87a0]">Tax</span><span class="text-[#3a3550]">' + fmt(tax) + '</span></div>';
  }

  function applyOrderType(type) {
    state.orderType = type;
    var isRent = type === 'rent';

    document.querySelectorAll('.order-type-btn').forEach(function (btn) {
      var on = btn.getAttribute('data-order-type') === type;
      btn.classList.toggle('bg-[#6C4EF5]', on);
      btn.classList.toggle('text-white', on);
      btn.classList.toggle('text-[#4a4560]', !on);
    });

    document.getElementById('rental-section').classList.toggle('hidden', !isRent);
    document.getElementById('logistics-rent').classList.toggle('hidden', !isRent);
    document.getElementById('logistics-buy').classList.toggle('hidden', isRent);
    document.querySelector('[data-address-title]').textContent = isRent ? 'Billing Address' : 'Shipping Address';
    document.querySelector('[data-logistics-title]').textContent = isRent ? 'Delivery & Pickup' : 'Shipping';
    document.querySelector('[data-trust-warranty]').textContent = isRent ? 'Rental Support' : 'Warranty Support';
    document.querySelectorAll('[data-cta-label]').forEach(function (el) { el.textContent = isRent ? 'Complete Booking' : 'Place Order'; });
    document.querySelector('[data-policy-shipping]').classList.toggle('hidden', isRent);
    document.querySelector('[data-policy-rental]').classList.toggle('hidden', !isRent);
    document.getElementById('confirm-logistics-rent').classList.toggle('hidden', !isRent);
    document.getElementById('confirm-logistics-buy').classList.toggle('hidden', isRent);
    document.getElementById('confirm-event-details').classList.toggle('hidden', !isRent);

    var next1 = document.querySelector('[data-step-1]'), next3 = document.querySelector('[data-step-3]');
    if (isRent) { next1.textContent = 'Booking Confirmed'; next3.textContent = 'Delivery & Setup'; }
    else { next1.textContent = 'Order Received'; next3.textContent = 'Delivery'; }
    document.querySelector('[data-step-4]').textContent = isRent ? 'Event Day' : 'Order Arrives';
    document.querySelector('[data-confirm-heading]').textContent = isRent ? 'Booking Confirmed' : 'Order Confirmed';
    document.querySelector('[data-confirm-order-type]').textContent = isRent ? 'Rental' : 'Purchase';

    recalc();
  }

  document.querySelectorAll('.order-type-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { applyOrderType(btn.getAttribute('data-order-type')); });
  });

  document.getElementById('same-billing').addEventListener('change', function (e) {
    document.getElementById('billing-fields').classList.toggle('hidden', e.target.checked);
  });

  document.querySelectorAll('.pay-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.pay-tab').forEach(function (t) {
        t.classList.remove('active');
        t.classList.remove('border-[#6C4EF5]');
        t.classList.add('border-gray-200', 'text-[#3a3550]');
      });
      tab.classList.add('active');
      tab.classList.remove('border-gray-200', 'text-[#3a3550]');

      ['card', 'paypal', 'ach'].forEach(function (k) {
        document.getElementById('pay-panel-' + k).classList.toggle('hidden', k !== tab.getAttribute('data-pay-tab'));
      });
    });
  });

  document.querySelectorAll('.addon-remove').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('div.flex.items-center');
      if (row) row.remove();
    });
  });

  var cardInput = document.getElementById('card-number');
  cardInput.addEventListener('input', function () {
    var digits = cardInput.value.replace(/\D/g, '').slice(0, 16);
    cardInput.value = digits.replace(/(.{4})/g, '$1 ').trim();
  });
  var expInput = document.getElementById('card-expiry');
  expInput.addEventListener('input', function () {
    var digits = expInput.value.replace(/\D/g, '').slice(0, 4);
    expInput.value = digits.length > 2 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits;
  });
  var phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function () {
    var d = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    var out = d;
    if (d.length > 6) out = '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
    else if (d.length > 3) out = '(' + d.slice(0, 3) + ') ' + d.slice(3);
    phoneInput.value = out;
  });

  document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!this.checkValidity()) { this.reportValidity(); return; }

    var email = document.getElementById('email').value || 'you@email.com';
    document.querySelector('[data-confirm-email]').textContent = email;
    document.querySelector('[data-order-number]').textContent = '#ICD-' + Math.floor(40000 + Math.random() * 9000);

    if (state.orderType === 'rent') {
      var date = document.getElementById('event-date').value;
      var venue = document.getElementById('event-venue').value;
      document.querySelector('[data-confirm-event]').textContent = (date || 'Your event date') + ' at ' + (venue || 'your selected venue');
    }

    document.body.classList.add('order-placed');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  });

  var params = new URLSearchParams(window.location.search);
  var initialType = params.get('type') === 'buy' ? 'buy' : 'rent';
  applyOrderType(initialType);
})();
