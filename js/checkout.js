(function () {
  var state = { orderType: 'rent' };

  // TEST MODE: real prices below are commented out and replaced with a ₹1
  // total (tax zeroed too) to match api/config.php for live payment testing.
  // Restore the real values and tax rate in both files before going live.
  var pricing = {
    rent: { productLabel: 'Rental (1 day)', product: 1.00, config: 0.00, addons: 0.00, logisticsLabel: 'Delivery & Pickup', logistics: 0.00 },
    buy:  { productLabel: 'Product Price', product: 1.00, config: 0.00, addons: 0.00, logisticsLabel: 'Shipping', logistics: 0.00 }
    // rent: { productLabel: 'Rental (1 day)', product: 1850.00, config: 310.00, addons: 165.00, logisticsLabel: 'Delivery & Pickup', logistics: 175.00 },
    // buy:  { productLabel: 'Product Price', product: 4200.00, config: 310.00, addons: 165.00, logisticsLabel: 'Shipping', logistics: 149.00 }
  };
  var TAX_RATE = 0.00; // TEST MODE — restore to 0.08 before going live

  // Payment is always actually charged in INR via BulkPe — this only changes
  // the displayed symbol/locale to match the selected billing country.
  var currencyByCountry = {
    'India': { symbol: '₹', locale: 'en-IN' },
    'United States': { symbol: '$', locale: 'en-US' },
    'Canada': { symbol: '$', locale: 'en-US' },
    'United Kingdom': { symbol: '£', locale: 'en-GB' }
  };
  state.currency = currencyByCountry['India'];

  function fmt(n) {
    return state.currency.symbol + n.toLocaleString(state.currency.locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function addonsTotal() {
    var total = 0;
    document.querySelectorAll('#addons-list .addon-row').forEach(function (row) {
      total += parseFloat(row.getAttribute('data-addon-price')) || 0;
    });
    return total;
  }

  function recalc() {
    var p = pricing[state.orderType];
    var subtotal = p.product + p.config + addonsTotal() + p.logistics;
    var tax = subtotal * TAX_RATE;
    var total = subtotal + tax;

    document.querySelectorAll('[data-line-product-label]').forEach(function (el) { el.textContent = p.productLabel; });
    document.querySelectorAll('[data-line-product]').forEach(function (el) { el.textContent = fmt(p.product); });
    document.querySelectorAll('[data-line-config]').forEach(function (el) { el.textContent = fmt(p.config); });
    document.querySelectorAll('[data-line-addons]').forEach(function (el) { el.textContent = fmt(addonsTotal()); });
    document.querySelectorAll('[data-line-logistics-label]').forEach(function (el) { el.textContent = p.logisticsLabel; });
    document.querySelectorAll('[data-line-logistics]').forEach(function (el) { el.textContent = fmt(p.logistics); });
    document.querySelectorAll('[data-line-tax]').forEach(function (el) { el.textContent = fmt(tax); });
    document.querySelectorAll('[data-summary-total-full], [data-summary-total-mobile], [data-summary-total]').forEach(function (el) { el.textContent = fmt(total); });
    document.querySelectorAll('[data-confirm-total]').forEach(function (el) { el.textContent = fmt(total); });

    var mobileBody = document.getElementById('mobile-summary-body');
    mobileBody.innerHTML =
      '<div class="flex justify-between text-sm py-1"><span class="text-[#8b87a0]">' + p.productLabel + '</span><span class="text-[#3a3550]">' + fmt(p.product) + '</span></div>' +
      '<div class="flex justify-between text-sm py-1"><span class="text-[#8b87a0]">Configuration</span><span class="text-[#3a3550]">' + fmt(p.config) + '</span></div>' +
      '<div class="flex justify-between text-sm py-1"><span class="text-[#8b87a0]">Add-ons</span><span class="text-[#3a3550]">' + fmt(addonsTotal()) + '</span></div>' +
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

  var countrySelect = document.getElementById('country');
  countrySelect.addEventListener('change', function () {
    state.currency = currencyByCountry[countrySelect.value] || currencyByCountry['India'];
    recalc();
  });

  // Add-ons: catalog of items available to add beyond what's already in the order.
  var addonCatalog = [
    { id: 'props-box', icon: '🎉', name: 'Premium Props Box', price: 45.00 },
    { id: 'backdrop', icon: '🖼️', name: 'Custom Backdrop', price: 120.00 },
    { id: 'memory-card', icon: '💾', name: 'Extra Memory Card', price: 35.00 },
    { id: 'guest-book', icon: '📖', name: 'Guest Book', price: 60.00 },
    { id: 'extra-hour', icon: '⏱️', name: 'Extra Hour Coverage', price: 200.00 },
    { id: 'attendant', icon: '🧑‍💼', name: 'On-site Attendant', price: 150.00 }
  ];

  var addonsList = document.getElementById('addons-list');
  var addonPicker = document.getElementById('addon-picker');
  var addonAddToggle = document.getElementById('addon-add-toggle');

  function addedAddonIds() {
    var ids = [];
    addonsList.querySelectorAll('.addon-row').forEach(function (row) { ids.push(row.getAttribute('data-addon-id')); });
    return ids;
  }

  function makeAddonRow(item) {
    var row = document.createElement('div');
    row.className = 'addon-row flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4';
    row.setAttribute('data-addon-id', item.id);
    row.setAttribute('data-addon-price', item.price.toFixed(2));
    row.innerHTML =
      '<div class="w-11 h-11 rounded-xl bg-[#6C4EF5]/10 flex items-center justify-center text-lg flex-shrink-0">' + item.icon + '</div>' +
      '<div class="min-w-0 flex-1"><p class="text-sm font-medium text-[#211f2e] truncate">' + item.name + '</p><p class="text-xs text-[#8b87a0]">Qty 1</p></div>' +
      '<span class="text-sm font-semibold text-[#211f2e] flex-shrink-0">' + fmt(item.price) + '</span>' +
      '<button type="button" class="addon-remove text-xs text-[#8b87a0] hover:text-[#6C4EF5] flex-shrink-0" aria-label="Remove ' + item.name + '">Remove</button>';
    row.querySelector('.addon-remove').addEventListener('click', function () {
      row.remove();
      renderAddonPicker();
      recalc();
    });
    return row;
  }

  function renderAddonPicker() {
    var added = addedAddonIds();
    var available = addonCatalog.filter(function (item) { return added.indexOf(item.id) === -1; });

    if (!available.length) {
      addonPicker.innerHTML = '<p class="text-xs text-[#8b87a0] text-center py-1">All available add-ons have been added.</p>';
      return;
    }

    addonPicker.innerHTML = '';
    available.forEach(function (item) {
      var option = document.createElement('button');
      option.type = 'button';
      option.className = 'w-full flex items-center gap-4 rounded-xl bg-white border border-gray-200 p-3 text-left hover:border-[#6C4EF5] transition';
      option.innerHTML =
        '<div class="w-9 h-9 rounded-lg bg-[#6C4EF5]/10 flex items-center justify-center text-base flex-shrink-0">' + item.icon + '</div>' +
        '<span class="min-w-0 flex-1 text-sm font-medium text-[#211f2e] truncate">' + item.name + '</span>' +
        '<span class="text-sm font-semibold text-[#211f2e] flex-shrink-0">' + fmt(item.price) + '</span>' +
        '<span class="w-6 h-6 rounded-full bg-[#6C4EF5] text-white flex items-center justify-center text-sm leading-none flex-shrink-0">+</span>';
      option.addEventListener('click', function () {
        addonsList.appendChild(makeAddonRow(item));
        renderAddonPicker();
        recalc();
      });
      addonPicker.appendChild(option);
    });
  }

  addonAddToggle.addEventListener('click', function () {
    var isHidden = addonPicker.classList.contains('hidden');
    if (isHidden) renderAddonPicker();
    addonPicker.classList.toggle('hidden', !isHidden);
  });

  document.querySelectorAll('.addon-remove').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var row = btn.closest('.addon-row');
      if (row) row.remove();
      renderAddonPicker();
      recalc();
    });
  });

  var phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function () {
    var d = phoneInput.value.replace(/\D/g, '').slice(0, 10);
    var out = d;
    if (d.length > 6) out = '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
    else if (d.length > 3) out = '(' + d.slice(0, 3) + ') ' + d.slice(3);
    phoneInput.value = out;
  });

  function showPaymentError(message) {
    var el = document.getElementById('payment-error');
    el.textContent = message;
    el.classList.remove('hidden');
  }

  function clearPaymentError() {
    var el = document.getElementById('payment-error');
    el.classList.add('hidden');
    el.textContent = '';
  }

  function setSubmitting(isSubmitting) {
    document.querySelectorAll('[data-cta-label]').forEach(function (btn) {
      btn.disabled = isSubmitting;
      btn.classList.toggle('opacity-60', isSubmitting);
    });
  }

  function showConfirmation(referenceId) {
    var email = document.getElementById('email').value || 'you@email.com';
    document.querySelector('[data-confirm-email]').textContent = email;
    document.querySelector('[data-order-number]').textContent = referenceId || '—';

    if (state.orderType === 'rent') {
      var date = document.getElementById('event-date').value;
      var venue = document.getElementById('event-venue').value;
      document.querySelector('[data-confirm-event]').textContent = (date || 'Your event date') + ' at ' + (venue || 'your selected venue');
    }

    document.body.classList.add('order-placed');
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }

  document.getElementById('checkout-form').addEventListener('submit', function (e) {
    e.preventDefault();
    if (!this.checkValidity()) { this.reportValidity(); return; }

    clearPaymentError();
    setSubmitting(true);

    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    fetch('api/create_order.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderType: state.orderType,
        name: (firstName + ' ' + lastName).trim(),
        email: email,
        phone: phone
      })
    })
      .then(function (res) { return res.json().then(function (data) { return { ok: res.ok, data: data }; }); })
      .then(function (result) {
        if (!result.ok || !result.data.redirect_url) throw new Error((result.data && result.data.error) || 'Could not start payment');
        window.location.href = result.data.redirect_url;
      })
      .catch(function (err) {
        setSubmitting(false);
        showPaymentError(err.message || 'Something went wrong starting payment. Please try again.');
      });
  });

  // BulkPe can take a few seconds to settle a transaction after the browser
  // redirect lands back here — a single immediate check can show "not
  // verified" for a payment that actually succeeded a moment later. Retry a
  // few times with backoff before telling the customer anything failed, so
  // "money deducted but order shows unpaid" resolves itself automatically
  // instead of generating a false failure + a support ticket.
  function verifyReturnFromBulkPe(referenceId, attempt) {
    attempt = attempt || 1;
    var maxAttempts = 6;
    var delays = [0, 3000, 5000, 8000, 12000, 15000]; // ms before this attempt

    setSubmitting(true);
    if (attempt > 1) {
      showPaymentError('Confirming your payment with the bank — this can take a few seconds, please don’t close this page.');
    }

    fetch('api/verify_payment.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reference_id: referenceId })
    })
      .then(function (res) { return res.json(); })
      .then(function (verifyResult) {
        if (verifyResult.verified) {
          setSubmitting(false);
          clearPaymentError();
          showConfirmation(verifyResult.reference_id || referenceId);
        } else if (attempt < maxAttempts) {
          setTimeout(function () { verifyReturnFromBulkPe(referenceId, attempt + 1); }, delays[attempt]);
        } else {
          setSubmitting(false);
          showPaymentError('We couldn’t confirm your payment yet. If money was deducted, it will still be recorded automatically — contact support with reference ' + referenceId + ' if you don’t receive a confirmation email shortly.');
        }
      })
      .catch(function () {
        if (attempt < maxAttempts) {
          setTimeout(function () { verifyReturnFromBulkPe(referenceId, attempt + 1); }, delays[attempt]);
        } else {
          setSubmitting(false);
          showPaymentError('We couldn’t reach our server to confirm your payment. If money was deducted, contact support with reference ' + referenceId + '.');
        }
      });
  }

  var params = new URLSearchParams(window.location.search);
  var initialType = params.get('type') === 'buy' ? 'buy' : 'rent';
  applyOrderType(initialType);

  var returnRef = params.get('ref');
  if (returnRef) {
    verifyReturnFromBulkPe(returnRef);
  }
})();
