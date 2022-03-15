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

  it('render form', () => {
    render(<PersonForm />);
    expect(screen.getByTestId('addPerson')).toBeInTheDocument();
  });

  it('renders a input field for first name', () => {
    render(<PersonForm />);
    const firstNameField = screen.getByLabelText('First Name');
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField.id).toEqual('firstName');
    expect(firstNameField.type).toEqual('text');
  });

  it('renders a input field for last name', () => {
    render(<PersonForm />);
    const lastNameField = screen.getByLabelText('Last Name');
    expect(lastNameField).toBeInTheDocument();
    expect(lastNameField.id).toEqual('lastName');
    expect(lastNameField.type).toEqual('text');
  });
});
