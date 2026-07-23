const fs = require('fs');
const https = require('https');

const EASYLIST_URL = 'https://easylist.to/easylist/easylist.txt';
const MAX_RULES = 15000;

https.get(EASYLIST_URL, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const lines = data.split('\n');
    const rules = [];
    let id = 1;

    for (const line of lines) {
      const trimmed = line.trim();
      const match = trimmed.match(/^\|\|([a-zA-Z0-9.-]+)\^(\$.*)?$/);
      if (match && !trimmed.includes('@@') && id <= MAX_RULES) {
        rules.push({
          id: id++,
          priority: 1,
          action: { type: 'block' },
          condition: {
            urlFilter: match[1],
            resourceTypes: ['script', 'image', 'xmlhttprequest', 'sub_frame', 'media']
          }
        });
      }
    }

    fs.writeFileSync('rules.json', JSON.stringify(rules, null, 2));
    console.log(`Done. Generated ${rules.length} rules into rules.json`);
  });
}).on('error', err => console.error('Download failed:', err.message));
