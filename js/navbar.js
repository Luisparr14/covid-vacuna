button = document.querySelector('#toggle')
menu = document.querySelector('.menu')
button.addEventListener('click', () => {
  if (button.classList.contains('active')) {
    button.classList.remove('active')
    menu.style.height = '0'
  } else {
    button.classList.add('active')
    menu.style.height = '100%'
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