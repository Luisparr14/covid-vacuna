async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const generateIndexPage = async () => {
  const infoVacunas = await fetchData('./data/vacunas.json');
  const infoLabs = await fetchData('./data/laboratorios.json');
  const cardContianer = document.querySelector('#general_info');
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
      <div class="card" data-aos="fade-right">          
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
    <div class="card" data-aos="flip-left">
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
    <div class="card" data-aos="fade-left">
      <section class="body_card">
        <div>
          <h2 class="card_title">Personas con esquema completo</h2>
          <h4>${personasConEsquemaCompleto}</h4>
          <span>% sobre administradas</span>
          <h4>${porcentajeAdministradas}</h4>
        </div>
      </section>
    </div>`;
  let cards = htmlCard1 + htmlCard2 + htmlCard3;
  cardContianer.innerHTML = cards;
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
  });
}
generateIndexPage();