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
import { Register } from '../../../src/components/register/register';
import { ToastContainer } from 'react-toastify';
import 'whatwg-fetch';
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

  const thereIsNoErrorMessageOnSomeTextInInput = async (
    labelText,
    errorText
  ) => {
    it('remove error when there is some value in input', async () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );
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

    thereIsNoErrorMessageOnSomeTextInInput(
      'First Name',
      'First name field is required'
    );
  });

  describe('last name', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );
      checkFormField('Last Name', 'lastName');
    });

    isThereErrorOnEmptyInputBlur(
      'Last Name',
      'Last name field is required'
    );

    thereIsNoErrorMessageOnSomeTextInInput(
      'Last Name',
      'Last name field is required'
    );
  });

  describe('email field', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );
      checkFormField('Email', 'email', 'email');
    });

    it('show error on incorrect format', async () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );
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

  describe('password', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );
      checkFormField('Password', 'password', 'password');
    });

    isThereErrorOnEmptyInputBlur(
      'Password',
      'Password Field Cannot be empty'
    );

    it('shows error on password with small length', async () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );

      const passwordField = screen.getByLabelText('Password');
      fireEvent.change(passwordField, { target: { value: '123' } });
      fireEvent.blur(passwordField);

      await waitFor(() =>
        expect(
          screen.queryByText('Password must be 8 characters long')
        ).toBeInTheDocument()
      );
    });
  });

  describe('password confirm', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );
      checkFormField('Confirm Password', 'passwordConfirm', 'password');
    });

    isThereErrorOnEmptyInputBlur(
      'Confirm Password',
      'Confirm Password Field Cannot be empty'
    );

    it('shows error when passowrds does not match', async () => {
      render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );

      const passwordField = screen.getByLabelText('Password');
      const passwordConfirmField =
        screen.getByLabelText('Confirm Password');
      fireEvent.change(passwordField, { target: { value: 'asdf123456' } });
      fireEvent.change(passwordConfirmField, {
        target: { value: '123456asdf' },
      });
      fireEvent.blur(passwordConfirmField);

      await waitFor(() =>
        expect(
          screen.queryByText('Password must be matching')
        ).toBeInTheDocument()
      );
    });
  });

  it('has submit button', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', 'submit');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toEqual('Register');
  });

  describe('submiting', () => {
    const fillFormWithRightValues = () => {
      const firstName = screen.getByLabelText('First Name');
      const lastName = screen.getByLabelText('Last Name');
      const email = screen.getByLabelText('Email');
      const passwordField = screen.getByLabelText('Password');
      const passwordConfirmField =
        screen.getByLabelText('Confirm Password');
      const submitButton = screen.getByRole('button', 'submit');
      fireEvent.change(firstName, {
        target: { value: 'FirstName' },
      });
      fireEvent.change(lastName, { target: { value: 'LastName' } });
      fireEvent.change(email, { target: { value: 'test@test.sk' } });
      fireEvent.change(passwordField, {
        target: { value: 'asdf123456' },
      });
      fireEvent.change(passwordConfirmField, {
        target: { value: 'asdf123456' },
      });
    };

    const server = setupServer(
      rest.get(
        `${process.env.REACT_APP_API_URL}auth/register`,
        (req, res, ctx) => {
          return res(ctx.json({ greeting: 'hello there' }));
        }
      )
    );

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('handle server error', async () => {
      render(
        <BrowserRouter>
          <ToastContainer />
          <Register setAuth={() => null} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}auth/register`,
          (req, res, ctx) => {
            return res(ctx.status(500));
          }
        )
      );

      const passwordConfirmField =
        screen.getByLabelText('Confirm Password');
      const submitButton = screen.getByRole('button', 'submit');
      fillFormWithRightValues();

      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Oops, failed to fetch!')
      ).toBeInTheDocument();
    });

    it('returns error when fetch does not return access token', async () => {
      const setAuth = jest.fn();
      render(
        <BrowserRouter>
          <ToastContainer />
          <Register setAuth={setAuth} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}auth/register`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json('Ověření se nezdařilo'));
          }
        )
      );

      const passwordConfirmField = screen.getByLabelText('Potvrďte heslo');
      const submitButton = screen.getByRole('button', 'submit');
      fillFormWithRightValues();

      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Authentication was unsuccessful')
      ).toBeInTheDocument();

      expect(setAuth).toHaveBeenCalledWith(false);
    });

    it('shows success message on sucessful submition', async () => {
      const setAuth = jest.fn();

      render(
        <BrowserRouter>
          <ToastContainer />
          <Register setAuth={setAuth} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}auth/register`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ token: '123' }));
          }
        )
      );

      const submitButton = screen.getByRole('button', 'submit');
      fillFormWithRightValues();

      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Registered succesfully')
      ).toBeInTheDocument();
      expect(setAuth).toHaveBeenCalledWith(true);
    });
  });
});
