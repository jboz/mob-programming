const PROXY_CONFIG = [
  {
    context: ['/mob-programming/api'],
    target: 'http://mob.localhost',
    secure: false
  }
];

module.exports = PROXY_CONFIG;
