/* scripts.js
   Pequeñas interacciones: navegación suave y modal ligero para ver proyecto.
*/

document.addEventListener('DOMContentLoaded', function(){
  // smooth anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth'});
    });
  });

  // simple project click: mostrar detalle en overlay (si existe)
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('click', function(){
      const detail = this.querySelector('.detail-full');
      if(!detail) return;
      // crear overlay
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.inset = '0';
      overlay.style.background = 'rgba(10,10,10,0.6)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = 9999;
      overlay.addEventListener('click', ()=> overlay.remove());

      const modal = document.createElement('div');
      modal.style.background = 'white';
      modal.style.padding = '20px';
      modal.style.borderRadius = '12px';
      modal.style.maxWidth = '800px';
      modal.style.maxHeight = '80vh';
      modal.style.overflow = 'auto';
      modal.innerHTML = `<h3 style="margin-bottom:8px">${this.querySelector('h4').innerText}</h3>
                         <div style="color:#444">${detail.innerHTML}</div>
                         <div style="margin-top:12px;text-align:right">
                           <button style="padding:8px 12px;border-radius:8px;border:0;background:#0A5C64;color:#fff;cursor:pointer">Cerrar</button>
                         </div>`;
      modal.querySelector('button').addEventListener('click', ()=> overlay.remove());
      overlay.appendChild(modal);
      document.body.appendChild(overlay);
    });
  });
});

/* ==== ANIMACIÓN SCROLL REVEAL ==== */
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

/* ==== BOTÓN VOLVER ARRIBA ==== */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
