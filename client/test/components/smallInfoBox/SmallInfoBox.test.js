import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SmallInfoBox } from '../../../src/components/smallInfoBox/SmallInfoBox';

describe('SmallInfoBox', () => {
  it('renders name as title', () => {
    render(<SmallInfoBox name="First Last" />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(
      'First Last'
    );
  });

  it('renders diferent name as title', () => {
    render(<SmallInfoBox name="Diferent Last" />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toMatch(
      'Diferent Last'
    );
  });

  it('renders description as paragraph', () => {
    render(<SmallInfoBox info="Lorem ipsum" />);
    expect(screen.getByText('Lorem ipsum')).toBeInTheDocument();
  });

  it('renders diferent description as paragraph', () => {
    render(<SmallInfoBox info="Ipsum Lorem" />);
    expect(screen.getByText('Ipsum Lorem')).toBeInTheDocument();
  });
});
