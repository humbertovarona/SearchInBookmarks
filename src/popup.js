document.addEventListener('DOMContentLoaded', function() {
  var searchBox = document.getElementById('searchBox');
  var bookmarkList = document.getElementById('bookmarkList');

  searchBox.addEventListener('input', updateBookmarkList);

  bookmarkList.addEventListener('change', loadWebsite);

  chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
    bookmarkTreeNodes.forEach(processNode);
  });

  function processNode(node) {
    if (node.url) {
      var option = document.createElement('option');
      option.value = node.url;
      option.text = node.title;
      bookmarkList.appendChild(option);
    }
    if (node.children) {
      node.children.forEach(processNode);
    }
  }

  function updateBookmarkList() {
    var query = searchBox.value.toLowerCase();
    var options = bookmarkList.options;
    for (var i = 0; i < options.length; i++) {
      var option = options[i];
      if (option.text.toLowerCase().indexOf(query) > -1) {
        option.style.display = '';
      } else {
        option.style.display = 'none';
      }
    }
  }

  function loadWebsite() {
    var selectedOption = bookmarkList.options[bookmarkList.selectedIndex];
    var url = selectedOption.value;
    chrome.tabs.create({ url: url });
  }
});
