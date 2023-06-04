const fs = require('fs');

const cats = [
    {
      image: 'https://ichef.bbci.co.uk/news/976/cpsprodpb/12A9B/production/_111434467_gettyimages-1143489763.jpg',
      name: '',
      breed: 'Bombay Cat',
      description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
      image: 'https://cdn.pixabay.com/photo/2015/06/19/14/20/cat-814952_1280.jpg',
      name: 'Pretty Kitty',
      breed: 'Bombay Cat',
      description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
      image: 'https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348_1280.jpg',
      name: 'Pretty Kitty',
      breed: 'Bombay Cat',
      description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
      image: 'https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg',
      name: 'Pretty Kitty',
      breed: 'Bombay Cat',
      price: '350$',
      description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
    {
      image: 'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg',
      name: 'Pretty Kitty',
      breed: 'Bombay Cat',
      description: 'Dominant and aggressive to other cats. Will probably eat you in your sleep. Very cute tho.',
    },
  ];

const catsJSON = JSON.stringify(cats);

fs.writeFile('cats.json', catsJSON, (err) => {
  if (err) {
    console.error('Error writing cats.json:', err);
  } else {
    console.log('cats.json file has been created successfully.');
  }
});
