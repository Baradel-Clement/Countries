getCountries();

 async function getCountries() {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await res.json();

    displayCountries(countries)
}

function populationComma(str, n) {
    var ret = [];
    var i;
    var len;

    for(len = str.length, i = len; i > 0; i--) {
        ret.push(str.substr(i, n))
    }
    return ret
}

function displayCountries(countries) {
    const countriesCards = document.getElementById('countriesCards');
    countriesCards.innerHTML = '';
    countries.forEach(country => {
        const countryEl = document.createElement('div');
        countryEl.classList.add('country-card');
        countryEl.setAttribute('onclick', 'onClickCountryCard(this)');
        let countryPopulation = (country.population).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        let curr = country.currencies.forEach(element =>{ const la =  element.name})
        countryEl.innerHTML = `
        <span style="background-image: url(${country.flag}); background-size: 100%; background-repeat: no-repeat;" class="country-card-img"></span>
        <div class="country-card-desc">
            <p class="card-countries-title country-name">${country.name}</p>
            <p class="card-desc bold600">Population:<span class="card-desc population"> ${countryPopulation}</span></p>
            <p class="card-desc bold600">Region:<span class="card-desc region"> ${country.region}</span></p>
            <p class="card-desc bold600">Capital:<span class="card-desc capital"> ${country.capital}</span></p>
        </div>
        <div class="country-card-desc-detail">
            <a class="back-button bold300" href="/index.html">Back</a>
            <div class="detail-wrap-title">
                <p class="detail-title country-name"> ${country.name}</p>
            </div>
            <div class="detail-desc-wrap">
                <div class="detail-desc-wrap-left">
                    <p class="detail-desc bold600">Native Name: <span id="native-name" class="card-desc"> ${country.nativeName}</span></p>
                    <p class="detail-desc bold600">Population: <span class="card-desc population">${countryPopulation}</span></p>
                    <p class="detail-desc bold600">Region: <span class="card-desc region">${country.region}</span></p>
                    <p class="detail-desc bold600">Sub Region: <span id="sub-region" class="card-desc">${country.subregion}</span></p>
                    <p class="detail-desc bold600">Capital: <span class="card-desc capital">${country.capital}</span></p>
                </div>
                <div class="detail-desc-wrap-right">
                    <p class="detail-desc bold600">Top Level Domain: <span class="card-desc" id="domain"> ${country.topLevelDomain}</span></p>
                    <p class="detail-desc bold600">Currencies: <span id="currencies" class="card-desc">${country.currencies.forEach(element => element.name)} </span></p>
                    <p class="detail-desc bold600">Languages: <span id="languages" class="card-desc"> ${country.capital}</span></p>
                </div>
            </div>
            <div class="detail-border-wrap">
                <p class="detail-desc bold700">Border Countries: <span id="border-countries" class="card-desc">${country.capital}</span></p>
            </div>
        </div>
        `;
        countriesCards.appendChild(countryEl)
    });

    // Adjust height of container

    let desktopView = false;
    let tabletView = false;

    if (window.matchMedia("(min-width: 1300px)").matches) {
        const countriesCardsLengthNum = 411 * (Math.round(countries.length / 4));
        const countriesCardsLength = countriesCardsLengthNum.toString();
        countriesCards.style.height = countriesCardsLength + "px";
        desktopView = true;
    } else if ((window.matchMedia("(max-width: 1300px)").matches) &&
    (window.matchMedia("(min-width: 768px)").matches)) {
        const countriesCardsLengthNum = 411 * (Math.round(countries.length / 2));
        const countriesCardsLength = countriesCardsLengthNum.toString();
        countriesCards.style.height = countriesCardsLength + "px";
        tabletView = true;
    } else if (window.matchMedia("(max-width: 768px)").matches) {
        const countriesCardsLengthNum = 411 * (Math.round(countries.length / 1));
        const countriesCardsLength = countriesCardsLengthNum.toString();
        countriesCards.style.height = countriesCardsLength + "px";
    }

    //Blank card for fill last row

    if (desktopView) {
        if ((countries.length % 4) == 1) {
            countriesCards.appendChild(document.createElement('div'));
        } else if ((countries.length % 4) == 2) {
            countriesCards.appendChild(document.createElement('div'));
            countriesCards.appendChild(document.createElement('div'));
        } else if ((countries.length % 4) == 3) {
            countriesCards.appendChild(document.createElement('div'));
            countriesCards.appendChild(document.createElement('div'));
            countriesCards.appendChild(document.createElement('div'));
        }
    } else if(tabletView) {
        if ((countries.length % 4) == 1) {
            countriesCards.appendChild(document.createElement('div'));
        }
    }

    const lastBlankCard = countriesCards.lastElementChild;

    if (lastBlankCard.classList == "") {
        lastBlankCard.classList.add('blank-card');
    }
    if (lastBlankCard.previousElementSibling.classList == "") {
        lastBlankCard.previousElementSibling.classList.add('blank-card')
    }
    if (lastBlankCard.previousElementSibling.previousElementSibling == "") {
        lastBlankCard.previousElementSibling.previousElementSibling.classList.add('blank-card')
    }
}


//Display detail 
function onClickCountryCard(card) {
    const countryCard = document.querySelectorAll('.country-card')
    const countriesCards = document.getElementById('countriesCards');
    const searchFilter = document.querySelector('.search-filter')
    const countryDetail = card.lastElementChild;
    
    countriesCards.style.height = "686px"
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