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
import { AddChild } from '../../../src/forms/addChild/AddChild';
require('dotenv').config();

describe('AddChild', () => {
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
          <AddChild />
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
          <AddChild />
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
        <AddChild />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { level: 1 }).textContent).toEqual(
      'Nový student'
    );
  });

  it('render form', () => {
    render(
      <BrowserRouter>
        <AddChild />
      </BrowserRouter>
    );
    expect(screen.getByTestId('addChildForm')).toBeInTheDocument();
  });

  it('renders a input field for first name', () => {
    render(
      <BrowserRouter>
        <AddChild />
      </BrowserRouter>
    );
    checkFormField('Jméno', 'firstName');
  });

  it('renders a input field for last name', () => {
    render(
      <BrowserRouter>
        <AddChild />
      </BrowserRouter>
    );
    checkFormField('Příjmení', 'lastName');
  });

  describe('code', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <AddChild />
        </BrowserRouter>
      );
      checkFormField('Kód studenta', 'childCode');
    });

    isThereErrorOnEmptyInputBlur('Kód studenta', 'Pole je povinné');

    thereIsNoErrorMessageOnSomeTextInInput(
      'Kód studenta',
      'Pole je povinné'
    );
  });

  it('renders a select field for sex', () => {
    render(
      <BrowserRouter>
        <AddChild />
      </BrowserRouter>
    );

    const field = screen.getByLabelText('Pohlaví');
    expect(field).toBeInTheDocument();
    expect(field.id).toEqual('sex');
    expect(field.type).toEqual('select-one');
  });

  it('renders a input field for diagnosis', () => {
    render(
      <BrowserRouter>
        <AddChild />
      </BrowserRouter>
    );
    checkFormField('Diagnóza', 'diagnosis');
  });

  it('has submit button', () => {
    render(
      <BrowserRouter>
        <AddChild />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Přidat');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.type).toEqual('submit');
  });

  describe('submiting', () => {
    const fillFormWithRightValues = () => {
      const codeField = screen.getByLabelText('Kód studenta');
      fireEvent.change(codeField, {
        target: { value: 'Kod' },
      });
    };

    const server = setupServer(
      rest.get(
        `${process.env.REACT_APP_API_URL}addChild`,
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
          <AddChild setAuth={() => null} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addChild`,
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
          <AddChild setAuth={setAuth} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addChild`,
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
          <AddChild setAuth={setAuth} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addChild`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ childId: '123' }));
          }
        )
      );

      const submitButton = screen.getByText('Přidat');
      fillFormWithRightValues();

      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Student úspěšně přidán')
      ).toBeInTheDocument();
    });
  });
});
