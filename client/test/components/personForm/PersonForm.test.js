import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PersonForm } from '../../../src/components/personForm/PersonForm';

describe('PersonForm', () => {
  it('render heading', () => {
    render(<PersonForm />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toEqual(
      'Add Person'
    );
  });
});
