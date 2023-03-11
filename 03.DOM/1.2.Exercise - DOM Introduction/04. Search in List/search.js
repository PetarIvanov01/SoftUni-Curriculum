function search() {
   let data = document.querySelectorAll('ul li')
   let input = document.getElementById('searchText').value;
   
   let count = 0
   for (const el of data) {
      let currentRow = el.textContent;

      if (currentRow.includes(input) && input !== '') {
         el.style.textDecoration = "underline"
         el.style.fontWeight = 'bold'
         
         count++;
      }
      else{
         el.style.textDecoration = 'none'
         el.style.fontWeight = 'normal'
      }
   }
   document.getElementById('result').textContent = `${count} matches found`
}
