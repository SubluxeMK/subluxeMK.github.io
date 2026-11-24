// Client-side filter for the story feed: typing in the header search
// narrows the visible stories by title and excerpt. No data leaves the page.
(function () {
  var input = document.getElementById('site-search');
  if (!input) return;
  var stories = Array.prototype.slice.call(document.querySelectorAll('.story'));
  if (!stories.length) { input.disabled = true; return; }
  var noResults = document.querySelector('.no-results');
  input.addEventListener('input', function () {
    var q = input.value.trim().toLowerCase();
    var visible = 0;
    stories.forEach(function (story) {
      var haystack = (story.getAttribute('data-title') || '') + ' ' + (story.getAttribute('data-text') || '');
      var show = !q || haystack.indexOf(q) !== -1;
      story.style.display = show ? '' : 'none';
      if (show) visible++;
    });
    if (noResults) noResults.hidden = visible !== 0;
  });
})();
