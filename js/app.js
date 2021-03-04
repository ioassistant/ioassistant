let toTop = document.getElementsByClassName('link-to-top')[0]


function debounce(func, wait, immediate) {
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
}

window.addEventListener('scroll', debounce(function(evt){
   let top = window.pageYOffset || document.scrollTop;
   if(top === NaN || !top){
     toTop.classList.add('hidden');
   } else if(toTop.classList.contains('hidden')){
     toTop.classList.remove('hidden');
   }
   top = null;
   return;
}, 250))
