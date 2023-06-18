export const CATEGORIES = [
  'STREETMINIMEN',
  'STREETMINIWO',
  'STREETMEN',
  'STREETWO',
  'MINI',
];

export const getCategoryURL = (category) => {
  switch (category) {
    case 'STREETMINIMEN':
      return import.meta.env.VITE_REACT_APP_URL_STREETMINIMEN;
      break;
    case 'STREETMINIWO':
      return import.meta.env.VITE_REACT_APP_URL_STREETMINIWO;
      break;
    case 'STREETMEN':
      return import.meta.env.VITE_REACT_APP_URL_STREETMEN;
      break;
    case 'STREETWO':
      return import.meta.env.VITE_REACT_APP_URL_STREETWO;
      break;
    case 'MINI':
      return import.meta.env.VITE_REACT_APP_URL_MINI;
      break;
  }
};
