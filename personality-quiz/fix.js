import fs from 'fs';

let content = fs.readFileSync('src/data/questions.ts', 'utf8');

// Replace any '1' in the scores object with '0'
// specifically matching pattern like `red: 1`, `yellow: 1`, `green: 1`, `blue: 1`
content = content.replace(/red: 1/g, 'red: 0');
content = content.replace(/yellow: 1/g, 'yellow: 0');
content = content.replace(/green: 1/g, 'green: 0');
content = content.replace(/blue: 1/g, 'blue: 0');

fs.writeFileSync('src/data/questions.ts', content);
console.log("Fixed scores!");
