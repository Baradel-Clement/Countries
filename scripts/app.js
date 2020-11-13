getCountries();

async function getCountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await res.json();

    displayCountries(countries);
}

function displayCountries(countries) {
    const countryCard = document.querySelectorAll('.country-card');
    countries.forEach(country => {
        
    })
}


//Display detail 
function onClickCountryCard(card) {
    const countryCard = document.querySelectorAll('.country-card')
    const countriesCards = document.querySelector('.countries-cards')
    const searchFilter = document.querySelector('.search-filter')
    const countryDetail = card.lastElementChild;
    
    if (!(card.classList.contains('card-detail'))) {
        countryCard.forEach(element => element.classList.toggle('card-detail-out'));
        card.classList.remove('card-detail-out')
        card.classList.toggle('card-detail');
        countriesCards.classList.toggle('card-detail');
        searchFilter.classList.toggle('card-detail-out');
        countryDetail.classList.toggle('active');
    }
}

//Dark mode
function darkMode(darkModeBtn) {
    const dropdownTitle = document.querySelector('.dropdown-title');
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    const dropdownContent = document.querySelector('.dropdown-content');
    const searchBar = document.getElementById('search-bar');
    const glass = document.getElementById('glass')
    const allDarkMode = [dropdownTitle, body, header, nav, dropdownContent, searchBar, glass]
    const dropdownFilters = document.querySelectorAll('.dropdown-filter');
    const countryCardDesc = document.querySelectorAll('.country-card-desc')
    const countryCard = document.querySelectorAll('.country-card')
    const backButton = document.querySelectorAll('.back-button')

    countryCardDesc.forEach(element => element.classList.toggle('dark-mode'));
    countryCard.forEach(element => element.classList.toggle('dark-mode'));
    allDarkMode.forEach(element => element.classList.toggle('dark-mode'));
    dropdownFilters.forEach(element => element.classList.toggle('dark-mode'));
    backButton.forEach(element => element.classList.toggle('dark-mode'));
}



function dropdownBtn() {
    const dropdownContent = document.querySelector('.dropdown-content');
    const dropdownTitle = document.querySelector('.dropdown-title')
    dropdownTitle.classList.toggle('active')
    dropdownContent.classList.toggle('active')
}

function dropdownFilter(data) {
    const dropdownTitle = document.querySelector('.dropdown-title')
    if (data.innerHTML == dropdownTitle.innerHTML) {
        dropdownTitle.innerHTML = 'Filter by Region';
        dropdownTitle.classList.remove('bold700')
    } else {
        dropdownTitle.innerHTML = data.innerHTML;
        dropdownTitle.classList.add('bold700');
    }
}