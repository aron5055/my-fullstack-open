import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios
    .get(baseUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

const create = (newPerson) => {
  return axios
    .post(baseUrl, newPerson)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

const deletePerson = (id) => {
  const url = `${baseUrl}/${id}`;
  return axios
    .delete(url)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

const update = (id, newObject) => {
  const url = `${baseUrl}/${id}`;
  return axios
    .put(url, newObject)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export default { getAll, create, deletePerson, update };
