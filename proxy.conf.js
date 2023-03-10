const PROXY_CONFIG = {
    '/api/v2': {
      target: 'https://pokeapi.co',
      secure: false,
      changeOrigin: true,
    },
  }
  
module.exports = PROXY_CONFIG