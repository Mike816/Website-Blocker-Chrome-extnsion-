document.addEventListener('DOMContentLoaded', () => {
    const websiteInput = document.getElementById('websiteInput');
    const blockBtn = document.getElementById('blockBtn');
    const blockedWebsitesList = document.getElementById('blockedWebsites');
  
    function updateUI(websites) {
      blockedWebsitesList.innerHTML = '';
      websites.forEach((website, index) => {
        const li = document.createElement('li');
        li.textContent = website;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
          websites.splice(index, 1);
          chrome.storage.sync.set({ blockedWebsites: websites }, () => {
            updateUI(websites);
          });
        });
        li.appendChild(removeBtn);
        blockedWebsitesList.appendChild(li);
      });
    }
  
    chrome.storage.sync.get(['blockedWebsites'], (data) => {
      const blockedWebsites = data.blockedWebsites || [];
      updateUI(blockedWebsites);
    });
  
    blockBtn.addEventListener('click', () => {
      const website = websiteInput.value.trim();
      chrome.storage.sync.get(['blockedWebsites'], (data) => {
        const blockedWebsites = data.blockedWebsites || [];
        blockedWebsites.push(website);
        chrome.storage.sync.set({ blockedWebsites }, () => {
          updateUI(blockedWebsites);
        });
      });
    });
  });
  