import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { Register } from '../../../src/components/register/Register';
require('dotenv').config();

describe('Register', () => {
  const checkFormField = (labelText, name, type = 'text') => {
    const field = screen.getByLabelText(labelText);
    expect(field).toBeInTheDocument();
    expect(field.id).toEqual(name);
    expect(field.type).toEqual(type);
  };

  const isThereErrorOnEmptyInputBlur = async (labelText, errorText) => {
    it('displays error after blur when field is blank', async () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );
      await fireEvent.focus(screen.getByLabelText(labelText));
      await fireEvent.blur(screen.getByLabelText(labelText));
      await waitFor(() =>
        expect(screen.getByText(errorText)).toBeInTheDocument()
      );
    });
  };

  it('render heading', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { level: 1 }).textContent).toEqual(
      'Register'
    );
  });

  it('render form', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByTestId('registerForm')).toBeInTheDocument();
  });

  describe('first name', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );
      checkFormField('First Name', 'firstName');
    });

    isThereErrorOnEmptyInputBlur(
      'First Name',
      'First name field is required'
    );
  });
});
