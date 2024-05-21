const list_items = [
    "<h2>Day 1</h2><p>Site Preparation and Soil Assessment<br>\
    1. Choose a Sunny Location: Select a spot in your garden that receives full sun for at least 6 to 8 hours per day.<br>\
    2. Soil Assessment: Check the soil drainage by digging a hole approximately 12 inches deep and filling it with water. If the water drains within a few hours, the soil drainage is adequate for lavender.</p>",

    "<h2>Day 2</h2><p>Soil Preparation<br>\
    1. Amend the Soil: If the soil is heavy or clayey, improve drainage by amending it with organic matter such as compost or well-rotted manure. Work the organic matter into the top 12 to 18 inches of soil using a garden fork or tiller.</p>",

    "<h2>Day 3</h2><p>Plant Selection and Spacing<br>\
    1. Choose Lavender Plants: Select healthy lavender plants from a reputable nursery or garden center. Consider the mature size and color of the lavender variety when making your selection.<br>\
    2. Spacing: Space lavender plants approximately 12 to 24 inches apart, depending on the variety and the desired density of your lavender bed.</p>",

    "<h2>Day 4</h2><p>Planting<br>\
    1. Dig Planting Holes: Dig holes that are slightly larger than the root balls of the lavender plants. Space the holes according to your desired planting arrangement.<br>\
    2. Planting Depth: Place each lavender plant in its respective hole, ensuring that the top of the root ball is level with the surrounding soil surface. Backfill the holes with soil and gently firm the soil around the base of the plants.<br>\
    3. Watering: Water the newly planted lavender thoroughly to settle the soil and help establish the roots.</p>",

    "<h2>Day 5 and Beyond </h2><p>Care and Maintenance<br>\
    1. Watering: Water lavender plants deeply once a week, or as needed, to keep the soil evenly moist but not waterlogged. Reduce watering frequency once the plants are established.<br>\
    2. Mulching: Apply a layer of organic mulch, such as straw or bark chips, around the base of lavender plants to conserve moisture, suppress weeds, and regulate soil temperature.<br>\
    3. Pruning: Prune lavender plants lightly after flowering to promote bushy growth and prevent woody stems. Trim off spent flower spikes and prune back about one-third of the plant's foliage.<br>\
    4. Disease and Pest Control: Monitor lavender plants for signs of pests, such as aphids or spider mites, and diseases, such as root rot or powdery mildew. Treat infestations promptly with insecticidal soap or fungicides, if necessary.<br>\
    5. Winter Care: Lavender is generally hardy, but in colder climates, protect plants from harsh winter conditions by mulching around the base and providing shelter from strong winds.</p>"
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
