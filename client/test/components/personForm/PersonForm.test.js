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

  const isThereErrorOnInputBlur = async (labelText, errorText) => {
    it('displays error after blur when first name field is blank', async () => {
      render(<PersonForm />);
      await fireEvent.focus(screen.getByLabelText(labelText));
      await fireEvent.blur(screen.getByLabelText(labelText));
      await waitFor(() =>
        expect(screen.getByText(errorText)).toBeInTheDocument()
      );
    });
  };

  const isThereNoErrorMessageOnSomeTextInInput = async (
    labelText,
    errorText
  ) => {
    it('remove error when there is some value in input', async () => {
      render(<PersonForm />);
      const labelField = screen.getByLabelText(labelText);
      fireEvent.focus(labelField);
      fireEvent.blur(labelField);

      await waitFor(() =>
        expect(screen.getByText(errorText)).toBeInTheDocument()
      );

      fireEvent.change(labelField, { target: { value: '23' } });

      await waitForElementToBeRemoved(() => screen.queryByText(errorText));

      expect(screen.queryByText(errorText)).not.toBeInTheDocument();
    });
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

  describe('first name', () => {
    it('renders a input field', () => {
      render(<PersonForm />);
      renderForm('First Name', 'firstName');
    });

    isThereErrorOnInputBlur('First Name', 'First name field is required');
    isThereNoErrorMessageOnSomeTextInInput(
      'First Name',
      'First name field is required'
    );
  });

  describe('last name', () => {
    it('renders a input field', () => {
      render(<PersonForm />);
      renderForm('Last Name', 'lastName');
    });

    isThereErrorOnInputBlur('First Name', 'First name field is required');
    isThereNoErrorMessageOnSomeTextInInput(
      'Last Name',
      'Last name field is required'
    );
  });

  describe('title before name', () => {
    it('renders a input field', () => {
      render(<PersonForm />);
      renderForm('Titles before name', 'beforeNameTitle');
    });
  });

  describe('title after name', () => {
    it('renders a input field', () => {
      render(<PersonForm />);
      renderForm('Titles after name', 'afterNameTitle');
    });
  });

  describe('email field', () => {
    it('renders a input field', () => {
      render(<PersonForm />);
      renderForm('Email', 'email', 'email');
    });
  });

  describe('email check field', () => {
    it('renders a input field', () => {
      render(<PersonForm />);
      renderForm('Email confirmation', 'emailConfirm', 'email');
    });
  });
});
