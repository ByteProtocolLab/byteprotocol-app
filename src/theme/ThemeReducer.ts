import { ThemeType } from '.';

export const ThemeReducer = (
  state = localStorage.getItem('theme') ?? ThemeType.LIGHT,
  action: any
) => {
  switch (action.type) {
    case 'changeTheme':
      return action.theme;
    default:
      return state;
  }
};
