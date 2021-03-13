
const config = {
  baseurl: 'https://www.ioassistant.com/',
  fetchurl: 'https://ioassistant.herokuapp.com/',
  subscriptionurl: '/api/subscription',
  local: 'http://localhost:8080/',
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
    finish: '07/29/2021 12:00:00',
    utc: '2',
    finish_message: 'app complete!'
  },
  particle: {
      particles: {
        number: {
          value: 300,
          density: {
            enable: true,
            value_area: 1800
          }
        },
        color: {
          value: '#ddd'
        },
        shape: {
          type: '',
          random: true,
          stroke: {
            width: 0,
            color: 'red'
          },
          polygon: {
            nb_sides: 6
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 80,
          random: true,
          anim: {
            enable: true,
            speed_min: .2,
            size_min: 2,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 200,
          color: '#ddd',
          opacity: .3,
          width: .6
        },
        move: {
          enable: true,
          speed_min: 6,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 1200,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: false,
            mode: 'grab'
          },
          onclick: {
            enable: false,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1
            }
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    }
}

if(location.href.includes('localhost')){
  config.fetchurl = config.local;
}

export { config }
