const fs = require('fs');
const path = require('path');

const cacheDir = path.join(__dirname, '.parcel-cache');

function clearCache() {
  try {
    fs.rmSync(cacheDir, { recursive: true, force: true });
    console.log('Parcel cache cleared.');
  } catch (err) {
    console.error('Error clearing Parcel cache:', err);
  }
}

setInterval(clearCache, 5000);
