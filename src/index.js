import React from 'react';
import {render} from 'react-dom';
import Demo from './js/demo';

import './sass/main.sass';

const DOMrender = () => render(<Demo />, document.getElementById('root'));

DOMrender();

if (module.hot) {
  module.hot.accept();
}
