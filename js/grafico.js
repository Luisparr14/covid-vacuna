const $ = selector => document.querySelector(selector);
const host = window.location.protocol + '//' + window.location.host;
console.log(schema);
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function graficos() {
  const infoAsignadasVsAplicadas = await fetchData('./data/aplicadasVsAsignadas.json');
  let fields = [];
  let dataAsignadas = [];
  let dataAplicadas = [];
  infoAsignadasVsAplicadas.forEach((vacuna, index) => {
    fields.push(new Date(vacuna.fecha).toLocaleDateString('es-CO'))
    dataAsignadas.push(vacuna.dosisAsignadas);
    dataAplicadas.push(vacuna.dosisAplicadas);
  });
  const ctx = document.getElementById('myChart').getContext('2d');
  myChart= new Chart(ctx, {
    type: 'line',
    data: {
      labels: fields.map((label) => {
        return label.split('/').slice(0, 2).join('/');
      }),
      datasets: [{
        label: 'Dosis aplicadas',
        color: '#fff',
        data: dataAplicadas,
        fill: true,
        backgroundColor: [
          'rgba(0, 255, 78, 1)'
        ],
        borderColor: [
          'rgba(255, 255, 255, 1)'
        ],
        borderWidth: 1
      }, {
        label: 'Dosis asignadas',
        fill: true,
        cubicInterpolationMode: 'monotone',
        data: dataAsignadas,
        backgroundColor: [
          'rgb(7, 56, 235, 0.5)'
        ],
        borderColor: [
          'rgba(200, 130, 130, 1)'
        ],
        borderWidth: 1
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
        },
        legend:{
          labels:{
            color: schema === 'light-mode' ? '#000' : '#fff',
            fullSize: true,
          }
        }
      },
      scales: {          
          x:{
            ticks: {
              font:{
                weight: 'bold',
                size: 13,
                family: 'Cascadia Code PL, Arial, sans-serif',
              },
              color: schema === 'light-mode' ? '#000' : '#fff',
              maxRotation: 90,
              maxTicksLimit: 30,
            }
          },
          y:{
            position: 'right',
            ticks: {
              font:{
                weight: 'bold',
                size: 13,
                family: 'Cascadia Code PL, Arial, sans-serif',
              },
              color: schema === 'light-mode' ? '#000' : '#fff',
              maxRotation: 15,
              maxTicksLimit: 10,
            }
          }
      }
    }
  });
}

graficos();