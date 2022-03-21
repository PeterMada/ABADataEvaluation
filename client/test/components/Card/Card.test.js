import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '../../../src/components/card/Card';

describe('Card', () => {
  it('render title', () => {
    const child = {
      child_first_name: 'FirstName',
      child_last_name: 'LastName',
    };
    render(<Card child={child} />);

    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 }).textContent).toEqual(
      'FirstName LastName'
    );
  });
});
