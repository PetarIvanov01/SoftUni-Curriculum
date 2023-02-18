function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let input = document.getElementById('searchField').value;
      let data = document.querySelectorAll('.container tbody tr');
      
      for (const el of data) {

         el.classList.remove('select')
         let word = el.textContent;

         if (word.toLowerCase().includes(input.toLowerCase())) {
            el.classList.add('select')
         }

      }
      document.getElementById('searchField').value = '';
   }
}