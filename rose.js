const list_items = [
    `<h2>Day 1</h2><p>Prepare the Soil <br>
    1. Assessment: <br>
    Evaluate the planting site to ensure it receives adequate sunlight (at least 6 hours per day) and has well-draining soil. 
    <br>
    2. Soil Preparation: <br>
    Use a shovel or garden fork to loosen the soil to a depth of at least 12 inches.
    Remove any weeds, rocks, or debris from the planting area. 
    <br>
    3. Amend Soil: <br>
    Mix in organic matter such as compost or aged manure to improve soil fertility and structure.
    Incorporate any necessary soil amendments based on a soil test, aiming for a pH between 6.0 and 6.5.</p>`,

    `<h2>Day 2</h2><p>Choose Your Roses <br>
    1. Research: <br>
    Research different types of roses to determine which varieties best suit your garden and preferences.
    <br>
    2. Consider factors such as bloom color, size, fragrance, and disease resistance.
    <br>
    3. Visit Nurseries: <br>
    Visit local nurseries or garden centers to select healthy rose plants.
    Look for plants with sturdy stems, healthy leaves, and no signs of disease or pests.
    <br>
    4. Choose roses that are appropriate for your climate and growing conditions. <br>
    </p>`,

    `<h2>Day 3</h2><p>Planting <br>
    1. Digging the Hole: <br>
    Dig a hole that is twice as wide and just as deep as the root ball of the rose plant.
    The depth of the hole should accommodate the entire root system without bending or crowding.
    <br>
    2. Positioning the Rose:
    <br>
    Carefully remove the rose from its container, being mindful not to disturb the roots excessively.
    <br>
    Place the rose in the center of the hole, ensuring that the bud union (the swollen area where the roots meet the stem) is at ground level or slightly above ground level depending on your climate.
    <br>
    3. Backfilling: 
    <br> 
    Backfill the hole with soil, gently firming it around the roots to eliminate air pockets.
    Water the newly planted rose thoroughly to settle the soil.</p>`,

    `<h2>Day 4</h2><p>Watering and Mulching <br>
    1. Watering: <br>
    Provide the newly planted rose with a deep watering to ensure the soil is evenly moist.
    Water at the base of the plant to avoid wetting the foliage, which can promote disease.
    <br>
    2. Mulching:
    <br>
    Apply a 2- to 3-inch layer of organic mulch, such as wood chips or shredded bark, around the base of the rose plant.
    Mulch helps retain moisture, suppress weeds, and regulate soil temperature.</p>`,

    `<h2>Day 5</h2><p>Support (for Climbing Roses) <br>
    1. Installing Support Structures: <br>
    For climbing roses, install a trellis, fence, or other support structure near the plant.
    <br>
    Position the support structure securely in the ground, ensuring it can bear the weight of the climbing rose.
    <br>
    Train the rose canes onto the support structure as needed, using soft ties or twine to secure them in place.</p>`
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
