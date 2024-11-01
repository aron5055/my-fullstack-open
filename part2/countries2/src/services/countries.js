import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

export const getAll = () => {
  const url = `${baseUrl}/all`;
  return axios.get(url).then((response) => response.data);
};

export const getCountry = (name) => {
  const url = `${baseUrl}/name/${name.toLowerCase()}`;
  return axios.get(url).then((response) => response.data);
};
