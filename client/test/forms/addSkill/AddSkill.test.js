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
import { AddSkill } from '../../../src/forms/addSkill/AddSkill';
require('dotenv').config();

describe('AddSkill', () => {
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
          <AddSkill />
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
          <AddSkill />
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
        <AddSkill />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading', { level: 1 }).textContent).toEqual(
      'Nová dovednost'
    );
  });

  it('render form', () => {
    render(
      <BrowserRouter>
        <AddSkill />
      </BrowserRouter>
    );
    expect(screen.getByTestId('addSkill')).toBeInTheDocument();
  });

  it('renders a input field for title', () => {
    render(
      <BrowserRouter>
        <AddSkill />
      </BrowserRouter>
    );
    checkFormField('Název', 'skillTitle');
  });

  it('renders a input field for title', () => {
    render(
      <BrowserRouter>
        <AddSkill />
      </BrowserRouter>
    );
    checkFormField('Název', 'skillTitle');
  });

  isThereErrorOnEmptyInputBlur('Název', 'Pole je povinné');

  thereIsNoErrorMessageOnSomeTextInInput('Název', 'Pole je povinné');

  it('has submit button', () => {
    render(
      <BrowserRouter>
        <AddSkill />
      </BrowserRouter>
    );

    const submitButton = screen.getByText('Přidat');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.type).toEqual('submit');
  });

  describe('submiting', () => {
    const fillFormWithRightValues = () => {
      const codeField = screen.getByLabelText('Název');
      fireEvent.change(codeField, {
        target: { value: 'title' },
      });
    };

    const server = setupServer(
      rest.get(
        `${process.env.REACT_APP_API_URL}addSkill`,
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
          <AddSkill setAuth={() => null} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addSkill`,
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
          <AddSkill setAuth={setAuth} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addSkill`,
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
          <AddSkill setAuth={setAuth} />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addSkill`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ skillId: '123' }));
          }
        )
      );

      const submitButton = screen.getByText('Přidat');
      fillFormWithRightValues();

      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Dovednost byla úspěšně přidána')
      ).toBeInTheDocument();
    });
  });
});
