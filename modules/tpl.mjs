import { config } from './config.mjs';
import { x } from './xscript.mjs';
import { utils } from './utils.mjs';

const tpl = {
  appTop(){

  },
  appPre(){

    let item = x('app-pre',
      x('div', {class: 'page-loader'},
        x('div', {class: 'loader'},'Loading...')
      ),
      x('img', {src: 'images/bg.jpg', id: 'para'}),
      x('div', {src: 'images/bg.jpg', id: 'particle'}),
      x('a', {href: '#main', class: 'btn skip-to-content'}, 'Skip to Content')
    )

    return item;
  },
  nav(){

  },
  base404(){

    return x('div', {class: 'page', id: 'top'},
      tpl.nav404(),
      tpl.main404(),
      tpl.footer()
    );

  },
  toTop(){

    let item = x('a', {href: '#top', class: 'link-to-top hidden'},
      x('i', {class: 'fa fa-chevron-up'})
    )

    window.addEventListener('scroll', utils.debounce(function(evt){

       let top = window.pageYOffset || document.scrollTop;
       if(top === NaN || !top){
         item.classList.add('hidden');
       } else if(item.classList.contains('hidden')){
         item.classList.remove('hidden');
       }
       top = null;
       return;
    }, 250))

    return  x('div', {class: 'local-scroll'},item);
  },
  footer(){

    let item = x('footer', {class: 'page-section bg-gray-lighter footer pb-60'},
      x('div', {class: 'container'},
        x('div', {class: 'local-scroll mb-30 wow fadeInUp', 'data-wow-duration': '1.2s'},
          x('a', {href: '#top'},
            x('span', {class: 'b-logo'}, 'IOASSISTANT')
          )
        ),
        function(){
          let ele = x('div', {class: 'footer-social-links mb-110 mb-xs-60'}),
          arr = ['facebook', 'twitter', 'youtube'];

          for (let i = 0; i < arr.length; i++) {
            ele.append(x('a', {href: config.social[arr[i]], title: arr[i], target: '_blank'},
              x('i', {class: 'fa fa-'+ arr[i]})
            ))
          }

          return ele;
        },
        x('div', {class: 'footer-text'},
          x('div', {class: 'footer-copy font-alt'},
              '&copy; ', x('a', {href: config.nomatecurl, target: '_blank'}, 'Nomatec Labs'), ' 2021.'
          ),
          x('div', {class: 'footer-made'}, 'Created by Nomatec Labs.'),
          x('div', {class: 'atom-lnks'},
            x('a', {href: config.atom.support, class: 'atom-lnk', target: '_blank'}, 'Support Feed'),
            ' / ',
            x('a', {href: config.atom.news, class: 'atom-lnk', target: '_blank'}, 'News Feed')
          )
        )
      ),
      tpl.toTop()
    )

    console.log(item)
    return item;

  },
  nav404(){

    let item = x('nav', {class: 'main-nav dark stick-fixed js-transparent transparent'},
      x('div', {class: 'full-wrapper relative clearfix'},
        x('div', {class: 'nav-logo-wrap local-scroll'},
          x('span', {class: 'logo'}, 'IOASSISTANT')
        ),
        x('div', {class: 'mobile-nav', role: 'button', tabindex: '0'},
          x('i', {class: 'fa fa-bars'})
        ),
        x('div', {class: 'inner-nav desktop-nav'},
          x('ul', {class: 'mt-30 clearlist scroll-nav local-scroll'},
            x('li',
              x('a', {href: 'mailto:'+ config.email.contact},
                x('i', {class: 'fa fa-envelope'}),
                config.email.contact
              )
            ),
            x('li',
              x('a', {href: '#'},
                x('i', {class: 'fa fa-phone'}),
                config.number
              )
            )
          )
        )
      )
    )

    return item;

  },
  main404(){

    let item = x('main', {id: 'main'},
      x('section', {class: 'home-section bg-dark-alfa-50'},
        x('div', {class: 'js-height-full'},
          x('div', {class: 'home-content container'},
            x('div', {class: 'home-text'},
              x('div', {class: 'hs-cont'},
                x('div', {class: 'hs-wrap'},
                  x('div', {class: 'hs-line-13 font-alt mb-10'},'404'),
                  x('div', {class: 'hs-line-4 font-alt mb-40'},'The page you were looking for could not be found.'),
                  x('div', {class: 'local-scroll'},
                    x('a', {
                      href: config.baseurl,
                      class: 'btn btn-mod btn-w btn-round btn-small subsc'
                    },'Back To Home Page')
                  )
                )
              )
            )
          )
        )
      )
    )
    return item;
  }
}

export { tpl }
