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
  });

  describe('last name', () => {
    it('renders an input', () => {
      render(<AddChild />);
      checkFormField('Last Name', 'lastName');
    });
  });

  describe('child code', () => {
    it('renders an input', () => {
      render(<AddChild />);
      checkFormField('Child Code', 'childCode');
    });
  });

  describe('sex', () => {
    it('show select field', () => {
      render(<AddChild />);
      const sexField = screen.getByLabelText('Sex');

      expect(sexField).toBeInTheDocument();
      expect(sexField.id).toEqual('sex');
      expect(sexField.type).toEqual('select-one');
    });

    it('default value is empty', () => {
      render(<AddChild />);
      const sexField = screen.getByLabelText('Sex');

      expect(sexField.firstChild.value).toEqual('');
    });
  });
});
