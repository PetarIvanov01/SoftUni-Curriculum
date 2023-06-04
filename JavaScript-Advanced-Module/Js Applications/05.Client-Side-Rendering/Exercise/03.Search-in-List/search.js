import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns as townsData } from "./towns.js"

const section = document.querySelector('#towns');
let result = document.querySelector('#result');
let input = document.querySelector('#searchText');

const towns = townsData.map(t => ({ name: t, matches: false }));

const template = (towns) => html`
<ul>
   ${towns.map(t => html`<li class=${t.matches ? 'active' : ''}>${t.name}</li>`)}
</ul>`;

update();
document.querySelector('button').addEventListener('click', search)

function search() {

   const match = input.value.trim().toLocaleLowerCase();
   let matches = 0;

   for (const el of towns) {
      if (match && el.name.toLocaleLowerCase().includes(match)) {
         el.matches = true
         matches++
      }
      else {
         el.matches = false
      }
   }
   result.textContent = `${matches} matches found`;
   update();

}

function update() {
   render(template(towns), section);
}




// towns.forEach(t => t.matches = false);

// const match = input.value.trim().toLocaleLowerCase();
// const matches = towns.filter(t => match && t.name.toLocaleLowerCase().includes(match));

// matches.forEach(t => t.matches = true);