// Helpers
const $ = (q, c=document) => c.querySelector(q);
const $$ = (q, c=document) => [...c.querySelectorAll(q)];
document.documentElement.classList.remove('no-js');

// Year
$("#year") && ($("#year").textContent = new Date().getFullYear());

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: .15 });
$$('.reveal').forEach(el => io.observe(el));

// Diplomas como PROYECTOS
async function loadDiplomas(){
  try{
    const res = await fetch('datos/diplomas.json', {cache:'no-store'});
    const list = await res.json();
    const wrap = $("#diploma-grid");
    wrap.innerHTML = '';

    list.forEach(item => {
      const card = document.createElement('article');
      card.className = 'card hoverable reveal';

      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a class="btn primary" href="${item.file}" target="_blank" rel="noopener">Acceder</a>
      `;

      wrap.appendChild(card);
      io.observe(card);
    });

  }catch(e){
    console.error('Error cargando diplomas', e);
  }
}

loadDiplomas();
