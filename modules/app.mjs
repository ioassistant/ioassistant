import { config } from './config.mjs';
import { x } from './xscript.mjs';
import { utils } from './utils.mjs';
import { tpl } from './tpl.mjs';


(function ($) {

    $.fn.downCount = function (options, callback) {
        var settings = $.extend({
                date: null,
                offset: null
            }, options);

        // Throw error if date is not set
        if (!settings.date) {
            return //console.error('countdown date not set')
        }

        // Throw error if date is set incorectly
        if (!Date.parse(settings.date)) {
            $.error('Incorrect date format, it should look like this, 12/24/2012 12:00:00.');
        }

        // Save container
        var container = this;
        var currentDate = function () {
            // get client's current date
            var date = new Date();

            // turn date to utc
            var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

            // set new Date object
            var new_date = new Date(utc + (3600000*settings.offset))

            return new_date;
        };

        /**
         * Main downCount function that calculates everything
         */
        function countdown () {
            var target_date = new Date(settings.date), // set target date
                current_date = currentDate(); // get fixed current date

            // difference of dates
            var difference = target_date - current_date;

            // if difference is negative than it's pass the target date
            if (difference < 0) {
                // stop timer
                clearInterval(interval);

                if (callback && typeof callback === 'function') callback();

                return;
            }

            // basic math variables
            var _second = 1000,
                _minute = _second * 60,
                _hour = _minute * 60,
                _day = _hour * 24;

            // calculate dates
            var days = Math.floor(difference / _day),
                hours = Math.floor((difference % _day) / _hour),
                minutes = Math.floor((difference % _hour) / _minute),
                seconds = Math.floor((difference % _minute) / _second);

                // fix dates so that it will show two digets
                days = (String(days).length >= 2) ? days : '0' + days;
                hours = (String(hours).length >= 2) ? hours : '0' + hours;
                minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
                seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

            // based on the date change the refrence wording
            var ref_days = (days === 1) ? 'day' : 'days',
                ref_hours = (hours === 1) ? 'hour' : 'hours',
                ref_minutes = (minutes === 1) ? 'minute' : 'minutes',
                ref_seconds = (seconds === 1) ? 'second' : 'seconds';

            // set to DOM
            container.find('.days').text(days);
            container.find('.hours').text(hours);
            container.find('.minutes').text(minutes);
            container.find('.seconds').text(seconds);

            container.find('.days_ref').text(ref_days);
            container.find('.hours_ref').text(ref_hours);
            container.find('.minutes_ref').text(ref_minutes);
            container.find('.seconds_ref').text(ref_seconds);
        };

        // start
        var interval = setInterval(countdown, 300);
    };

})(jQuery);









//beta/subscribe



$(document).ready(function(){

  if(location.href === config.baseurl || !location.href.includes('404')){


    var countdown = $(".countdown");
    countdown.downCount({
        date: config.downCount.finish,
        offset: config.downCount.utc
    }, function(){
        console.log(config.downCount.finish_message);
    });

    let beta = document.getElementById('beta-btn'),
    news = document.getElementById('news-btn');

    beta.onclick = function(){
      utils.addSubscribe('beta');
    }

    news.onclick = function(){
      utils.addSubscribe('news');
    }

  } else if(location.pathname === config.subscriptionurl){


    function subscription(){
      let obj = {},
      txtlg = document.getElementById('txt-lg'),
      txtsm = document.getElementById('txt-sm'),
      txtbtn = document.getElementById('txt-btn');

      location.search.slice(1).split('&').forEach(function(y){
        y = y.split('=');
        if(y[0] === 'sel'){
          y[1] = JSON.parse(y[1])
        }
        obj[y[0]] = y[1];
      });

      if(typeof obj.sel === 'boolean' && obj.type && obj.id){

        utils.postData(JSON.stringify({email: obj.id, sel: obj.sel, type: obj.type}), 'confirm', function(err,res){
          txtbtn.classList.remove('hidden');
          if(err || res.code > 200){
            txtlg.textContent = 'ERROR';
            if(res.code > 200){
              return txtsm.textContent = res.msg;
            }

            txtsm.textContent = 'failed to post data';
            return;
          }

          txtlg.textContent = 'DONE';
          return txtsm.textContent = res.msg;
        })

      }
    }

    subscription()
  } else {

    document.body.append(
      tpl.appPre(),
      tpl.base404()
    )
  }

  particlesJS('particle', config.particle);

});

void function init() {
  //google analytics
  if(config.google.active){
    let args = ['js', new Date(),'config', config.google.analytics]
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(...args)
  }

  //tawkto
  if(config.tawk.active){
    if(typeof Tawk_API === 'undefined'){
      window.Tawk_API = {};
    }
    window.Tawk_LoadStart = new Date();

    document.body.append(x('script', {
      src: [config.tawk.url,config.tawk.api].join('/'),
      charset: 'UTF-8',
      crossorigin: '*',
      defer: ''
    }));
  }

}();
