import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import 'whatwg-fetch';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ToastContainer } from 'react-toastify';
import { AddChild } from '../../../src/components/addChild/AddChild';

describe('AddChild', () => {
  const checkFormField = (labelText, name, type = 'text') => {
    const firstNameField = screen.getByLabelText(labelText);
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField.id).toEqual(name);
    expect(firstNameField.type).toEqual(type);
  };

  const isThereErrorOnEmptyInputBlur = async (labelText, errorText) => {
    it(`displays error after blur when ${labelText} field is blank`, async () => {
      render(<AddChild />);
      await fireEvent.focus(screen.getByLabelText(labelText));
      await fireEvent.blur(screen.getByLabelText(labelText));
      await waitFor(() =>
        expect(screen.getByText(errorText)).toBeInTheDocument()
      );
    });
  };

  it('render heading', () => {
    render(<AddChild />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toEqual(
      'Add Child'
    );
  });

  it('render a form', () => {
    render(<AddChild />);
    expect(screen.getByTestId('addChildForm')).toBeInTheDocument();
  });

  describe('first name', () => {
    it('renders an input', () => {
      render(<AddChild />);
      checkFormField('First Name', 'firstName');
    });

    isThereErrorOnEmptyInputBlur(
      'First Name',
      'First name field is required'
    );
  });

  describe('last name', () => {
    it('renders an input', () => {
      render(<AddChild />);
      checkFormField('Last Name', 'lastName');
    });

    isThereErrorOnEmptyInputBlur(
      'Last Name',
      'Last name field is required'
    );
  });

  describe('child code', () => {
    it('renders an input', () => {
      render(<AddChild />);
      checkFormField('Child Code', 'childCode');
    });
  });

  describe('sex', () => {
    beforeEach(() => {
      render(<AddChild />);
    });
    it('show select field', () => {
      const sexField = screen.getByLabelText('Sex');
      expect(sexField).toBeInTheDocument();
      expect(sexField.id).toEqual('sex');
      expect(sexField.type).toEqual('select-one');
    });

    it('default value is empty', () => {
      const sexField = screen.getByLabelText('Sex');
      expect(sexField.firstChild.value).toEqual('');
    });

    it('has two gender options', () => {
      const sexField = screen.getByLabelText('Sex');
      expect(sexField.children.length).toEqual(3);
      expect(sexField.children[1].value).toEqual('Woman');
      expect(sexField.children[2].value).toEqual('Man');
    });
  });

  describe('date of birth', () => {
    it('shows field', () => {
      render(<AddChild />);
      const dobField = screen.getByLabelText('Date of Birth');

      expect(dobField).toBeInTheDocument();
      expect(dobField.id).toEqual('dateOfBirth');
      expect(dobField.type).toEqual('date');
    });
  });

  describe('diagnosis', () => {
    it('shows field', () => {
      render(<AddChild />);
      checkFormField('Diagnosis', 'diagnosis');
    });
  });

  it('has submit button', () => {
    render(<AddChild />);
    const submitButton = screen.getByRole('button', 'submit');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toEqual('Add');
  });

  it('has disabled submit button on load', () => {
    render(<AddChild />);
    const submitButton = screen.getByRole('button', 'submit');
    expect(submitButton).toBeDisabled();
  });
});
