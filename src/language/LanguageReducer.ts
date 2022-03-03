export const LanguageReducer = (
  state = localStorage.getItem('language') ?? 'en-US',
  action: any
) => {
  switch (action.type) {
    case 'changeLanguage':
      return action.language;
    default:
      return state;
  }
};
