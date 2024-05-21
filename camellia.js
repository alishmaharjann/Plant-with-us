const list_items = [
	"<h2>Day 1</h2><p>Site Selection and Soil Preparation: <br>1. Choose a Planting Site: Select a location in your garden with dappled sunlight or partial shade. Ensure the site has well-drained soil and protection from harsh winds. <br>2. Soil Preparation: Work the soil to a depth of 12 to 18 inches, incorporating organic matter such as compost, peat moss, or aged manure to improve soil fertility and texture. Adjust the soil pH if necessary.</p>",

	"<h2>Day 2</h2><p>Plant Selection and Spacing <br>1. Choose Camellia Plants: Select healthy, well-branched camellia plants from a reputable nursery or garden center. Look for plants with vibrant foliage and sturdy stems.<br> 2. Spacing: Space camellia plants according to their mature size, typically 3 to 6 feet apart, depending on the variety. Allow enough room for the plants to grow and spread without overcrowding.</p>",

	"<h2>Day 3</h2><p>Planting<br>1. Dig Planting Holes: Dig planting holes that are twice as wide and slightly deeper than the root balls of the camellia plants.<br>2. Planting Depth: Place each camellia plant in its respective planting hole, ensuring that the top of the root ball is level with the surrounding soil surface. Backfill the holes with soil and gently firm the soil around the base of the plants.<br>3. Watering: Water the newly planted camellia plants thoroughly to settle the soil and eliminate air pockets around the roots.</p>",

	"<h2>Day 4</h2><p>Care and Maintenance<br>1. Watering: Keep the soil consistently moist but not waterlogged during the first growing season. Water camellias deeply once or twice a week, especially during hot, dry weather.<br>2. Mulching: Apply a 2- to 3-inch layer of organic mulch, such as shredded bark or pine straw, around the base of camellia plants to conserve soil moisture, suppress weeds, and regulate soil temperature.<br>3. Fertilizing: Fertilize camellias in early spring with a slow-release fertilizer formulated for acid-loving plants. Repeat the application once or twice during the growing season according to package instructions.<br>4. Pruning: Prune camellias after flowering to remove dead or damaged branches and to shape the plants. Avoid heavy pruning, as camellias bloom on old wood.<br>5. Fertilize camellias with a balanced fertilizer formulated for acid-loving plants in spring after flowering.</p>"
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
