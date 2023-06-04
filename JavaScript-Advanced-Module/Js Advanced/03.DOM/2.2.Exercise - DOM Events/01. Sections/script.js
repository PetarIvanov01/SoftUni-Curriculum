function create(words) {

   let output = document.getElementById('content')

   for (const word of words) {
      
      let div = document.createElement('div');
      let p = document.createElement('p');
      
      p.textContent = word
      p.style.display = 'none'
      div.appendChild(p)

      div.addEventListener('click',visible)

      output.appendChild(div)
   }

   function visible(event) {   
      
      let p  = event.target.children[0]
      p.style.display = 'block';
      
   }

}