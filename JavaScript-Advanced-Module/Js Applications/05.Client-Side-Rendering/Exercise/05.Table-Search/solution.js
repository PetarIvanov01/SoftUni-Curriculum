import { html, render } from "./node_modules/lit-html/lit-html.js";
const ulr = 'http://localhost:3030/jsonstore/advanced/table';

const template = (student) => html`
<tr class= ${student.matches ? 'select' : ''}>
   <td>${student.item.firstName} ${student.item.lastName}</td>
      <td>${student.item.email}</td>
      <td>${student.item.course}</td>
</tr>
`;
let students;

document.getElementById('searchBtn').addEventListener('click', searchFnc);

function searchFnc() {
   const value = document.getElementById('searchField').value.toLocaleLowerCase();

   for (const student of students) {

      let match = Object.values(student.item).some(p => value && p.toLocaleLowerCase().includes(value));
      student.matches = match;

   }

   document.getElementById('searchField').value = '';
   update();

}

function update() {

   render(students.map(template), document.querySelector('tbody'));

}

getData()
async function getData() {

   const res = await fetch(ulr);
   const data = await res.json();
   students = Object.values(data).map(v => ({ item: v, matches: false }));

   update();
}



