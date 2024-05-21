const list_items = [
    "<h2>Day 1</h2><p>Prepare the Soil <br>Loosen the soil to a depth of 6 to 8 inches using a garden fork or tiller. Remove weeds, rocks, or debris from the planting area. Incorporate organic matter such as compost or aged manure to improve soil fertility and structure.</p>",

    "<h2>Day 2</h2><p>Choose Your daisy plants or seeds <br>Select healthy daisy plants from a reputable nursery or garden center, or obtain seeds from a reliable supplier. Consider the mature height and bloom time of the daisy variety when making your selection.</p>",

    "<h2>Day 3</h2><p>Planting <br>Space daisy plants according to their mature size, typically 6 to 12 inches apart, depending on the variety. If planting seeds, sow them thinly and evenly across the prepared soil surface. Plant daisy plants at the same depth they were growing in their containers. For seeds, cover them lightly with soil, following package instructions for planting depth. Water the newly planted daisies thoroughly to settle the soil and provide moisture to the roots.</p>",

    "<h2>Day 4</h2><p>Watering <br>Water the daisies deeply after planting, and continue to water regularly, providing approximately 1 inch of water per week, especially during dry periods. Avoid overhead watering to prevent fungal diseases, such as powdery mildew.</p>",

    "<h2>Day 5</h2><p>Mulching <br>Apply a layer of organic mulch, such as straw or shredded bark, around the base of daisy plants to conserve moisture and suppress weeds.</p>",

    "<h2>Day 6</h2><p>Fertilizing <br>Apply a balanced fertilizer or a fertilizer formulated for flowering plants in early spring, just as new growth begins, and again in early summer to promote healthy growth and blooming.</p>",

    "<h2>Day 7</h2><p> Deadheading <br>Remove spent flowers (deadheading) regularly to encourage continuous blooming and prevent seed formation. This also helps maintain the plant's appearance.</p>",

    "<h2>Day 8</h2><p> Division (Optional) <br>Every few years, consider dividing overcrowded daisy clumps to rejuvenate the plants and promote better flowering.</p>",

    "<h2>Day 9</h2><p>Pest and disease monitoring <br>Monitor daisy plants for signs of pests, such as aphids or leafhoppers, and diseases, such as powdery mildew or leaf spot. Take appropriate measures for control if needed.</p>",

    "<h2>Day 10</h2><p>Winter Care <br>In colder climates, apply a layer of mulch around the base of daisy plants in late fall to insulate the soil and protect roots from freezing temperatures.</p>"
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