const product = [
    {
        id: 0,
        image: 'image/sunflower.jpg',
        title: 'Sunflower',
        page: 'sunflower.html',
    
    },
    {
        id: 1,
        image: 'image/rose-2885586_960_720.jpg.jpg',
        title: 'Rose',
        page: 'rose.html',
      
    },
    {
        id: 2,
        image: 'image/lily.jfif',
        title: 'Lily',
        page: 'lily.html',
      
    },
    {
        id: 3,
        image: 'image/tulip.jpg',
        title: 'Tulip',
        page: 'tulip.html',
     
    },
    {
        id: 4,
        image: 'image/daisy.jfif',
        title: 'Daisy',
        page: 'daisy.html',
    
    },
    {
        id: 5,
        image: 'image/marigold.jfif',
        title: 'Marigold',
        page: 'marigold.html',
     
    },
    {
        id: 6,
        image: 'image/camellia.webp',
        title: 'Camellia',
        page: 'camellia.html',
     
    },
    {
        id: 7,
        image: 'image/iris.webp',
        title: 'Iris',
        page: 'iris.html',
     
    },
    {
        id: 8,
        image: 'image/lavender.jpg',
        title: 'Lavender',
        page: 'lavender.html',
     
    },
    {
        id: 9,
        image: 'image/Orchid.jpg',
        title: 'Orchid',
        page: 'orchid.html',
     
    },
    {
        id: 10,
        image: 'image/snapdragon.jpg',
        title: 'Snapdragon',
        page: 'snapdragon.html',
     
    },
    {
        id: 11,
        image: 'image/Violet.jpg',
        title: 'Violet',
        page: 'violet.html',
     
    },
    {
        id: 12,
        image: 'image/Chrysanthemum.webp',
        title: 'Chrysanthemum',
        page: 'chrysanthemum.html',
     
    },
];

const categories = [...product];

document.getElementById('searchBar').addEventListener('keyup', (e) => {
    const searchData = e.target.value.toLowerCase();
    const filteredData = categories.filter((item) => {
        return (
            item.title.toLowerCase().includes(searchData)
        )
    })
    displayItem(filteredData)
});

const displayItem = (items) => {
    document.getElementById('root').innerHTML = items.map((item) => {
        const { id, image, title, page } = item;
        return (
            `<div class='box'>
                <a href='${page}'> <!-- Wrap the image in an anchor tag -->
                    <div class='img-box'>
                        <img class='images' src=${image} alt=${title}></img>
                    </div> 
                </a>
                <div class='bottom'>
                    <p>${title}</p>
                </div>
            </div>`
        )
    }).join('')
};
displayItem(categories);