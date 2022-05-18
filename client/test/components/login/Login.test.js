import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
/*
import {
  fetchResponseOk,
  fetchResponseError,
  requestBodyOf,
} from '../../spyHelpers';
*/
import 'whatwg-fetch';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
//import { Login } from '../../../src/components/login/Login';
import { App } from '../../../src/App';
import { ToastContainer } from 'react-toastify';
require('dotenv').config();

describe('Login', () => {
  /*
  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk({}));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  })
  */
  /*
  const renderLogin = () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  it('render login form', () => {
    renderLogin();
    expect(screen.getByTestId('loginForm')).toBeInTheDocument();
  });

  it('render heading for form', () => {
    renderLogin();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toEqual(
      'Přihlášení'
    );
  });

  it('render input for email', () => {
    renderLogin();
    const field = screen.getByLabelText('Email');
    expect(field).toBeInTheDocument();
    expect(field.type).toEqual('email');
    expect(field.id).toEqual('email');
  });

  it('shows label for email input', () => {
    renderLogin();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('render input for password', () => {
    renderLogin();
    const field = screen.getByLabelText('Heslo');
    expect(field).toBeInTheDocument();
    expect(field.type).toEqual('password');
    expect(field.id).toEqual('password');
  });

  it('render label for password input', () => {
    renderLogin();
    expect(screen.getByLabelText('Heslo')).toBeInTheDocument();
  });

  it('render a login button', () => {
    renderLogin();
    const field = screen.getByRole('button', 'submit');
    expect(field).toBeInTheDocument();
  });

  it('has right name in submit button', () => {
    renderLogin();
    const field = screen.getByRole('button', { name: 'Přihlásit se' });
    expect(field).toBeInTheDocument();
  });

  it('has link to register page', () => {
    renderLogin();
    const field = screen.getByRole('link', { name: 'Registrace' });
    expect(field).toBeInTheDocument();
    expect(field).toHaveAttribute('href', '/register');
  });

  it('has link to forgot password page', () => {
    renderLogin();
    const field = screen.getByRole('link', { name: 'Zapomenuté heslo?' });
    expect(field).toBeInTheDocument();
    expect(field).toHaveAttribute('href', '/resetPassword');
  });

  it('show error message when email field is empty on submit', async () => {
    render(
      <BrowserRouter>
        <ToastContainer />
        <Login setAuth={() => null} />
      </BrowserRouter>
    );
    const submitButton = screen.getByRole('button', 'submit');
    const passwordField = screen.getByLabelText('Heslo');
    fireEvent.change(passwordField, { target: { value: 'asdf123456' } });

    fireEvent.click(submitButton);
    expect(await screen.findByText('Povinné pole')).toBeInTheDocument();
  });

  it('show error message when password field is empty on submit', async () => {
    render(
      <BrowserRouter>
        <ToastContainer />
        <Login setAuth={() => null} />
      </BrowserRouter>
    );
    const submitButton = screen.getByRole('button', 'submit');
    const passwordField = screen.getByLabelText('Email');
    fireEvent.change(passwordField, { target: { value: 'test@test.cz' } });

    fireEvent.click(submitButton);
    expect(await screen.findByText('Povinné pole')).toBeInTheDocument();
  });

  it('has submit button', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const submitButton = screen.getByRole('button', 'submit');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toEqual('Přihlásit se');
  });

  describe('submiting', () => {
    const fillFormWithRightValues = () => {
      const email = screen.getByLabelText('Email');
      const passwordField = screen.getByLabelText('Heslo');
      fireEvent.change(email, { target: { value: 'test@test.sk' } });
      fireEvent.change(passwordField, {
        target: { value: 'asdf123456' },
      });
    };

    const server = setupServer(
      rest.post(
        `${process.env.REACT_APP_API_URL}auth/Login`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ token: '123' }));
        }
      )
    );

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('shows success message on sucessful login', async () => {
      const setAuth = jest.fn();

      render(
        <BrowserRouter>
          <ToastContainer />
          <Login setAuth={setAuth} />
        </BrowserRouter>
      );

      const submitButton = screen.getByRole('button', 'submit');
      fillFormWithRightValues();

      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Přihlášení proběhlo úspěšně')
      ).toBeInTheDocument();
      expect(setAuth).toHaveBeenCalledWith(true);
    });

    it('shows error message on unsucessful login', async () => {
      const setAuth = jest.fn();

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}auth/login`,
          (req, res, ctx) => {
            return res(ctx.status(500), ctx.json('Chyba serveru'));
          }
        )
      );

      render(
        <BrowserRouter>
          <ToastContainer />
          <Login setAuth={setAuth} />
        </BrowserRouter>
      );

      const submitButton = screen.getByRole('button', 'submit');
      fillFormWithRightValues();

      fireEvent.click(submitButton);

      expect(await screen.findByText('Chyba serveru')).toBeInTheDocument();
      expect(setAuth).toHaveBeenCalledWith(false);
    });
  });
  */
});
