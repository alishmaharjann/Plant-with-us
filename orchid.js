const list_items = [
    "<h2>Day 1</h2><p>Assessing the Environment <br>\
    Evaluate the growing environment for your orchid, ensuring it has the proper lighting conditions, temperature, and humidity levels.</p>",

    "<h2>Day 2</h2><p>Watering<br>\
    Check the moisture level of the orchid's potting mix. Water the orchid thoroughly if the mix feels dry to the touch.\
    Avoid overwatering, as orchid roots are susceptible to rot. Ensure proper drainage to prevent waterlogged conditions.</p>",

    "<h2>Day 3</h2><p>Monitoring Light<br>\
    Assess the orchid's exposure to light. Ensure it receives bright, indirect light, avoiding direct sunlight that can scorch the leaves.</p>",

    "<h2>Day 4</h2><p>Inspecting Roots<br>\
    Check the orchid's roots for signs of health. Look for firm, plump roots and avoid mushy or rotting ones. Trim any dead or decaying roots.</p>",

    "<h2>Day 5</h2><p>Fertilizing<br>\
    Feed the orchid with a balanced orchid fertilizer diluted to half strength. Apply fertilizer every 2 to 4 weeks during the growing season.</p>",

    "<h2>Day 6</h2><p>Rotating<br>\
    Rotate the orchid pot to ensure even exposure to light on all sides. This helps promote symmetrical growth and prevents the plant from leaning towards the light source.</p>",

    "<h2>Day 7</h2><p>Humidity Maintenance<br>\
Maintain high humidity levels around the orchid by misting the leaves regularly or placing the orchid on a tray filled with pebbles and water.\
Avoid placing orchids near drafts or heating vents, which can dry out the air.</p>",

    "<h2>Day 8</h2><p>Monitoring Temperature<br>\
Check the temperature around the orchid. Maintain daytime temperatures between 60°F to 80°F (15°C to 27°C) and slightly cooler temperatures at night.</p>",

    "<h2>Day 9</h2><p>Pruning<br>\
Trim any yellowing or dead leaves or flower spikes from the orchid. Use sterilized pruning shears to prevent the spread of disease.</p>",

    "<h2>Day 10</h2><p>Pest Control<br>\
Check the orchid for signs of pests such as aphids, scale insects, or spider mites. Treat infestations promptly with insecticidal soap or horticultural oil.</p>",

    "<h2>Day 11</h2><p> Supporting Growth<br>\
Provide support or stakes for tall or top-heavy orchid varieties to prevent them from falling over. Use orchid clips or stakes to gently secure stems.</p>",

   

    "<h2>Day 12 </h2><p> Rest and Observation<br>\
Allow the orchid to rest and observe its growth and overall health. Make any necessary adjustments to its care routine based on its response.</p>"
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
