const $ = selector => document.querySelector(selector);
const host = window.location.protocol + '//' + window.location.host;
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fillTable() {
  let infoVacunas = await fetchData('./data/vacunas.json');
  let tbody = $('tbody');
  let html = '';
  infoVacunas.forEach((vacuna) => {
    let departamento = vacuna.departamento;
    let dosisAsignadas = Intl.NumberFormat('es-Co').format(vacuna.dosisAsignadas);
    let dosisAplicadas = Intl.NumberFormat('es-Co').format(vacuna.dosisAplicadas.total);
    let porcentajeEntregadas = (vacuna.dosisAplicadas.total) / vacuna.dosisAsignadas;
    porcentajeEntregadas = Intl.NumberFormat('es-CO', { style: 'percent', maximumFractionDigits: 2 }).format(porcentajeEntregadas);
    let poblacionPrimeraDosis = (parseFloat(vacuna.cobertura.primeraDosis));
    poblacionPrimeraDosis = Intl.NumberFormat('es-CO', { style: 'percent', maximumFractionDigits: 2 }).format(poblacionPrimeraDosis);
    let pautaCompleta = Intl.NumberFormat('es-CO').format(vacuna.pautaCompleta);
    let totalmenteVacunada = Intl.NumberFormat('es-CO', { style: 'percent', maximumFractionDigits: 2 }).format(vacuna.cobertura.esquemaCompleto);
    html += `
        <tr>
          <td>${departamento}</td>
          <td>${dosisAsignadas}</td>
          <td>${dosisAplicadas}</td>
          <td>${porcentajeEntregadas}</td>
          <td>${poblacionPrimeraDosis}</td>
          <td>${pautaCompleta}</td>
          <td>${totalmenteVacunada}</td>
        </tr>
      `;
  });
  console.log(html);
}

async function cards() {
  const infoVacunas = await fetchData('./data/vacunas.json');
  const infoLabs = await fetchData('./data/laboratorios.json');
  
  let dosisDistribuidas = infoVacunas.reduce((acc, vacuna) => {
    return acc + vacuna.dosisAsignadas;
  }, 0);
  let dosisAplicadas = infoVacunas.reduce((acc, vacuna) => {
    return acc + vacuna.dosisAplicadas.total;
  }, 0);
  let porcentajeEntregadas = (dosisAplicadas) / dosisDistribuidas;
  let personasUnaDosis = infoVacunas.reduce((acc, vacuna) => {
    return acc + vacuna.primeraDosis;
  }, 0);
  let personasConEsquemaCompleto = infoVacunas.reduce((acc, vacuna) => {
    return acc + vacuna.pautaCompleta;
  }, 0);
  let porcentajeAdministradas = (personasConEsquemaCompleto) / dosisAplicadas;


  personasUnaDosis = Intl.NumberFormat('es-CO').format(personasUnaDosis);
  personasConEsquemaCompleto = Intl.NumberFormat('es-CO').format(personasConEsquemaCompleto);
  dosisDistribuidas = Intl.NumberFormat('es-Co').format(dosisDistribuidas);
  dosisAplicadas = Intl.NumberFormat('es-Co').format(dosisAplicadas);
  porcentajeEntregadas = Intl.NumberFormat('es-CO', { style: 'percent', maximumFractionDigits: 2 }).format(porcentajeEntregadas);
  porcentajeAdministradas = Intl.NumberFormat('es-CO', { style: 'percent', maximumFractionDigits: 2 }).format(porcentajeAdministradas);

  let smalls = ``

  infoLabs.forEach((lab) => {
    let labDosis = Intl.NumberFormat('es-Co').format(lab.dosisAsignadas);
    smalls += `
      <small>
        <span>
        <figure>
          <img src="./public/images/${lab.laboratorio.toLowerCase()}-logo.webp"/>
        </figure>
        </span>
        <span>${labDosis}</span>
      </small>
      `
  });
  const htmlCard1 = `
    <div class="card">          
      <section class="body_card">
        <div>
          <h2 class="card_title">Dosis distribuidas</h2>
          <h4>${dosisDistribuidas}</h4>
        </div>
        <div>
          ${smalls}
        </div>
      </section>
    </div>`;

  const htmlCard2 = `
  <div class="card">
    <section class="body_card">
      <h2 class="card_title">Dosis Administradas</h2>
      <h4>${dosisAplicadas}</h4>
      <span>% sobre distribuidas</span>
      <h4>${porcentajeEntregadas}</h4>
      <h2 class="card_title">Personas con al menos una dosis</h2>
      <h4>${personasUnaDosis}</h4>
    </section>
  </div>`;
  const htmlCard3 = `
  <div class="card">
    <section class="body_card">
      <div>
        <h2 class="card_title">Personas con esquema completo</h2>
        <h4>${personasConEsquemaCompleto}</h4>
        <span>% sobre administradas</span>
        <h4>${porcentajeAdministradas}</h4>
      </div>
    </section>
  </div>`;

console.log(htmlCard1);
console.log(htmlCard2);
console.log(htmlCard3);
}

async function graficos() {
  const infoAsignadasVsAplicadas = await fetchData('./data/aplicadasVsAsignadas.json');
  let fields = [];
  let dataAsignadas = [];
  let dataAplicadas = [];
  infoAsignadasVsAplicadas.forEach((vacuna, index) => {
    // if (index%2 === 0) {
    fields.push(new Date(vacuna.fecha).toLocaleDateString('es-CO'))
    dataAsignadas.push(vacuna.dosisAsignadas);
    dataAplicadas.push(vacuna.dosisAplicadas);
    // }
  });
  // Chart.defaults.global.defaultFontSize = 20;
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: fields.map((label) => {
        return label.split('/').slice(0, 2).join('/');
      }),
      datasets: [{
        label: 'Dosis aplicadas',
        data: dataAplicadas,
        fill: true,
        backgroundColor: [
          'rgba(0, 255, 78, 1)'
        ],
        borderColor: [
          'rgba(255, 255, 255, 1)'
        ],
        borderWidth: 2
      }, {
        label: 'Dosis asignadas',
        fill: true,
        cubicInterpolationMode: 'monotone',
        data: dataAsignadas,
        backgroundColor: [
          'rgb(7, 56, 235, 0.5)'
        ],
        borderColor: [
          'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      elements: {
        point: {
          radius: 2,
        }
      },
      plugins: {
        tooltip: {
          displayColors: false,
          intersect: false,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          titleColor: '#000',
          titleFont:{
            weight: 'bold',
          },
          usePointStyle: true,
          titleSpacing: 10,
          bodyColor: '#000',
          bodyFont:{
            weight: 'bold',
            family: 'Cascadia Code PL, Arial, sans-serif',
          },
          borderColor: '#000',
          borderWidth: 1,
          mode: 'index',
          position: 'nearest',
          padding: 15,
          xAlign: 'center',
          yAlign: 'bottom',
          callbacks: {
            label: function (context) {
              let index = context.dataIndex;
              let dosisAplicadas = Intl.NumberFormat('es-CO').format(dataAplicadas[index]);
              let dosisAsignadas = Intl.NumberFormat('es-CO').format(dataAsignadas[index]);
              let fecha = new Date(fields[index].split('/').reverse().join('/'))
              let msj = ''
              if (context.dataset.label === 'Dosis asignadas') {
                msj = `A dia ${fecha.getDate()} del mes ${fecha.getMonth() + 1} se han asignado ${dosisAsignadas} dosis y aplicados ${dosisAplicadas} dosis`;
              }
              return msj;
            },
            title: function (context) {
              let index = context[1].dataIndex;
              let fecha = new Date(fields[index].split('/').reverse().join('/'))
              return `Fecha ${fecha.toLocaleDateString('es-CO')}`;
            }            
          }
        }
      },
      scales: {
          myScale: {
            type: 'linear',
            position: 'right',
            ticks: {
              beginAtZero: true,
              font:{
                weight: 'bold',
                family: 'Cascadia Code PL, Arial, sans-serif',              
              }
            },
            grid : {
              display: 1,
            }
          },
          x:{
            ticks: {
              font:{
                weight: 'bold',
                size: 13,
              },
              maxRotation: 90,
              maxTicksLimit: 30,
            }
          }
      }
    }
  });
}

fillTable()
cards()
graficos();

