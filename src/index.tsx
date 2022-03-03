import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import BaseRoute from './router/BaseRoute';
import LanguageProvider from './i18n';
import ThemeProvider from './theme';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <BaseRoute />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
