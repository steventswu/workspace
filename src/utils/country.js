import countriesList from './countriesList.json';

export const COUNTRIESLIST = countriesList.countries;

export const COUNTRY = COUNTRIESLIST.map(value => ({ country: value.country }));

console.log(COUNTRY);
