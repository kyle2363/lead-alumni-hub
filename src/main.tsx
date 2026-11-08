import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { initialDesign } from './design';
import '@fontsource-variable/lora';
import '@fontsource-variable/literata';
import '@fontsource-variable/public-sans';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/dm-sans';
import './styles.css';
import './shared.css';
import './theme.css';
import './cafe.css';
import './studio.css';

// Set the design before the first paint so there is no flash of the wrong theme.
document.documentElement.dataset.design = initialDesign();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><HashRouter><App /></HashRouter></React.StrictMode>,
);
