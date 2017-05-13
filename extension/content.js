// Listen for Web Bluetooth Requests
window.addEventListener('message', event => {
    if (event.source === window && event.data && event.data.type === 'WebBluetoothPolyPageToCS') {
        chrome.runtime.sendMessage(event.data, response => {
            window.postMessage(Object.assign(response, {
                type: 'WebBluetoothPolyCSToPage',
                id: event.data.id,
            }), event.origin);
        });
    }
}, false);

// Inject the Polyfill

var script = document.createElement('script');
script.src = chrome.extension.getURL('polyfill.js');
document.head.appendChild(script);

