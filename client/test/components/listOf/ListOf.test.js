import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { ListOf } from '../../../src/components/listOf/ListOf';

describe('ListOf', () => {
  it('render title', () => {
    render(<ListOf of="children" />);

    expect(screen.getByRole('heading', { level: 2 }).textContent).toEqual(
      'List of all children'
    );
  });

  it('render diferent title', () => {
    render(<ListOf of="therapeutist" />);

    expect(screen.getByRole('heading', { level: 2 }).textContent).toEqual(
      'List of all therapeutist'
    );
  });
});
