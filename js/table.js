async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const formatNumber = (number, percent = false) => {
  if (percent) {
    return Intl.NumberFormat('es-CO', { style: 'percent', maximumFractionDigits: 2 }).format(number);
  } else {
    return Intl.NumberFormat('es-Co').format(number);
  }
}

const generateTable = async () => {
  const tbody = document.querySelector('#tbody');
  const infoVacunas = await fetchData('./data/vacunas.json');
  let filas = '';
  infoVacunas.forEach((vacuna) => {
    let departamento = vacuna.departamento;
    let dosisAsignadas = formatNumber(vacuna.dosisAsignadas);
    let dosisAplicadas = formatNumber(vacuna.dosisAplicadas.total);
    let porcentajeEntregadas = (vacuna.dosisAplicadas.total) / vacuna.dosisAsignadas;
    porcentajeEntregadas = formatNumber(porcentajeEntregadas, true);
    let poblacionPrimeraDosis = (parseFloat(vacuna.cobertura.primeraDosis));
    poblacionPrimeraDosis = formatNumber(poblacionPrimeraDosis, true);
    let pautaCompleta = formatNumber(vacuna.pautaCompleta);
    let totalmenteVacunada = formatNumber(vacuna.cobertura.esquemaCompleto, true);

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

generateTable();
