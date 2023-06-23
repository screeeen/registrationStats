import axios from 'axios';
import {
  ALL,
  MINI,
  STREETMEN,
  STREETWO,
  STREETMINIMEN,
  STREETMINIWO,
  ALLSTREETMEN,
  ALLSTREETWO,
  ALLMINI,
} from './constants';

export const fetchCurrentData = async ({
  category,
  setData,
  setLoading,
  setError,
}) => {
  try {
    const url = import.meta.env.VITE_REACT_APP_URL_SKATE;
    const token = import.meta.env.VITE_REACT_APP_AUTH_TOKEN;

    const rawData = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error al hacer la solicitud:', error);
      });

    console.log(category);
    const categorisedData = getCategorizedData(rawData, category);

    setData(categorisedData);
    const localData = JSON.stringify(categorisedData);
    localStorage.setItem('apiData', localData);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};

const getCategorizedData = (rawData, category) => {
  console.log(category);
  switch (category) {
    case ALL:
      return rawData;
    case MINI:
    case STREETMEN:
    case STREETWO:
    case STREETMINIWO:
    case STREETMINIMEN:
      return rawData.filter((rider) => rider.category === category);
    case ALLSTREETMEN:
      return rawData.filter((rider) => rider.category.includes(STREETMEN));
    case ALLSTREETWO:
      return rawData.filter((rider) => rider.category.includes(STREETWO));
    case ALLMINI:
      return rawData.filter((rider) => rider.category.includes(MINI));
  }
};

export const getNewbies = (data) =>
  data.filter((rider) => !rider.data.participated_in_omarisquino);

export const getRookies = (data) =>
  data.filter((rider) => rider.data.years_skating <= 3);

export const getAge = (birthdate) => {
  const birthdateFormatted = new Date(birthdate);
  const currentDate = new Date();

  let edad = currentDate.getFullYear() - birthdateFormatted.getFullYear();

  const mesActual = currentDate.getMonth();
  const diaActual = currentDate.getDate();
  const mesNacimiento = birthdateFormatted.getMonth();
  const diaNacimiento = birthdateFormatted.getDate();

  if (
    mesActual < mesNacimiento ||
    (mesActual === mesNacimiento && diaActual < diaNacimiento)
  ) {
    edad--;
  }

  return edad;
};
