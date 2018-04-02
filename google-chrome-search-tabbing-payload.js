(function () {
  var activeLinks = Array.prototype.filter.call(document.querySelectorAll('h3.r a'), function (el) {
    return el;
  });

  if (activeLinks.length === 0) {
    return;
  }

  var keyCodes = {
    38: 'previous', // down
    9: 'next',      // tab
    40: 'next'      // up
  };
  var activeStyles = 'font-weight: bold;';

  function addStylesToActiveLinks() {
    document.activeElement.style.cssText += activeStyles;
  }

  function removeStylesFromActiveLinks() {
    activeLinks.forEach(function (activeLink) {
      activeLink.style.cssText = activeLink.style.cssText.replace(activeStyles, '');
    });
  }

  function goToResult(direction) {
    var indexOfActiveLink = activeLinks.indexOf(document.activeElement);
    var previousIndex = indexOfActiveLink - 1 < 0 ? activeLinks.length - 1 : indexOfActiveLink - 1;
    var nextIndex = indexOfActiveLink + 1 > activeLinks.length - 1 ? 0 : indexOfActiveLink + 1;
    var indexToGoTo = direction === 'next' ? nextIndex : previousIndex;

    removeStylesFromActiveLinks();
    activeLinks[indexToGoTo].focus();
    addStylesToActiveLinks();
  }

  window.addEventListener('keydown', function (e) {
    if (keyCodes.hasOwnProperty(e.keyCode)) {
      e.preventDefault();
      goToResult(keyCodes[e.keyCode]);
    }
  });
})();
