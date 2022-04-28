button = document.querySelector('#toggle')
menu = document.querySelector('.menu')
button.addEventListener('click', () => {
  if (button.classList.contains('active')) {
    button.classList.remove('active')
    menu.style.height = '0'
    enableScroll()
  } else {
    button.classList.add('active')
    menu.style.height = '100%'
    disableScroll()
  }
})

window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) {
    menu.style.height = '100%'
    button.classList.remove('active')
  }
  if (window.innerWidth < 768) {
    menu.style.height = '0'
    button.classList.remove('active')
  }
})

function disableScroll() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  window.onscroll = function () {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

function enableScroll() {
  window.onscroll = function () { };
}

window.onload = () =>{
  if(window.location.href.includes('index.html')){
    window.history.pushState(null, null, './');
  }else if (window.location.href.includes('departamentos.html')){
    window.history.pushState(null, null, './departamentos');
  }else if (window.location.href.includes('grafico.html')){
    window.history.pushState(null, null, './grafico');
  }
}