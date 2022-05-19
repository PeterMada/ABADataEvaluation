import React from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import 'whatwg-fetch';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { App } from '../../../src/App';
import { ToastContainer } from 'react-toastify';
import { AddProgram } from '../../../src/forms/addProgram/AddProgram';
require('dotenv').config();

describe('AddProgram', () => {
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
          <AddProgram />
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
          <AddProgram />
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
        <AddProgram />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { level: 1 }).textContent).toEqual(
      'Nový program'
    );
  });

  it('render form', () => {
    render(
      <BrowserRouter>
        <AddProgram />
      </BrowserRouter>
    );
    expect(screen.getByTestId('addProgram')).toBeInTheDocument();
  });

  describe('title', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <AddProgram />
        </BrowserRouter>
      );
      checkFormField('Název programu', 'programTitle');
    });

    isThereErrorOnEmptyInputBlur('Název programu', 'Pole je povinné');

    thereIsNoErrorMessageOnSomeTextInInput(
      'Název programu',
      'Pole je povinné'
    );
  });

  describe('baseline from', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <AddProgram />
        </BrowserRouter>
      );
      checkFormField('Program baseline od', 'programBaselineFrom');
    });

    isThereErrorOnEmptyInputBlur('Program baseline od', 'Pole je povinné');

    thereIsNoErrorMessageOnSomeTextInInput(
      'Program baseline od',
      'Pole je povinné'
    );
  });

  describe('baseline to', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <AddProgram />
        </BrowserRouter>
      );
      checkFormField('Program baseline do', 'programBaselineTo');
    });
  });

  describe('target from', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <AddProgram />
        </BrowserRouter>
      );
      checkFormField('Baseline cíle od', 'targetBaselineFrom');
    });

    isThereErrorOnEmptyInputBlur('Baseline cíle od', 'Pole je povinné');

    thereIsNoErrorMessageOnSomeTextInInput(
      'Baseline cíle od',
      'Pole je povinné'
    );
  });

  describe('target to', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <AddProgram />
        </BrowserRouter>
      );
      checkFormField('Baseline cíle do', 'targetBaselineTo');
    });

    isThereErrorOnEmptyInputBlur('Baseline cíle do', 'Pole je povinné');

    thereIsNoErrorMessageOnSomeTextInInput(
      'Baseline cíle do',
      'Pole je povinné'
    );
  });

  describe('criterion from', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <AddProgram />
        </BrowserRouter>
      );
      checkFormField('Kritérium cíle od', 'targetCriterionFrom');
    });

    isThereErrorOnEmptyInputBlur('Kritérium cíle od', 'Pole je povinné');

    thereIsNoErrorMessageOnSomeTextInInput(
      'Kritérium cíle od',
      'Pole je povinné'
    );
  });
  describe('criterion to', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <AddProgram />
        </BrowserRouter>
      );
      checkFormField('Kritérium cíle do', 'targetCriterionTo');
    });

    isThereErrorOnEmptyInputBlur('Kritérium cíle do', 'Pole je povinné');

    thereIsNoErrorMessageOnSomeTextInInput(
      'Kritérium cíle do',
      'Pole je povinné'
    );
  });

  it('has submit button', () => {
    render(
      <BrowserRouter>
        <AddProgram />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Přidat');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.type).toEqual('submit');
  });
});
