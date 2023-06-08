chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === 'searchBookmarks') {
    searchBookmarks(message.query, sendResponse);
    return true;
  }
});

function searchBookmarks(query, sendResponse) {
  chrome.bookmarks.search(query, function(results) {
    var bookmarks = results.map(function(result) {
      return {
        url: result.url,
        title: result.title
      };
    });
    sendResponse(bookmarks);
  });
}
