import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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

  it('submit login form', () => {
    render(
      <BrowserRouter>
        <Login setAuth={() => null} />
      </BrowserRouter>
    );
    const form = screen.getByTestId('loginForm');

    fireEvent.submit(form);
    expect(window.fetch).toHaveBeenCalledWith('auth/login');

    /*
    expect(window.fetch).toHaveBeenCalledWith(
      '/customers',
      expect.objectContaining({
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' }
      })
    );
    */
  });
});
