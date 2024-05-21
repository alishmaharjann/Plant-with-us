const list_items = [
	"<h2>Day 1</h2><p>Prepare the Soil: Use a garden fork or tiller to loosen the soil to a depth of at least 12 inches. Remove any weeds, rocks, or debris from the planting area. Incorporate organic matter such as compost or aged manure to improve soil fertility and structure.</p>",

	"<h2>Day 2</h2><p>Choose Your Sunflower Seeds: Select Seeds: Choose sunflower seeds from a reputable supplier, considering factors such as variety, height, and flower color. Read seed packets or labels to determine the appropriate spacing and planting depth for the chosen variety.</p>",

	"<h2>Day 3</h2><p>Sowing Seeds: Plant sunflower seeds directly into the soil at a depth of 1 to 2 inches. Space the seeds according to the recommended spacing for the chosen variety, typically 6 to 12 inches apart. Rows can be spaced 18 to 36 inches apart, depending on available space and planting preferences. Watering: Water the planting area thoroughly after sowing to ensure the soil is evenly moist. Keep the soil consistently moist but not waterlogged during the germination period.</p>",

	"<h2>Day 4</h2><p>Germination and Early Care: Germination: Sunflower seeds typically germinate within 7 to 10 days under optimal conditions. Monitor the planting area for signs of germination, such as seedlings emerging from the soil. Thinning (if necessary): Once seedlings have emerged, thin them to the appropriate spacing recommended for the variety. Remove weaker seedlings, leaving the strongest ones to grow. Watering: Continue to water the seedlings regularly, ensuring the soil remains evenly moist. Avoid overhead watering to prevent fungal diseases.</p>",

	"<h2>Day 5</h2><p>Growth and Maintenance: Mulching: Apply a layer of organic mulch around the base of the sunflower plants to conserve moisture, suppress weeds, and regulate soil temperature. Support (if necessary): Tall or branching sunflower varieties may benefit from staking or support to prevent them from toppling over in strong winds. Install stakes or a trellis near the plants and tie them gently to the support as they grow. Fertilizing: Apply a balanced fertilizer or a top dressing of compost around the base of the plants to provide additional nutrients. Follow fertilizer package instructions for application rates and timing. Pest and Disease Monitoring: Monitor sunflower plants for signs of pests such as aphids, caterpillars, or birds feeding on the seeds. Check for signs of diseases such as powdery mildew or fungal leaf spots and take appropriate measures for control if needed.</p>"
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
