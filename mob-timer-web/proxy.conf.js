const PROXY_CONFIG = [
  {
    context: ['/mob-programming/api'],
    target: 'http://localhost:8080',
    secure: false,
  },
];

module.exports = PROXY_CONFIG;
