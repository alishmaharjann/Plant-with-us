const list_items = [
    "<h2>Day 1</h2><p>Prepare the Soil <br>Loosen the soil to a depth of 12 inches using a shovel or garden fork. Remove weeds, rocks, and debris from the planting area. Incorporate organic matter like compost or aged manure to improve soil fertility and structure.</p>",

    "<h2>Day 2</h2><p>Choose Your Tulip Bulbs <br>Select high-quality tulip bulbs from a reputable supplier or nursery. Consider the bloom time, height, and color of the tulip variety when making your selection.</p>",

    "<h2>Day 3</h2><p>Planting <br>Dig holes for the tulip bulbs, spacing them according to the variety's requirements. Position bulbs with the pointed end facing upward and roots spread out. Backfill holes with soil and water thoroughly to settle the soil.</p>",

    "<h2>Day 4</h2><p>Watering <br>Water the newly planted bulbs deeply to ensure the soil is evenly moist. Continue to water regularly throughout the fall, providing approximately 1 inch of water per week.</p>",

    "<h2>Day 5</h2><p>Mulching <br>Apply a layer of organic mulch around the base of the tulip plants to conserve moisture, suppress weeds, and regulate soil temperature. Mulch also helps protect bulbs from temperature fluctuations and frost heaving in winter.</p>",

    "<h2>Day 6</h2><p>Winter Care <br>In colder climates, apply a thicker layer of mulch (about 2 to 3 inches) to insulate the soil and protect bulbs from freezing temperatures. Consider covering the planting area with a layer of straw or leaves for added protection.</p>",

    "<h2>Day 7</h2><p>Care and Maintenance <br>Monitor soil moisture levels and adjust watering as needed, keeping soil evenly moist but not waterlogged. Provide support for tall varieties with stakes or supports to prevent bending or falling over in windy conditions. Remove spent flowers (deadheading) to encourage continuous blooming and prevent seed formation. Fertilize in early spring with a balanced fertilizer, following package instructions for application rates and methods. Monitor for pests and diseases, taking appropriate measures for control if needed.</p>"
];


const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = 1;

function DisplayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
        let item = paginatedItems[i];

        let item_element = document.createElement('div');
        item_element.classList.add('item');
        item_element.innerHTML = item;

        wrapper.appendChild(item_element);
    }
}

function SetupPagination(items, wrapper, rows_per_page) {
    wrapper.innerHTML = "";

    let page_count = Math.ceil(items.length / rows_per_page);
    for (let i = 1; i <= page_count; i++) {
        let btn = PaginationButton(i, items);
        wrapper.appendChild(btn);
    }

    let prevBtn = document.createElement('button');
    prevBtn.innerText = '◀';
    prevBtn.addEventListener('click', function() {
        if (current_page > 1) {
            current_page--;
            DisplayList(items, list_element, rows, current_page);
            updatePaginationButtons();
        }
    });
    wrapper.insertBefore(prevBtn, wrapper.firstChild);

    let nextBtn = document.createElement('button');
    nextBtn.innerText = '▶';
    nextBtn.addEventListener('click', function() {
        if (current_page < page_count) {
            current_page++;
            DisplayList(items, list_element, rows, current_page);
            updatePaginationButtons();
        }
    });
    wrapper.appendChild(nextBtn);

    function updatePaginationButtons() {
        let buttons = wrapper.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.innerText !== '◀' && btn.innerText !== '▶') {
                btn.classList.remove('active');
                if (parseInt(btn.innerText.replace('Day ', '')) === current_page) {
                    btn.classList.add('active');
                }
            }
        });
    }

    updatePaginationButtons();
}

function PaginationButton(page, items) {
    let button = document.createElement('button');
    // Adjusted to format button labels as "Day 1", "Day 2", etc.
    button.innerText = "Day " + page;

    if (current_page == page) button.classList.add('active');

    button.addEventListener('click', function() {
        current_page = page;
        DisplayList(items, list_element, rows, current_page);

        // Ensuring the active class is updated correctly
        let current_btn = document.querySelector('.pagination button.active');
        if(current_btn) current_btn.classList.remove('active');

        button.classList.add('active');
    });

    return button;
}

DisplayList(list_items, list_element, rows, current_page);
SetupPagination(list_items, pagination_element, rows);

/* weather */
document.addEventListener("DOMContentLoaded", function() {
    fetchWeather();
});

function fetchWeather() {
    // You need to replace 'YOUR_API_KEY' with your actual API key
    const apiKey = '652cc9f229bdad93ff58e095296a5c28';
    const city = 'Kathmandu'; // Replace 'YOUR_CITY' with the name of your city
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const weatherCondition = data.weather[0].main;
            const dateTime = new Date(data.dt * 1000);
            const dayOfWeek = dateTime.toLocaleDateString('en-US', { weekday: 'long' });
            const currentTime = dateTime.toLocaleTimeString('en-US');

            document.getElementById('temperature').innerText = temperature;
            document.getElementById('humidity').innerText = humidity;
            document.getElementById('weather-condition').innerText = weatherCondition;
            document.getElementById('date-time').innerText = `${dayOfWeek}, ${currentTime}`;

            let emoji = '';
            switch (weatherCondition) {
                case 'Clear':
                    emoji = '☀️';
                    break;
                case 'Clouds':
                    emoji = '☁️';
                    break;
                case 'Rain':
                    emoji = '🌧️';
                    break;
                case 'Thunderstorm':
                    emoji = '⛈️';
                    break;
                case 'Snow':
                    emoji = '❄️';
                    break;
                default:
                    emoji = '❓';
                    break;
            }
            document.getElementById('weather-condition').textContent += ` ${emoji}`;

            let waterMessage = '';
            if (weatherCondition === 'Rain') {
                waterMessage = "It's raining! No need to water plants today.";
            } else if (temperature > 25 && humidity < 70) {
                waterMessage = "It's hot and dry. Water your plants today.";
            } else {
                waterMessage = "Weather conditions are normal. Check plants as usual.";
            }
            document.getElementById('water-message').textContent = waterMessage;
        })
        .catch(error => console.error('Error fetching weather data:', error));
}
