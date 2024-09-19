// Create Capybara Stats
let capyMeter = {
    age: 0,
    happy: 10,
    hungry: 10,
    health: 10,
    discipline: 10
};




// Load stats from localStorage if they exist
function loadStats() {
    const savedStats = JSON.parse(localStorage.getItem("capyMeter"));
    if (savedStats) {
        capyMeter = savedStats;
    }

}

// Save stats to localStorage
function saveStats() {
    localStorage.setItem("capyMeter", JSON.stringify(capyMeter));
}

// Call loadStats when the page loads to restore the saved stats
loadStats();

// Update stat functions (and save after updating)
function increaseStat(statKey) {
    if (capyMeter[statKey] < 10) {
        capyMeter[statKey] += 1;
        saveStats();  // Save stats after any change
        checkMeterAndDisplayNotification();
    }
}

function decreaseStat(statKey) {
    if (capyMeter[statKey] > 0) {
        capyMeter[statKey] -= 1;
        saveStats();  // Save stats after any change
        checkMeterAndDisplayNotification();
    }
}




// Decrease Stats Over Time
let lastUpdateTime = parseInt(localStorage.getItem("lastUpdate")) || Date.now();
localStorage.setItem("lastUpdate", lastUpdateTime);

// Function to decrease stats by 2 every 8 hours
function decreaseStatsEvery8Hours() {
    let currentTime = Date.now();
    let timePassedInMilliseconds = currentTime - lastUpdateTime;

    // 8 hours in milliseconds (28,800,000 milliseconds)
    if (timePassedInMilliseconds >= 28800000) {
        for (let stat in capyMeter) {
            if (stat !== "age") {  // Don't decrease age
                capyMeter[stat] = Math.max(capyMeter[stat] - 2, 0);
                checkMeterAndDisplayNotification();
            }
        }
        lastUpdateTime = currentTime;
        localStorage.setItem("lastUpdate", lastUpdateTime);
        saveStats();  // Save stats after decreasing them
    }
}

setInterval(decreaseStatsEvery8Hours, 3600000);  // Check every hour


 

// Get Current Age of Capybara
const date = new Date();
let startDate = localStorage.getItem("birthday") || Date.now();
localStorage.setItem("birthday", startDate);

function getAge(){
    let endDate = Date.now(); 
    let ageInSeconds = Math.round((endDate - startDate) / 1000);

    if ( ageInSeconds < 86400 ){
        capyMeter.age = 0;
    } else if (ageInSeconds < (86400 * 2)){
        capyMeter.age = 1;
    } else if (ageInSeconds < (86400 * 3)){
        capyMeter.age = 2;
    } else if (ageInSeconds < (86400 * 4)){
        capyMeter.age = 3;
    } else if (ageInSeconds < (86400 * 5)){
        capyMeter.age = 5;
    } else if (ageInSeconds < (86400 * 6)){
        capyMeter.age = 6;
    } else if (ageInSeconds < (86400 * 7)){
        capyMeter.age = 7;
    } else if (ageInSeconds < (86400 * 8)){
        capyMeter.age = 8;
    } else if (ageInSeconds < (86400 * 9)){
        capyMeter.age = 9;
    } else if (ageInSeconds < (86400 * 10)){
        capyMeter.age = 10;
    } else if (ageInSeconds < (86400 * 11)){
        capyMeter.age = 11;
    } else if (ageInSeconds < (86400 * 12)){
        capyMeter.age = 12;
    }  else if (ageInSeconds < (86400 * 13)){
        capyMeter.age = 13;
    }              
}




// Create Variables for all Selectors
const mainScreen = document.querySelector('#main-screen');

const homeMenuItem = document.querySelector('#home');
const foodMenuItem = document.querySelector('#food');
const playMenuItem = document.querySelector('#play');
const medicineMenuItem = document.querySelector('#medicine');

const cleanMenuItem = document.querySelector('#clean');
const statsMenuItem = document.querySelector('#stats');
const disciplineMenuItem = document.querySelector('#discipline');
const attentionMenuItem = document.querySelector('#attention');
const notification = document.querySelector('#bell');

let newInterval;



// Change Main Image Every Hour

function changeMainImage (){
newInterval = setInterval( () => {
        let randomMainImageNumber = Math.floor(Math.random() * 11);
        let randomMainImage = capybaraMainImages[randomMainImageNumber];
        mainScreen.innerHTML = randomMainImage;
    }, 3600000);
}

function clearExistingInterval(){
    clearInterval(newInterval);
}

changeMainImage();





// Create Capybara Bad Behaviour

// Play sound function
function playSound(src) {
    const audio = new Audio(src);
    audio.play();
}

// badBehaviour function: plays buzz.mp3 and decreases discipline every 6 hours
let lastBadBehaviourTime = parseInt(localStorage.getItem("lastBadBehaviour")) || Date.now();
localStorage.setItem("lastBadBehaviour", lastBadBehaviourTime);

function badBehaviour() {
    let currentTime = Date.now();
    let timePassedInMilliseconds = currentTime - lastBadBehaviourTime;

    // 6 hours in milliseconds (21,600,000 milliseconds)
    if (timePassedInMilliseconds >= 21600000) {
        // Play buzz.mp3 sound
        playSound('buzz.mp3'); 

        // Decrease discipline stat
        decreaseStat('discipline');

        checkMeterAndDisplayNotification();

        // Update the last bad behaviour time
        lastBadBehaviourTime = currentTime;
        localStorage.setItem("lastBadBehaviour", lastBadBehaviourTime);
    }
}

// Check the badBehaviour function every hour (3600000 milliseconds)
setInterval(badBehaviour, 3600000);  // Check every hour



// Create Notification function

function checkMeterAndDisplayNotification(){
    if (capyMeter.happy < 3 || capyMeter.health < 3 || capyMeter.hungry < 3 || capyMeter.discipline < 3 ){
        notification.style.color = 'Red';
    } else if (capyMeter.happy < 5 || capyMeter.health < 5 || capyMeter.hungry < 5 || capyMeter.discipline < 5 ){
        notification.style.color = 'DarkOrange';
    } else if (capyMeter.happy > 5 || capyMeter.health > 5 || capyMeter.hungry > 5 || capyMeter.discipline > 5 ){
        notification.style.color = '#000000';
    }    
};

checkMeterAndDisplayNotification();

// Menu Button Event Handlers
homeMenuItem.addEventListener('click', () => {
    changeMainImage();
    let randomMainImageNumber = Math.floor(Math.random() * 10);
    let randomMainImage = capybaraMainImages[randomMainImageNumber];
    mainScreen.innerHTML = randomMainImage;
})

foodMenuItem.addEventListener('click', () => {
    clearExistingInterval();
    increaseStat('hungry');
    increaseStat('happy');
    let randomFoodImageNumber = Math.floor(Math.random() * 3);
    let randomFoodImage = capybaraFoodImages[randomFoodImageNumber];
    mainScreen.innerHTML = randomFoodImage;
})

playMenuItem.addEventListener('click', () => {
    clearExistingInterval();
    increaseStat('happy');
    decreaseStat('discipline');
    let randomPlayImageNumber = Math.floor(Math.random() * 6);
    let randomPlayImage = capybaraPlayImages[randomPlayImageNumber];
    mainScreen.innerHTML = randomPlayImage;
})

medicineMenuItem.addEventListener('click', () => {
    clearExistingInterval();
    increaseStat('health');
    decreaseStat('happy');

    mainScreen.innerHTML = `
    <img src="/img/capybara-cry.gif" class="main-img">
    `;
})

cleanMenuItem.addEventListener('click', () => {
    clearExistingInterval();
    increaseStat('health');
    increaseStat('discipline');
    let randomCleanImageNumber = Math.floor(Math.random() * 2);
    let randomCleanImage = capybaraCleanImages[randomCleanImageNumber];
    mainScreen.innerHTML = randomCleanImage;
})

statsMenuItem.addEventListener('click', () => {
    clearExistingInterval();
    getAge();

    mainScreen.innerHTML = `
    <p>Age: ${capyMeter.age} </p>
    <p>Happy: ${capyMeter.happy} </p>
    <p>Hungry: ${capyMeter.hungry} </p>
    <p>Health: ${capyMeter.health} </p>
    <p>Discipline: ${capyMeter.discipline} </p>
    `;
});

disciplineMenuItem.addEventListener('click', () => {
    clearExistingInterval();
    increaseStat('discipline');
    decreaseStat('happy');
    let randomDisciplineImageNumber = Math.floor(Math.random() * 5);
    let randomDisciplineImage = capybaraDisciplineImages[randomDisciplineImageNumber];
    mainScreen.innerHTML = randomDisciplineImage;
})






