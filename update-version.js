const fs = require('fs');
const path = require('path');

const updateVersionJsonPath = path.join(__dirname, 'app', 'update-version.json');
const packageJsonPath = path.join(__dirname, 'package.json');

try {
  const data = require(updateVersionJsonPath);
  const {version} = require(packageJsonPath);

  fs.writeFileSync(updateVersionJsonPath, JSON.stringify({...data, version}));

} catch (e) {
  console.log('Error:', e && e.message);
  process.exit(1);
}