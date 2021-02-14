let divFavorites = null;
let divNonFavorites = null;

let globalCountries = null;

// Main function
window.addEventListener('load', async (event) => {
  try {
    mapElements();

    globalCountries = await mapCountries(
      'https://restcountries.eu/rest/v2/all'
    );

    render();
  } catch (error) {
    console.error(error);
  }
});

//Services
function mapElements() {
  try {
    divFavorites = document.querySelector('#div-favorites');
    divNonFavorites = document.querySelector('#div-non-favorites');
  } catch (error) {
    throw new Error(`Error while mapping elements: ${error}`);
  }
}

async function fetchJson(url) {
  try {
    const res = await fetch(url);
    const json = await res.json();

    return json;
  } catch (error) {
    throw new Error(`Error while fetching data: ${error}`);
  }
}

async function mapCountries(url) {
  const countries = await fetchJson(url);

  return countries
    .map((country) => {
      const { name, flag, population, numericCode } = country;
      const isFavorite = false;

      return { numericCode, name, flag, population, isFavorite };
    })
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
}

// Render services
function calculateStats(countries) {
  const numberCountries = countries.length;
  const totalPopulation = countries.reduce((accumulator, current) => {
    return accumulator + current.population;
  }, 0);

  return { numberCountries, totalPopulation };
}

function getCountriesByIsFavorite(isFavorite) {
  return globalCountries.filter((country) => {
    return country.isFavorite === isFavorite;
  });
}

function chooseCountriesDiv(countries) {
  const isFavorite = countries.every((country) => {
    return country.isFavorite === true;
  });

  if (isFavorite) {
    return divFavorites;
  }

  return divNonFavorites;
}

function toggleFavorite(index) {
  const { isFavorite } = globalCountries[index];
  globalCountries[index].isFavorite = !isFavorite;
}

function render() {
  try {
    //Stats
    const createPStats = (label = '', value = 0, elementClass = '') => {
      const pStats = document.createElement('p');

      pStats.textContent = `${label}: ${value}`;
      pStats.classList.add('left-align');
      pStats.classList.add(elementClass);

      return pStats;
    };

    const createDivStats = (countries) => {
      const divStats = document.createElement('div');
      const stats = calculateStats(countries);

      const pNumberCountries = createPStats(
        'Countries',
        stats.numberCountries,
        'p-number-countries'
      );

      const pTotalPopulation = createPStats(
        'Total population',
        stats.totalPopulation,
        'p-total-population'
      );

      divStats.appendChild(pNumberCountries);
      divStats.appendChild(pTotalPopulation);

      return divStats;
    };

    //List
    const createButtonToggleFavorite = (country) => {
      const buttonToggleFavorite = document.createElement('button');
      const { isFavorite, numericCode } = country;

      buttonToggleFavorite.id = numericCode;
      buttonToggleFavorite.classList.add('waves-effect', 'waves-ligth', 'btn');
      buttonToggleFavorite.textContent = '★';

      if (isFavorite) {
        buttonToggleFavorite.classList.add('red');
      } else {
        buttonToggleFavorite.classList.add('green');
      }

      buttonToggleFavorite.addEventListener('click', (event) => {
        const { id } = event.target;
        const index = globalCountries.findIndex((country) => {
          return country.numericCode === id;
        });

        toggleFavorite(index);

        render();
      });

      return buttonToggleFavorite;
    };

    const createImgFlag = (country) => {
      const imgFlag = document.createElement('img');
      const { name, flag } = country;

      imgFlag.src = flag;
      imgFlag.alt = name;

      return imgFlag;
    };

    createLiCountryStats = (content, elementClass = '') => {
      const liCountryStats = document.createElement('li');

      liCountryStats.textContent = content;
      liCountryStats.classList.add(elementClass, 'left-align');

      return liCountryStats;
    };

    const createUlCountryStats = (country) => {
      const ulCountryStats = document.createElement('ul');
      const { name, population } = country;
      const ilCountryName = createLiCountryStats(name, 'li-country-name');
      const ilCountryPopulation = createLiCountryStats(
        population,
        'li-country-population'
      );

      ulCountryStats.appendChild(ilCountryName);
      ulCountryStats.appendChild(ilCountryPopulation);

      return ulCountryStats;
    };

    const createLiCountry = (country) => {
      const liCountry = document.createElement('li');

      const buttonToggleFavorite = createButtonToggleFavorite(country);
      const imgFlag = createImgFlag(country);
      const ulCountryStats = createUlCountryStats(country);

      liCountry.appendChild(buttonToggleFavorite);
      liCountry.appendChild(imgFlag);
      liCountry.appendChild(ulCountryStats);
      liCountry.classList.add('horizontal-list');

      return liCountry;
    };

    const createUlCountries = (countries) => {
      const ulCountries = document.createElement('ul');

      countries.map((country) => {
        const liCountry = createLiCountry(country);

        ulCountries.appendChild(liCountry);
      });

      return ulCountries;
    };

    const handleDivCountries = (countries) => {
      let divCountries = chooseCountriesDiv(countries);

      divCountries.textContent = '';

      const divStats = createDivStats(countries);
      const ulCountries = createUlCountries(countries);

      divCountries.appendChild(divStats);
      divCountries.appendChild(ulCountries);

      divCountries.classList.add('div-countries');
    };

    // Divide between favorites and non favorites
    const nonFavoriteCountries = getCountriesByIsFavorite(false);
    const favoriteCountries = getCountriesByIsFavorite(true);

    // Generate both favorite and non favorite divs
    handleDivCountries(nonFavoriteCountries);
    handleDivCountries(favoriteCountries);
  } catch (error) {
    throw new Error(`Error while rendering: ${error}`);
  }
}
