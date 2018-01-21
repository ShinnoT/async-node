const axios = require("axios");

// const getExchanceRate = (from, to) => {
//   // DONT FORGET TO RETURN GET REQUEST BY AXIOS
//   // NOT JUST PROMISE RESOLVE AND REJECT
//   return axios
//     .get(`https://api.fixer.io/latest?base=${from}`)
//     .then(response => {
//       let exchangeRates = response.data.rates;
//       return exchangeRates[to];
//       // cannot do this: currencies.rates.to;
//     })
//     .catch(error => {
//       return error;
//     });
// };

// async es7 syntax for getExchangeRate function
const getExchanceRate = async (from, to) => {
  const exchangeRates = await axios.get(
    `https://api.fixer.io/latest?base=${from}`
  );
  if (!exchangeRates) {
    throw new Error("unable to fetch exchange rate");
  }

  return exchangeRates.data.rates[to];
};

// const getCountries = currencyCode => {
//   return axios
//     .get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
//     .then(response => {
//       return response.data.map(country => {
//         return country.name;
//       });
//     })
//     .catch(error => {
//       return error;
//     });
// };

// async es7 for getCountries function
const getCountries = async currencyCode => {
  const countries = await axios.get(
    `https://restcountries.eu/rest/v2/currency/${currencyCode}`
  );
  if (!countries) {
    throw new Error();
  }
  return countries.data.map(country => {
    return country.name;
  });
};

// const convertCurrency = (from, to, amount) => {
//   let countries;
//   return getCountries(to)
//     .then(tempCountries => {
//       countries = tempCountries;
//       return getExchanceRate(from, to);
//     })
//     .then(rate => {
//       const exchangedAmount = amount * rate;
//       return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(
//         ", "
//       )}`;
//     });
// };

// promise returns using new asunc await ES7 syntax
const convertCurrency = async (from, to, amount) => {
  let countries = await getCountries(to);
  let rate = await getExchanceRate(from, to);
  let exchangedAmount = amount * rate;
  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(
    ", "
  )}`;
};

convertCurrency("USD", "JPY", 500)
  .then(valueAfterExchange => {
    console.log(valueAfterExchange);
  })
  .catch(error => {
    console.log(error);
  });
