let switches = document.getElementsByName('switch');
let slider = document.getElementById("slider");
let html = document.querySelector('html');
let schema;

if (localStorage.getItem('schema') === null) {
  localStorage.setItem('schema', 'light-mode');
  schema = localStorage.getItem('schema');
  html.setAttribute('schema', schema);  
  initSlider(slider, schema);
}else{
  schema = localStorage.getItem('schema');
  html.setAttribute('schema', schema);
  initSlider(slider, schema);
}

function changeColor(e) {
  e.preventDefault();
  const {target} = e;
  schema = target.value;
  slider.style = 'transform: translateX(' + target.dataset.location + ')'
  html.setAttribute('schema', schema);
  localStorage.setItem('schema', schema);
  if(typeof(myChart) !== 'undefined') {
    myChart.destroy();
    graficos();
  }
}
switches.forEach(item =>{
  item.addEventListener('change', changeColor)
})

function initSlider(slider, schema) {
  if(schema==='light-mode'){
    slider.style = 'transform: translateX(0)'
  }else{
    slider.style = 'transform: translateX(100%)'
  }
}

let colorSwitch = document.getElementsByClassName('color_switch')[0];
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  if (scrollTop > 60){
    colorSwitch.style = 'top: 5px'
  }else{
    colorSwitch.style = 'top: 76px'
  }
})