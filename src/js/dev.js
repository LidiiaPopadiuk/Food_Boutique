import en from '../locale/en.json' assert { type: 'json' };
import uk from '../locale/uk.json' assert { type: 'json' };

if (!localStorage.getItem('lang')) localStorage.setItem('lang', 'en');

// const lang = localStorage.getItem('lang') === 'en' ? en : uk;
// const team = document.querySelector('.team__slides');
// team.innerHTML = lang.team.map(person => {
//   return `<div class="team__slide">
//             <img src="../src/images/Oleg.webp" alt="Our Team" loading="lazy" />
//             <div class="team__text">
//               <h2 class="team__name" data-i18n="">${person.n}</h2>
//               <span class="team__profession" data-i18n="team[0].p"></span>
//             </div>
//           </div>`;
// });
// const i18nArr = document.querySelectorAll('[data-i18n]');
// i18nArr.forEach(el => {
//   el.textContent = eval('lang.' + el.dataset.i18n.toString());
// });
