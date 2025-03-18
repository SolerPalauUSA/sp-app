// Define the cache name and resources to cache
const cacheName = 'Soler-Palau-App-Data-v11';
const essentialCacheResources = [
  '/sp-app/',
  '/sp-app/index.html',
  '/sp-app/assets/icons/favicon.ico',
  '/sp-app/assets/icons/icon.png',
  '/sp-app/assets/icons/favicon.png',
  '/sp-app/assets/icons/icon-v2.png',
  '/sp-app/assets/icons/icon-v3.png',
  '/sp-app/assets/icons/icon-v4.png',
  '/sp-app/assets/icons/icon-v6.png',
  '/sp-app/assets/images/AR.png',
  '/sp-app/assets/images/blog.svg',
  '/sp-app/assets/images/circle-play-solid.svg',
  '/sp-app/assets/images/events.svg',
  '/sp-app/assets/images/fan-solid.svg',
  '/sp-app/assets/images/fan-white.svg',
  '/sp-app/assets/images/file-pdf-solid.svg',
  '/sp-app/assets/images/GD.png',
  '/sp-app/assets/images/helpcenter.svg',
  '/sp-app/assets/images/home.svg',
  '/sp-app/assets/images/library.svg',
  '/sp-app/assets/images/links-nav.svg',
  '/sp-app/assets/images/links.svg',
  '/sp-app/assets/images/Losone-Select-Ceiling.webp',
  '/sp-app/assets/images/new-branch.svg',
  '/sp-app/assets/images/new-rep.svg',
  '/sp-app/assets/images/optisizer.svg',
  '/sp-app/assets/images/PC.png',
  '/sp-app/assets/images/PCD.png',
  '/sp-app/assets/images/PCLP.png',
  '/sp-app/assets/images/PCV.png',
  '/sp-app/assets/images/print-shop.svg',
  '/sp-app/assets/images/product-returns.svg',
  '/sp-app/assets/images/return-back-button.svg',
  '/sp-app/assets/images/right-left-solid.svg',
  '/sp-app/assets/images/right-left-white.svg',
  '/sp-app/assets/images/search-icon.svg',
  '/sp-app/assets/images/Share-outline-01.svg',
  '/sp-app/assets/images/solidplay-white.svg',
  '/sp-app/assets/images/logo-mb.png',
  '/sp-app/assets/images/ACF-recat.png',
  '/sp-app/assets/images/BGH-recat.png',
  '/sp-app/assets/images/CFD-recat.png',
  '/sp-app/assets/images/CM-recat.png',
  '/sp-app/assets/images/CSF-recat.png',
  '/sp-app/assets/images/CTB-recat.png',
  '/sp-app/assets/images/CWD-recat.png',
  '/sp-app/assets/images/DD-recat.png',
  '/sp-app/assets/images/DEDPV-recat.png',
  '/sp-app/assets/images/DF-recat.png',
  '/sp-app/assets/images/HRE-recat.png',
  '/sp-app/assets/images/HRS-recat.png',
  '/sp-app/assets/images/ifab-recat.png',
  '/sp-app/assets/images/ifft-recat.png',
  '/sp-app/assets/images/KSFV-recat.png',
  '/sp-app/assets/images/L2-recat.png',
  '/sp-app/assets/images/L3-recat.png',
  '/sp-app/assets/images/LCE.png',
  '/sp-app/assets/images/Losone-Select-Inline.webp',
  '/sp-app/assets/images/LPD-recat.png',
  '/sp-app/assets/images/LSF-recat.png',
  '/sp-app/assets/images/MD-recat.png',
  '/sp-app/assets/images/PRF-recat.png',
  '/sp-app/assets/images/PV-recat.png',
  '/sp-app/assets/images/RCXII-recat.png',
  '/sp-app/assets/images/RF8-120EC-Low-Profile.webp',
  '/sp-app/assets/images/RF10-160EC-Full-Size.webp',
  '/sp-app/assets/images/RFV-recat.png',
  '/sp-app/assets/images/RLX-recat.png',
  '/sp-app/assets/images/SDB-recat.png',
  '/sp-app/assets/images/SDBD-recat.png',
  '/sp-app/assets/images/SMXD-recat.png',
  '/sp-app/assets/images/smxdk.webp',
  '/sp-app/assets/images/SQB-recat.png',
  '/sp-app/assets/images/SQD-recat.png',
  '/sp-app/assets/images/STXB-recat.png',
  '/sp-app/assets/images/SWF-recat.png',
  '/sp-app/assets/images/TD-MIXVENT-recat.png',
  '/sp-app/assets/images/TD-SILENT-recat.png',
  '/sp-app/assets/images/TDB-recat.png',
  '/sp-app/assets/images/TDD-recat.png',
  '/sp-app/assets/images/tjfu-recat.png',
  '/sp-app/assets/images/TR-recat.png',
  '/sp-app/assets/images/TRC-recat.png',
  '/sp-app/assets/images/TRe2-recat.png',
  '/sp-app/assets/images/trcen-cat.png',
  '/sp-app/assets/images/TRLPe110_RGB.webp',
  '/sp-app/assets/images/TUB-HT-recat.png',
  '/sp-app/assets/images/UBRD-recat.png',
  '/sp-app/assets/images/UBSRD-recat.png',
  '/sp-app/assets/images/vgd-recat.png',
  '/sp-app/assets/images/loader.gif',
  '/sp-app/assets/css/styles.css',
  '/sp-app/assets/css/cross-ref-style.css',
  '/sp-app/js/main.js',
  '/sp-app/pages/cross-ref.html',
  '/sp-app/pages/library.html',
  '/sp-app/pages/products.html',
  '/sp-app/pages/important-links.html',
  '/sp-app/data/competitors.json',
  '/sp-app/data/cross-references.json',
  '/sp-app/data/documents.json',
  '/sp-app/data/products.json',
  '/sp-app/data/importantLinks.json',
  '/sp-app/components/cross-reference-table.js',
  '/sp-app/components/document-viewer.js',
  '/sp-app/components/navbar.js',
  '/sp-app/components/backButton.js',
  '/sp-app/components/links.js',
  '/sp-app/components/product-list.js',
  '/sp-app/assets/images/DBF-100XC.jpg',
  '/sp-app/assets/images/Tempest-THVLS.png',
  '/sp-app/assets/images/Tornado-THVLS.png',
  '/sp-app/assets/images/UB-recat.png',
  '/sp-app/assets/images/UBS-recat.png'
 

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      

].map(url => encodeURI(url));


// Install event: Cache essential resources when the service worker is installed
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        const cachePromises = essentialCacheResources.map(url => {
          return fetch(url).then(response => {
            if (response.ok) {
              return cache.put(url, response);
            } else {
              console.warn(`URL ${url} returned status ${response.status}`);
            }
          }).catch(error => {
            console.warn(`No response received for ${url}:`, error.message);
          });
        });
        return Promise.all(cachePromises);
      })
  );
  
  // Update the service worker immediately after installation
  self.skipWaiting();
});

// Activate event: Clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((oldCacheName) => {
          return oldCacheName !== cacheName;
        }).map((oldCacheName) => {
          return caches.delete(oldCacheName);
        })
      );
    }).then(() => {
      return self.clients.claim();
    }).then(() => {
      // Send message to clients to trigger refresh
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ action: 'refreshContent' });
        });
      });
    })
  );
});

// Update event: Force the waiting service worker to become the active service worker
self.addEventListener('message', event => {
  if (event.data.action === 'refreshContent') {
      self.skipWaiting();
  }
});

// Update the service worker periodically
setInterval(() => {
  self.registration.update();
}, 24 * 60 * 60 * 1000); // Check for updates every 24 hours