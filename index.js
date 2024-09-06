const fs = require('fs');
const push = require('./fetch-events/push');
const clear = require('./fetch-events/clear');

clear();
const myData = require('./data.json');
push('NTTrinh2003', myData);
fs.writeFileSync('./data.json', JSON.stringify(myData, null, 2));
