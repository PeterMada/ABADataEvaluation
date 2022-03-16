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

  const isThereErrorOnEmptyInputBlur = async (labelText, errorText) => {
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

    isThereErrorOnEmptyInputBlur(
      'First Name',
      'First name field is required'
    );
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

    isThereErrorOnEmptyInputBlur(
      'First Name',
      'First name field is required'
    );
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

    it('show error on incorrect format', async () => {
      render(<PersonForm />);
      const emailField = screen.getByLabelText('Email');
      fireEvent.change(emailField, { target: { value: '123' } });
      fireEvent.blur(emailField);

      await waitFor(() =>
        expect(
          screen.queryByText('Invalid email address')
        ).toBeInTheDocument()
      );
    });

    isThereErrorOnEmptyInputBlur('Email', 'Email field is required');
  });

  describe('email confirm field', () => {
    it('renders a input field', () => {
      render(<PersonForm />);
      renderForm('Email confirmation', 'emailConfirm', 'email');
    });

    it('show error on incorrect format', async () => {
      render(<PersonForm />);
      const emailField = screen.getByLabelText('Email confirmation');
      fireEvent.change(emailField, { target: { value: '123' } });
      fireEvent.blur(emailField);

      await waitFor(() =>
        expect(
          screen.queryByText('Invalid email address')
        ).toBeInTheDocument()
      );
    });

    isThereErrorOnEmptyInputBlur(
      'Email confirmation',
      'Email confirmation field is required'
    );
  });

  it('should render error when there is no the same value in email fields', async () => {
    render(<PersonForm />);
    const emailField = screen.getByLabelText('Email');
    const emailConfirmField = screen.getByLabelText('Email confirmation');

    fireEvent.change(emailField, { target: { value: '123' } });
    fireEvent.change(emailConfirmField, {
      target: { value: '987' },
    });

    fireEvent.blur(emailConfirmField);

    await waitFor(() =>
      expect(screen.queryByText('Email Not Matching')).toBeInTheDocument()
    );
  });

  it('has a submit button', () => {
    render(<PersonForm />);
    const submitButton = screen.getByRole('button', 'submit');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toEqual('Add');
  });

  it('has disabled submit button on load', () => {
    render(<PersonForm />);
    const submitButton = screen.getByRole('button', 'submit');
    expect(submitButton).toBeDisabled();
  });

  it('shows loading button when form is submitting', async () => {
    render(<PersonForm />);
    const firstNameField = screen.getByLabelText('First Name');
    const lastNameField = screen.getByLabelText('Last Name');
    const emailField = screen.getByLabelText('Email');
    const emailConfirmField = screen.getByLabelText('Email confirmation');

    fireEvent.change(firstNameField, { target: { value: 'FirstName' } });
    fireEvent.change(lastNameField, { target: { value: 'LastName' } });
    fireEvent.change(emailField, { target: { value: 'test@test.tt' } });
    fireEvent.change(emailConfirmField, {
      target: { value: 'test@test.tt' },
    });

    fireEvent.click(screen.getByRole('button', 'submit'));

    await waitFor(() =>
      expect(screen.getByText('Processing...')).toBeInTheDocument()
    );
  });
});
