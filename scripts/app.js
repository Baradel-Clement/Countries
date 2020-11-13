getCountries();

async function getCountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await res.json();

    displayCountries(countries);
}

function displayCountries(countries) {
    const countriesCards = document.getElementById('countriesCards');
    countriesCards.innerHTML = ''
    countries.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('country-card');
        countryEl.setAttribute('onclick', 'onClickCountryCard(this)');
        countryEl.innerHTML = `
        <span class="country-card-img"></span>
        <div class="country-card-desc">
            <p class="card-countries-title country-name"></p>
            <p class="card-desc bold600">Population:<span class="card-desc population"></span></p>
            <p class="card-desc bold600">Region:<span class="card-desc region"></span></p>
            <p class="card-desc bold600">Capital:<span class="card-desc capital"></span></p>
        </div>
        <div class="country-card-desc-detail">
            <a class="back-button bold300" href="/index.html">Back</a>
            <div class="detail-wrap-title">
                <p class="detail-title country-name"></p>
            </div>
            <div class="detail-desc-wrap">
                <div class="detail-desc-wrap-left">
                    <p class="detail-desc bold600">Native Name: <span id="native-name" class="card-desc"></span></p>
                    <p class="detail-desc bold600">Population: <span class="card-desc population"></span></p>
                    <p class="detail-desc bold600">Region: <span class="card-desc region"></span></p>
                    <p class="detail-desc bold600">Sub Region: <span id="sub-region" class="card-desc"></span></p>
                    <p class="detail-desc bold600">Capital: <span class="card-desc capital"></span></p>
                </div>
                <div class="detail-desc-wrap-right">
                    <p class="detail-desc bold600">Top Level Domain: <span class="card-desc" id="domain"></span></p>
                    <p class="detail-desc bold600">Currencies: <span id="currencies" class="card-desc"></span></p>
                    <p class="detail-desc bold600">Languages: <span id="languages" class="card-desc"></span></p>
                </div>
            </div>
            <div class="detail-border-wrap">
                <p class="detail-desc bold700">Border Countries: <span id="border-countries" class="card-desc"></span></p>
            </div>
        </div>
        `;
        countriesCards.appendChild(countryEl)
    });
    // Adjust height of container
    const countriesCardsLengthNum = 411 * (Math.round(countries.length / 4));
    const countriesCardsLength = countriesCardsLengthNum.toString();
    countriesCards.style.height = countriesCardsLength + "px"

    //Blank card
    const blankCard = document.createElement('div');
    blankCard.classList.add('blank-card');
    let i = 0
    if ((countries.length % 4) == 1) {
        countriesCards.appendChild(blankCard);
        console.log(1)
    } else if ((countries.length % 4) == 2) {
        while (i != 2) {
            countriesCards.appendChild(blankCard);
        }
        console.log(2)
    } else if ((countries.length % 4) == 3) {
        countriesCards.appendChild(blankCard);
        countriesCards.appendChild(blankCard);
        countriesCards.appendChild(blankCard);
        console.log(3)
    }
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