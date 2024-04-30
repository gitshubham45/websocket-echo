const path = require('path');

module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'websocket', // Use a unique name
    resolve: path.resolve(__dirname, '../src/middlewares/websocket/index'), // Path to the middleware folder
  },
];
