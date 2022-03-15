import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { PersonForm } from '../../../src/components/personForm/PersonForm';

describe('PersonForm', () => {
  const renderForm = (labelText, name, type = 'text') => {
    const firstNameField = screen.getByLabelText(labelText);
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField.id).toEqual(name);
    expect(firstNameField.type).toEqual(type);
  };

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
    renderForm('First Name', 'firstName');
  });

  it('renders a input field for last name', () => {
    render(<PersonForm />);
    renderForm('Last Name', 'lastName');
  });

  it('renders a input field for before name titles', () => {
    render(<PersonForm />);
    renderForm('Titles before name', 'beforeNameTitle');
  });

  it('renders a input field for titles after name', () => {
    render(<PersonForm />);
    renderForm('Titles after name', 'afterNameTitle');
  });

  it('renders a input field for email', () => {
    render(<PersonForm />);
    renderForm('Email', 'email', 'email');
  });

  it('renders a input field for email confirmation', () => {
    render(<PersonForm />);
    renderForm('Email confirmation', 'emailConfirm', 'email');
  });

  it('displays error after blur when first name field is blank', async () => {
    render(<PersonForm />);

    await fireEvent.focus(screen.getByLabelText('First Name'));
    await fireEvent.blur(screen.getByLabelText('First Name'));
    await waitFor(() =>
      expect(
        screen.getByText('First name field is required')
      ).toBeInTheDocument()
    );
  });

  it('hide error when there is some value in input', async () => {
    render(<PersonForm />);
    const firstNameField = screen.getByLabelText('First Name');
    fireEvent.focus(firstNameField);
    fireEvent.blur(firstNameField);

    await waitFor(() =>
      expect(
        screen.getByText('First name field is required')
      ).toBeInTheDocument()
    );

    fireEvent.change(firstNameField, { target: { value: '23' } });

    await waitForElementToBeRemoved(() =>
      screen.queryByText('First name field is required')
    );

    expect(
      screen.queryByText('First name field is required')
    ).not.toBeInTheDocument();
  });

  it('displays error after blur when last name field is blank', async () => {
    render(<PersonForm />);

    await fireEvent.focus(screen.getByLabelText('Last Name'));
    await fireEvent.blur(screen.getByLabelText('Last Name'));
    await waitFor(() =>
      expect(
        screen.getByText('Last name field is required')
      ).toBeInTheDocument()
    );
  });
});
