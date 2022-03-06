import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';
import { Login } from '../../../src/components/login/Login';
import { App } from '../../../src/App';

describe('Login', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  it('render input for eamil', () => {
    const field = screen.getByPlaceholderText('Email');
    expect(field).toBeInTheDocument();
    expect(field.type).toEqual('email');
    expect(field.id).toEqual('email');
  });

  it('shows label for email input', () => {
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('render input for password', () => {
    const field = screen.getByPlaceholderText('**********');
    expect(field).toBeInTheDocument();
    expect(field.type).toEqual('password');
    expect(field.id).toEqual('password');
  });

  it('render label for password input', () => {
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('render a login button', () => {
    const field = screen.getByRole('button', 'submit');
    expect(field).toBeInTheDocument();
  });

  it('has right name in submit button', () => {
    const field = screen.getByRole('button', { name: 'Login' });
    expect(field).toBeInTheDocument();
  });
});
