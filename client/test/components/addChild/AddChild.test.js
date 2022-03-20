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
  const renderForm = (labelText, name, type = 'text') => {
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
});
