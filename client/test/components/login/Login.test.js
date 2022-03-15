import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import {
  fetchResponseOk,
  fetchResponseError,
  requestBodyOf,
} from '../../spyHelpers';
import 'whatwg-fetch';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../../../src/components/login/Login';
import { App } from '../../../src/App';
import { ToastContainer } from 'react-toastify';

describe('Login', () => {
  beforeEach(() => {
    jest.spyOn(window, 'fetch').mockReturnValue(fetchResponseOk({}));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

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
      'Login'
    );
  });

  it('render input for eamil', () => {
    renderLogin();
    const field = screen.getByPlaceholderText('Email');
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
    const field = screen.getByPlaceholderText('**********');
    expect(field).toBeInTheDocument();
    expect(field.type).toEqual('password');
    expect(field.id).toEqual('password');
  });

  it('render label for password input', () => {
    renderLogin();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('render a login button', () => {
    renderLogin();
    const field = screen.getByRole('button', 'submit');
    expect(field).toBeInTheDocument();
  });

  it('has right name in submit button', () => {
    renderLogin();
    const field = screen.getByRole('button', { name: 'Login' });
    expect(field).toBeInTheDocument();
  });

  it('has link to register page', () => {
    renderLogin();
    const field = screen.getByRole('link', { name: 'Register' });
    expect(field).toBeInTheDocument();
    expect(field).toHaveAttribute('href', '/register');
  });

  it('has link to forgot password page', () => {
    renderLogin();
    const field = screen.getByRole('link', { name: 'Forgot password?' });
    expect(field).toBeInTheDocument();
    expect(field).toHaveAttribute('href', '/resetPassword');
  });

  // TODO is this test realy nescesary?
  it.skip('has right value in email input when changed', () => {
    renderLogin();
    const field = screen.getByLabelText('Email');
    fireEvent.change(field, { target: { value: 'testemail@email.sk' } });
    expect(field.value).toBe('testemail@email.sk');
  });

  // TODO finish this test
  it.skip('show error message when email field is empty on submit', async () => {
    render(
      <BrowserRouter>
        <Login setAuth={() => null} />
      </BrowserRouter>
    );
    const form = screen.getByTestId('loginForm');
    fireEvent.submit(form);
    expect(
      await screen.findByText('Missing Credentials')
    ).toBeInTheDocument();
  });

  it('submit empty login form', () => {
    render(
      <BrowserRouter>
        <Login setAuth={() => null} />
      </BrowserRouter>
    );
    const form = screen.getByTestId('loginForm');
    const emptyBody = {
      email: '',
      password: '',
    };

    fireEvent.submit(form);
    expect(window.fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API_URL}auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(emptyBody),
      }
    );
  });

  // TODO finish this test
  it.skip('show error message when empty form is submited', async () => {
    render(
      <BrowserRouter>
        <Login setAuth={() => null} />
      </BrowserRouter>
    );
    const form = screen.getByTestId('loginForm');
    const submitButton = screen.getByRole('button', 'submit');

    fireEvent.click(submitButton);
    //+ await waitFor(() => screen.findByRole('alert'));

    expect(
      await screen.findByText('Missing Credentials')
    ).toBeInTheDocument();
  });
});
