(function () {
  var groups = { type: 'all', event: 'all' };
  var chips = document.querySelectorAll('.filter-chip');
  var cards = document.querySelectorAll('#product-grid article');
  var noResults = document.getElementById('no-results');

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var group = chip.getAttribute('data-filter-group');
      groups[group] = chip.getAttribute('data-filter');
      document.querySelectorAll('.filter-chip[data-filter-group="' + group + '"]').forEach(function (c) {
        c.classList.remove('active');
      });
      chip.classList.add('active');
      applyFilters();
    });
  });

  function applyFilters() {
    var visibleCount = 0;
    cards.forEach(function (card) {
      var typeMatch = groups.type === 'all' || card.getAttribute('data-type') === groups.type;
      var eventMatch = groups.event === 'all' || (card.getAttribute('data-event') || '').indexOf(groups.event) !== -1;
      var show = typeMatch && eventMatch;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });
    noResults.classList.toggle('hidden', visibleCount !== 0);
  }
})();
