const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

console.log("ENV Path:", path.resolve(__dirname, '../.env'));
console.log("Key defined:", !!process.env.OPENAI_API_KEY);
console.log("Key length:", process.env.OPENAI_API_KEY?.length);
