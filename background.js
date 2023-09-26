let blockedDomains = ["example.com", "another-example.com"]; // List of domains to block

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return {cancel: blockedDomains.some(domain => details.url.includes(domain))};
  },
  {urls: ["<all_urls>"]},
  ["blocking"]
);
