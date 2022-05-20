let switches = document.getElementsByName('switch');
let slider = document.getElementById("slider");
let html = document.querySelector('html');
let schema = html.getAttribute('schema');

function changeColor(e) {
  e.preventDefault();
  const {target} = e;
  schema = target.value;
  slider.style = 'transform: translateX(' + target.dataset.location + ')'
  html.setAttribute('schema', schema);
  if(typeof(myChart) !== 'undefined') {
    myChart.destroy();
    graficos();
  }
}

switches.forEach(item =>{
  item.addEventListener('change', changeColor)
})