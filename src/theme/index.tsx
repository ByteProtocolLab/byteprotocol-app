import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { ThemeReducer } from './ThemeReducer';

export enum ThemeType {
  DARK = 'dark',
  LIGHT = 'light'
}

export const themeStore = createStore(ThemeReducer);

themeStore.subscribe(() => {
  document.documentElement.dataset.theme = themeStore.getState();
  localStorage.setItem('theme', themeStore.getState());
});

document.documentElement.dataset.theme =
  localStorage.getItem('theme') ?? ThemeType.LIGHT;

export default function ThemeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return <Provider store={themeStore}>{children}</Provider>;
}
