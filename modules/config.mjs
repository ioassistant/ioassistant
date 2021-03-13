
const config = {
  fetchurl: 'https://ioassistant.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json'
  },
  recaptcha: '6LcKrHsaAAAAAFCXLdVeXKr_0kqh3rzkX-Il0y_W',
  tawk: {
    active: true,
    url: 'https://embed.tawk.to',
    api: '604ab4ae385de407571f3cab/1f0ht3ivf'
  },
  google: {
    active: true,
    analytics: 'G-7RR7D8P366'
  },
  downCount: {
    finish: '07/29/2021 12:00:00'
  }
}

if(location.href.includes('localhost')){
  config.fetchurl = 'http://localhost:8080/';
}

export { config }
