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
require('dotenv').config();

describe('AddChild', () => {
  const checkFormField = (labelText, name, type = 'text') => {
    const firstNameField = screen.getByLabelText(labelText);
    expect(firstNameField).toBeInTheDocument();
    expect(firstNameField.id).toEqual(name);
    expect(firstNameField.type).toEqual(type);
  };

  const isThereErrorOnEmptyInputBlur = async (labelText, errorText) => {
    it(`displays error after blur when ${labelText} field is blank`, async () => {
      render(<AddChild />);
      await fireEvent.focus(screen.getByLabelText(labelText));
      await fireEvent.blur(screen.getByLabelText(labelText));
      await waitFor(() =>
        expect(screen.getByText(errorText)).toBeInTheDocument()
      );
    });
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

    isThereErrorOnEmptyInputBlur(
      'First Name',
      'First name field is required'
    );
  });

  describe('last name', () => {
    it('renders an input', () => {
      render(<AddChild />);
      checkFormField('Last Name', 'lastName');
    });

    isThereErrorOnEmptyInputBlur(
      'Last Name',
      'Last name field is required'
    );
  });

  describe('child code', () => {
    it('renders an input', () => {
      render(<AddChild />);
      checkFormField('Child Code', 'childCode');
    });
  });

  describe('sex', () => {
    beforeEach(() => {
      render(<AddChild />);
    });
    it('show select field', () => {
      const sexField = screen.getByLabelText('Sex');
      expect(sexField).toBeInTheDocument();
      expect(sexField.id).toEqual('sex');
      expect(sexField.type).toEqual('select-one');
    });

    it('default value is empty', () => {
      const sexField = screen.getByLabelText('Sex');
      expect(sexField.firstChild.value).toEqual('');
    });

    it('has two gender options', () => {
      const sexField = screen.getByLabelText('Sex');
      expect(sexField.children.length).toEqual(3);
      expect(sexField.children[1].value).toEqual('Woman');
      expect(sexField.children[2].value).toEqual('Man');
    });
  });

  describe('date of birth', () => {
    it('shows field', () => {
      render(<AddChild />);
      const dobField = screen.getByLabelText('Date of Birth');

      expect(dobField).toBeInTheDocument();
      expect(dobField.id).toEqual('dateOfBirth');
      expect(dobField.type).toEqual('date');
    });
  });

  describe('diagnosis', () => {
    it('shows field', () => {
      render(<AddChild />);
      checkFormField('Diagnosis', 'diagnosis');
    });
  });

  describe('file input', () => {
    it('has field', () => {
      render(<AddChild />);
      checkFormField('Photo', 'photo', 'file');
    });

    it('accept only images', () => {
      render(<AddChild />);
      expect(screen.getByLabelText('Photo').accept).toEqual('image/*');
    });
  });

  it('has submit button', () => {
    render(<AddChild />);
    const submitButton = screen.getByRole('button', 'submit');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toEqual('Add');
  });

  it('has disabled submit button on load', () => {
    render(<AddChild />);
    const submitButton = screen.getByRole('button', 'submit');
    expect(submitButton).toBeDisabled();
  });

  it('shows loading button when form is submitting', async () => {
    render(<AddChild />);
    const firstNameField = screen.getByLabelText('First Name');
    const lastNameField = screen.getByLabelText('Last Name');

    fireEvent.change(firstNameField, { target: { value: 'FirstName' } });
    fireEvent.change(lastNameField, { target: { value: 'LastName' } });

    fireEvent.click(screen.getByRole('button', 'submit'));

    await waitFor(() =>
      expect(screen.getByText('Processing...')).toBeInTheDocument()
    );
  });

  describe('submiting form', () => {
    const server = setupServer(
      rest.get(
        `${process.env.REACT_APP_API_URL}addChild`,
        (req, res, ctx) => {
          return res(ctx.status(200));
        }
      )
    );

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    const fillFormWithRightValues = () => {
      const firstNameField = screen.getByLabelText('First Name');
      const lastNameField = screen.getByLabelText('Last Name');

      fireEvent.change(firstNameField, { target: { value: 'FirstName' } });
      fireEvent.change(lastNameField, { target: { value: 'LastName' } });
    };

    it('show alert when there is server error', async () => {
      render(
        <BrowserRouter>
          <ToastContainer />
          <AddChild />
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

      const submitButton = screen.getByRole('button', 'submit');
      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Oops, failed to fetch!')
      ).toBeInTheDocument();
    });

    it('shows success message on success submition', async () => {
      render(
        <BrowserRouter>
          <ToastContainer />
          <AddChild />
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

      const submitButton = screen.getByRole('button', 'submit');
      fillFormWithRightValues();

      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Child added succesfully')
      ).toBeInTheDocument();
    });

    it('shows error message on success submition but without child id', async () => {
      render(
        <BrowserRouter>
          <ToastContainer />
          <AddChild />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addChild`,
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json('Authentication was unsuccessful')
            );
          }
        )
      );

      const submitButton = screen.getByRole('button', 'submit');
      fillFormWithRightValues();

      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Authentication was unsuccessful')
      ).toBeInTheDocument();
    });
  });
});
