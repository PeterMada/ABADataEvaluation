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
import { AddTarget } from '../../../src/forms/addTarget/AddTarget';
require('dotenv').config();

describe('AddTarget', () => {
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
          <AddTarget />
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
          <AddTarget />
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
        <AddTarget />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { level: 1 }).textContent).toEqual(
      'Přidat cíl'
    );
  });

  it('render form', () => {
    render(
      <BrowserRouter>
        <AddTarget />
      </BrowserRouter>
    );
    expect(screen.getByTestId('addTarget')).toBeInTheDocument();
  });

  describe('title', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <AddTarget />
        </BrowserRouter>
      );
      checkFormField('Název cílu', 'targetTitle');
    });

    isThereErrorOnEmptyInputBlur('Název cílu', 'Pole je povinné');

    thereIsNoErrorMessageOnSomeTextInInput(
      'Název cílu',
      'Pole je povinné'
    );
  });

  it('renders a input field for title', () => {
    render(
      <BrowserRouter>
        <AddTarget />
      </BrowserRouter>
    );

    const field = screen.getByLabelText('Popis');
    expect(field).toBeInTheDocument();
    expect(field.id).toEqual('targetDescription');
    expect(field.type).toEqual('textarea');
  });

  it('renders a input field for baseline', () => {
    render(
      <BrowserRouter>
        <AddTarget />
      </BrowserRouter>
    );
    checkFormField('Aktuální baseline', 'targetBaselineCurrent');
  });

  it('has submit button', () => {
    render(
      <BrowserRouter>
        <AddTarget />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Přidat');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.type).toEqual('submit');
  });

  describe('submiting', () => {
    const fillFormWithRightValues = () => {
      const codeField = screen.getByLabelText('Název cílu');
      fireEvent.change(codeField, {
        target: { value: 'Title' },
      });
    };

    const server = setupServer(
      rest.get(
        `${process.env.REACT_APP_API_URL}addTarget`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ token: '123' }));
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
          <AddTarget setAuth={() => null} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addTarget`,
          (req, res, ctx) => {
            return res(ctx.status(500));
          }
        )
      );

      fillFormWithRightValues();

      const submitButton = screen.getByText('Přidat');
      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Jejda, načtení se nezdařilo!')
      ).toBeInTheDocument();
    });

    it('returns error when fetch does not return access token', async () => {
      const setAuth = jest.fn();
      render(
        <BrowserRouter>
          <ToastContainer />
          <AddTarget setAuth={setAuth} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addTarget`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json('Chyba'));
          }
        )
      );

      const submitButton = screen.getByText('Přidat');
      fillFormWithRightValues();

      fireEvent.click(submitButton);

      expect(await screen.findByText('Chyba')).toBeInTheDocument();
    });
    it('shows success message on sucessful submition', async () => {
      const setAuth = jest.fn();

      render(
        <BrowserRouter>
          <ToastContainer />
          <AddTarget setAuth={setAuth} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addTarget`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ targetId: '123' }));
          }
        )
      );

      const submitButton = screen.getByText('Přidat');
      fillFormWithRightValues();

      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Cíl byl úspěšně přidán')
      ).toBeInTheDocument();
    });
  });
});
