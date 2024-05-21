const list_items = [
    "<h2>Day 1</h2><p>Prepare the Soil <br>Loosen the soil in the planting area to a depth of 6 to 8 inches using a garden fork or tiller. Remove any weeds, rocks, or debris from the soil. Incorporate organic matter such as compost or aged manure to improve soil fertility and structure.</p>",

    "<h2>Day 2</h2><p>Choose your marigold seeds or plants <br>Select high-quality marigold seeds from a reputable supplier or purchase healthy seedlings from a nursery or garden center. Consider the mature height and flower color of the marigold variety when making your selection.</p>",

    "<h2>Day 3</h2><p>Planting <br>Space marigold plants according to their mature size, typically 6 to 18 inches apart, depending on the variety. Sow marigold seeds directly into the prepared soil at a depth of about ¼ to ½ inch, following package instructions. If transplanting seedlings, dig holes slightly larger than the root ball of each seedling and gently place them in the holes at the same depth they were growing in their containers. Water the newly planted marigolds thoroughly to settle the soil and provide moisture to the roots.</p>",

    "<h2>Day 4</h2><p>Watering <br>Water the marigolds deeply after planting, and continue to water regularly, providing approximately 1 inch of water per week, especially during dry periods. Avoid overhead watering to prevent fungal diseases, such as powdery mildew.</p>",

    "<h2>Day 5</h2><p>Mulching <br>Apply a layer of organic mulch, such as straw or shredded bark, around the base of marigold plants to conserve moisture, suppress weeds, and regulate soil temperature.</p>",

    "<h2>Day 6</h2><p>Deadheading(optional) <br>Once the marigold plants begin to produce flowers, remove spent blooms regularly to encourage continuous blooming and prevent seed formation. Pinch or snip off faded blooms to promote new growth and prolong the flowering period.</p>",

    "<h2>Day 7</h2><p>Pest and disease monitoring <br>Monitor marigold plants for signs of pests, such as aphids or spider mites, and diseases, such as powdery mildew or leaf spot. Take appropriate measures for control if needed, such as using insecticidal soap or fungicides.</p>",

    "<h2>Day 8</h2><p>Fertilizing (Optional) <br>If soil is poor or plants show signs of nutrient deficiency, apply a balanced fertilizer once a month during the growing season, following package instructions.</p>",

    "<h2>Day 9</h2><p>Enjoy and Maintain <br>Continue to water, monitor for pests and diseases, and provide care as needed to ensure healthy and vibrant marigold plants. Enjoy the beautiful blooms and cheerful colors that marigolds bring to your garden throughout the growing season!</p>"
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
