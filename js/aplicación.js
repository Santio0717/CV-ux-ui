// Helpers
const $ = (q, c=document) => c.querySelector(q);
const $$ = (q, c=document) => [...c.querySelectorAll(q)];
document.documentElement.classList.remove('no-js');

// Año dinámico
$("#year") && ($("#year").textContent = new Date().getFullYear());

// Animación de reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('show');
      io.unobserve(e.target);
    }
  });
}, { threshold: .15 });
$$('.reveal').forEach(el => io.observe(el));

// Diplomas dinámicos
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
        <img src="${item.thumb}" alt="Icono de ${item.title}">
        <h3>${item.title}</h3>
        <p><strong>${item.institution}</strong> · ${item.date}</p>
        <p>${item.description}</p>
        <a class="btn primary" href="${item.file}" target="_blank" rel="noopener">Abrir</a>
      `;
      wrap.appendChild(card);
      io.observe(card);
    });
  }catch(e){
    console.error('Error cargando diplomas', e);
  }
}

loadDiplomas();
