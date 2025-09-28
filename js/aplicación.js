// Helpers
const $ = (q, c=document) => c.querySelector(q);
const $$ = (q, c=document) => [...c.querySelectorAll(q)];
document.documentElement.classList.remove('no-js');

// Year
$("#year") && ($("#year").textContent = new Date().getFullYear());

// Theme
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if(savedTheme){ root.classList.toggle('light', savedTheme === 'light'); }
$("#themeToggle")?.addEventListener('click', ()=>{
  const isLight = root.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

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

// Diplomas
async function loadDiplomas(){
  try{
    const res = await fetch('data/diplomas.json', {cache:'no-store'});
    const list = await res.json();
    const wrap = $("#diploma-grid");
    wrap.innerHTML = '';
    list.forEach(item => {
      const tile = document.createElement('article');
      tile.className = 'tile hoverable reveal';
      tile.innerHTML = `
        <img src="${item.thumb}" alt="Miniatura de ${item.title}">
        <div>
          <div class="title">${item.title}</div>
          <div class="meta">${item.institution || ''} ${item.date ? '· '+item.date : ''}</div>
          <div style="margin-top:6px">
            <a class="card-link" href="${item.file}" target="_blank" rel="noopener">Abrir</a>
          </div>
        </div>
      `;
      tile.addEventListener('click', (e)=>{
        if(e.target.tagName.toLowerCase() === 'a') return;
        openLightbox(item);
      });
      wrap.appendChild(tile);
      io.observe(tile);
    });
  }catch(e){
    console.error('Error cargando diplomas', e);
  }
}

function openLightbox(item){
  const box = $("#lightbox");
  const img = $("#lightbox-img");
  const pdf = $("#lightbox-pdf");
  img.style.display = 'none';
  pdf.style.display = 'none';

  if((item.type||'').toLowerCase() === 'image'){
    img.src = item.file;
    img.alt = item.title;
    img.style.display = 'block';
  }else{
    pdf.src = item.file;
    pdf.style.display = 'block';
  }
  box.classList.add('show');
  box.setAttribute('aria-hidden','false');
}

$(".lightbox-close")?.addEventListener('click', ()=>{
  const box = $("#lightbox");
  $("#lightbox-img").src = '';
  $("#lightbox-pdf").src = '';
  box.classList.remove('show');
  box.setAttribute('aria-hidden','true');
});

loadDiplomas();
