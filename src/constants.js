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
      return 'https://api.xn--omarisquio-19a.com/sports/3/registrationForms/27/registrations?';
      break;
    case 'STREETMINIWO':
      return 'https://api.xn--omarisquio-19a.com/sports/3/registrationForms/26/registrations?';
      break;
    case 'STREETMEN':
      return 'https://api.xn--omarisquio-19a.com/sports/3/registrationForms/2/registrations?';
      break;
    case 'STREETWO':
      return 'https://api.xn--omarisquio-19a.com/sports/3/registrationForms/24/registrations?';
      break;
    case 'MINI':
      return 'https://api.xn--omarisquio-19a.com/sports/3/registrationForms/25/registrations?';
      break;
  }
};
