import axios from 'axios';
import { read, utils } from 'xlsx';
import { mockObject } from './mockObject';
import { getCategoryURL } from './constants';

export const fetchData = async (setData, setLoading, setError) => {
  try {
    const url = './data/inscripciones_2022.xlsx';
    const rawData = await axios
      .get(url, { responseType: 'arraybuffer' })
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error al hacer la solicitud:', error);
      });

    const convertedData = new Uint8Array(rawData);

    var arr = new Array();
    for (var i = 0; i != convertedData.length; ++i)
      arr[i] = String.fromCharCode(convertedData[i]);
    var bstr = arr.join('');

    /* Call XLSX */
    var workbook = read(bstr, {
      type: 'binary',
    });

    var first_sheet_name = workbook?.SheetNames[0];
    // /* Get worksheet */
    var worksheet = workbook?.Sheets[first_sheet_name];
    var refinedData = utils.sheet_to_json(worksheet, { raw: true });

    setData(refinedData);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};

export const fetchCurrentData = async ({
  category,
  setData,
  setLoading,
  setError,
}) => {
  const token = import.meta.env.VITE_REACT_APP_AUTH_TOKEN;

  try {
    const url = getCategoryURL(category);

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

    console.log(rawData);
    // TODO: this is for current, tengo que hacer para los excel? o quizas con la api
    const participants = rawData.data
      .filter((rider) => rider.paid === 1)
      .map((obj) => {
        const rider = {
          category: obj.category,
          birthdate: obj.data.birthdate,
          years_old: getAge(obj.data.birthdate),
          country: obj.data.country,
          music: obj.data.music,
          participated_in_omarisquino:
            obj.data.participated_in_omarisquino === '1' ? true : false,
          skateboarding_classes:
            obj.data.skateboarding_classes === '1' ? true : false,
          slug: obj.data.slug,
          sponsors: obj.data.sponsors,
          under_18: obj.data.under_18,
          years_skating: parseInt(obj.data.years_skating),
          first_name: obj.data.first_name,
          last_name: obj.data.last_name,
          uuid: obj.data.uuid,
        };
        return rider;
      });

    setData(participants);
    const localData = JSON.stringify(participants);
    localStorage.setItem('apiData', localData);
    setLoading(false);
  } catch (error) {
    setError(error);
    setLoading(false);
  }
};

export const getNewbies = (data) =>
  data.filter((rider) => !rider.participated_in_omarisquino);

export const getRookies = (data) =>
  data.filter((rider) => rider.years_skating <= 3);

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

export const getRiders = (data) => {
  return data
    ?.map((e) => [
      {
        // age: (e.born_date),
        // age: new Date(e.born_date)
        // age: e.born_date.toString().slice(6),
        country: e.country,
        sport: e.slug,
        paid: e.paid,
      },
    ])
    .flat(1);
};
