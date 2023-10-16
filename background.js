chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ blockedWebsites: [] });
  });
  
  chrome.webNavigation.onBeforeNavigate.addListener((details) => {
    chrome.storage.sync.get(['blockedWebsites'], (data) => {
      const blockedWebsites = data.blockedWebsites || [];
      const currentURL = new URL(details.url);
      if (blockedWebsites.includes(currentURL.hostname)) {
        chrome.tabs.update(details.tabId, { url: chrome.runtime.getURL('flame.html') });
      }
    });
  }, {url: [{schemes: ['http', 'https']}],});
  