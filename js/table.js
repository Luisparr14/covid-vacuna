async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const generateTabla = async () => {
  const tbody = document.querySelector('#tbody');
  const infoVacunas = await fetchData('./data/vacunas.json');
  let filas = '';
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
    
    filas += `
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
  tbody.innerHTML = filas;
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const scrollTopButton = document.querySelector('#btn_to_top');
  if (scrollTop > 150) {
    scrollTopButton.classList.add('show');
  } else {
    scrollTopButton.classList.remove('show');
  }
})

generateTabla();
