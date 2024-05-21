const list_items = [
    "<h2>Day 1</h2><p>Site Selection and Soil Preparation<br>" +
    "1. Choose a Planting Site: Select a location in your garden that receives ample sunlight and has well-drained soil.<br>" +
    "2. Soil Preparation: Prepare the planting area by loosening the soil to a depth of 8 to 10 inches and incorporating organic matter such as compost or aged manure to improve soil fertility and drainage." +
    "</p>",

    "<h2>Day 2</h2><p>Plant Selection and Spacing<br>" +
    "1. Choose Chrysanthemum Plants: Select healthy chrysanthemum plants from a reputable nursery or garden center. Look for plants with sturdy stems and healthy foliage.<br>" +
    "2. Spacing: Space chrysanthemum plants according to their mature size, typically 18 to 24 inches apart for garden mums." +
    "</p>",

    "<h2>Day 3</h2><p>Planting<br>" +
    "1. Dig Planting Holes: Dig holes that are slightly larger than the root balls of the chrysanthemum plants.<br>" +
    "2. Planting Depth: Place each chrysanthemum plant in its respective hole, ensuring that the top of the root ball is level with the surrounding soil surface. Backfill the holes with soil and gently firm the soil around the base of the plants.<br>" +
    "3. Watering: Water the newly planted chrysanthemums thoroughly to settle the soil and help establish the roots." +
    "</p>",

    "<h2>Day 4 and Beyond</h2><p>Care and Maintenance<br>" +
    "1. Watering: Water chrysanthemum plants regularly, keeping the soil evenly moist but not waterlogged. Water at the base of the plants to avoid wetting the foliage, which can lead to disease.<br>" +
    "2. Fertilizing: Apply a balanced fertilizer formulated for flowering plants according to package instructions. Fertilize chrysanthemums monthly during the growing season to promote healthy growth and flowering.<br>" +
    "3. Deadheading: Remove spent flowers regularly to encourage continuous blooming throughout the season. Pinch or snip off the faded blooms just above the nearest set of leaves.<br>" +
    "4. Staking: Provide support for tall chrysanthemum varieties by inserting stakes or plant supports near the base of the plants and gently tying the stems to the supports with twine.<br>" +
    "5. Pest and Disease Control: Monitor chrysanthemum plants for signs of pests such as aphids, thrips, or spider mites, and diseases such as powdery mildew or rust. Treat infestations promptly with insecticidal soap or fungicides as needed.<br>" +
    "6. Winter Protection: In colder climates, apply a layer of mulch around the base of chrysanthemum plants in late fall to insulate the roots and protect them from freezing temperatures." +
    "</p>",
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
