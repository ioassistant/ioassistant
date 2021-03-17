import { config } from './config.mjs';
import { ls } from './storage.mjs';

const utils = {
  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      let context = this, args = arguments,
      later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      },
      callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow){
        func.apply(context, args);
      }
    }
  },
  postData(data, dest, cb){

    fetch(config.fetchurl +'api/'+ dest, {
      method: 'POST',
      mode: 'cors',
      headers: config.headers,
      body: data
    })
    .then(function(res){

      if(res.status > 199 && res.status < 300){
        return res.json().then(function(data){
          cb(false, data);
        });
      }

      throw res.status
    })
    .catch(function(err){
      cb(err)
    });

  },
  addSubscribe(y){

    ls.set(y, 0)

    let ele = document.getElementById(y +'-inp'),
    dest = document.getElementById(y +'-result'),
    val = ele.value;

      if(val && !ls.get(y)){

        grecaptcha.ready(function() {
          grecaptcha.execute(config.recaptcha, {action: 'submit'}).then(function(token) {

              utils.postData(JSON.stringify({email: val, sel: y, tk: token}), 'subscribe',function(err,res){
                if(err || res.code > 200){
                  dest.classList.remove('lime');
                  dest.classList.add('red');
                  if(res.code > 200){
                    return dest.textContent = res.msg;
                  }
                  return dest.textContent = 'failed to post data';
                }

                ls.set(y, 1);
                console.log(y +' success')
                dest.classList.remove('red');
                dest.classList.add('lime');
                return dest.textContent = res.msg;
              })

          });
        });


    } else {

      dest.classList.remove('lime');
      dest.classList.add('red');

      if(ls.get(y)){
        return dest.textContent = 'email already subscribed'
      }
      return dest.textContent = 'invalid data'
    }

  },
  is_email(email){
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
     return true;
    }
    return false;
  }
}

export { utils }
