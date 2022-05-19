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
import { PersonForm } from '../../../src/forms/personForm/PersonForm';
require('dotenv').config();

describe('AddPerson', () => {
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
          <PersonForm />
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
          <PersonForm />
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
        <PersonForm />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { level: 1 }).textContent).toEqual(
      'Nový teraput'
    );
  });

  it('render form', () => {
    render(
      <BrowserRouter>
        <PersonForm />
      </BrowserRouter>
    );
    expect(screen.getByTestId('addPerson')).toBeInTheDocument();
  });

  it('renders a input field for title befor name', () => {
    render(
      <BrowserRouter>
        <PersonForm />
      </BrowserRouter>
    );
    checkFormField('Tituly před jménem', 'beforeNameTitle');
  });

  describe('first name', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <PersonForm />
        </BrowserRouter>
      );
      checkFormField('Jméno', 'firstName');
    });

    isThereErrorOnEmptyInputBlur('Jméno', 'Pole jméno je povinné');

    thereIsNoErrorMessageOnSomeTextInInput(
      'Jméno',
      'Pole jméno je povinné'
    );
  });

  describe('last name', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <PersonForm />
        </BrowserRouter>
      );
      checkFormField('Příjmení', 'lastName');
    });

    isThereErrorOnEmptyInputBlur('Příjmení', 'Pole příjmení je povinné');

    thereIsNoErrorMessageOnSomeTextInInput(
      'Příjmení',
      'Pole příjmení je povinné'
    );
  });

  it('renders a input field for title after name', () => {
    render(
      <BrowserRouter>
        <PersonForm />
      </BrowserRouter>
    );
    checkFormField('Tituly za jménem', 'afterNameTitle');
  });

  describe('email field', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <PersonForm />
        </BrowserRouter>
      );
      checkFormField('Email', 'email', 'email');
    });

    it.skip('show error on incorrect format', async () => {
      render(
        <BrowserRouter>
          <PersonForm />
        </BrowserRouter>
      );
      const emailField = screen.getByLabelText('Email');
      fireEvent.change(emailField, { target: { value: '123' } });
      fireEvent.blur(emailField);

      await waitFor(() =>
        expect(
          screen.queryByText('Pole email je povinné')
        ).toBeInTheDocument()
      );
    });

    isThereErrorOnEmptyInputBlur('Email', 'Pole email je povinné');
  });

  describe('password', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <PersonForm />
        </BrowserRouter>
      );
      checkFormField('Heslo', 'password', 'password');
    });

    isThereErrorOnEmptyInputBlur('Heslo', 'Heslo nemůže být prázdné');

    it('shows error on password with small length', async () => {
      render(
        <BrowserRouter>
          <PersonForm />
        </BrowserRouter>
      );

      const passwordField = screen.getByLabelText('Heslo');
      fireEvent.change(passwordField, { target: { value: '123' } });
      fireEvent.blur(passwordField);

      await waitFor(() =>
        expect(
          screen.queryByText('Heslo musí mít minimálne 8 znaků')
        ).toBeInTheDocument()
      );
    });
  });

  describe('password confirm', () => {
    it('renders a input field', () => {
      render(
        <BrowserRouter>
          <PersonForm />
        </BrowserRouter>
      );
      checkFormField('Potvrďte heslo', 'passwordConfirm', 'password');
    });

    isThereErrorOnEmptyInputBlur(
      'Potvrďte heslo',
      'Potvrzení hesla nemůže být prázdné'
    );

    it('shows error when passowrds does not match', async () => {
      render(
        <BrowserRouter>
          <PersonForm />
        </BrowserRouter>
      );

      const passwordField = screen.getByLabelText('Heslo');
      const passwordConfirmField = screen.getByLabelText('Potvrďte heslo');
      fireEvent.change(passwordField, { target: { value: 'asdf123456' } });
      fireEvent.change(passwordConfirmField, {
        target: { value: '123456asdf' },
      });
      fireEvent.blur(passwordConfirmField);

      await waitFor(() =>
        expect(
          screen.queryByText('Hesla musí být shodná')
        ).toBeInTheDocument()
      );
    });
  });

  it('has submit button', () => {
    render(
      <BrowserRouter>
        <PersonForm />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Přidat');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.type).toEqual('submit');
  });

  describe('submiting', () => {
    const fillFormWithRightValues = () => {
      const firstName = screen.getByLabelText('Jméno');
      const lastName = screen.getByLabelText('Příjmení');
      const email = screen.getByLabelText('Email');
      const passwordField = screen.getByLabelText('Heslo');
      const passwordConfirmField = screen.getByLabelText('Potvrďte heslo');

      const submitButton = screen.getByText('Přidat');
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
        `${process.env.REACT_APP_API_URL}addPerson`,
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
          <PersonForm setAuth={() => null} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addPerson`,
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

    it.skip('returns error when fetch does not return access token', async () => {
      const setAuth = jest.fn();
      render(
        <BrowserRouter>
          <ToastContainer />
          <PersonForm setAuth={setAuth} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addPerson`,
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

    it.skip('shows success message on sucessful submition', async () => {
      const setAuth = jest.fn();

      render(
        <BrowserRouter>
          <ToastContainer />
          <PersonForm setAuth={setAuth} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addPerson`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ personIDX: '123' }));
          }
        )
      );

      const submitButton = screen.getByText('Přidat');
      fillFormWithRightValues();

      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Osoba byla úspěšně přidána')
      ).toBeInTheDocument();
    });
  });
});
