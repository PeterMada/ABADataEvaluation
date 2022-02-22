import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '../src/App';

describe('App', () => {
  it('renders root component', () => {
    const component = <App />;
    const container = document.createElement('div');
    document.body.appendChild(container);
    ReactDOM.render(component, container);
    expect(document.getElementById('root')).not.toBeNull();
  });
});
