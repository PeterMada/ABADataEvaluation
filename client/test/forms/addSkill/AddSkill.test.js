import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  findByText,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import 'whatwg-fetch';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ToastContainer } from 'react-toastify';
import { AddSkill } from '../../../src/forms/addSkill/AddSkill';
require('dotenv').config();

describe('AddSkill', () => {
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
    render(<AddSkill />);
    expect(screen.getByRole('heading', { level: 1 }).textContent).toEqual(
      'Add Skill'
    );
  });

  it('render form', () => {
    render(<AddSkill />);
    expect(screen.getByTestId('addSkill')).toBeInTheDocument();
  });

  describe('skill title', () => {
    it('renders a input field', () => {
      render(<AddSkill />);
      checkFormField('Skill title', 'skillTitle');
    });

    /*
    isThereErrorOnEmptyInputBlur(
      'First Name',
      'First name field is required'
    );
    isThereNoErrorMessageOnSomeTextInInput(
      'First Name',
      'First name field is required'
    );
    */
  });

  it('has a submit button', () => {
    render(<AddSkill />);
    const submitButton = screen.getByRole('button', 'submit');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton.textContent).toEqual('Add skill');
  });

  it('has disabled submit button on load', () => {
    render(<AddSkill />);
    const submitButton = screen.getByRole('button', 'submit');
    expect(submitButton).toBeDisabled();
  });

  it('shows loading button when form is submitting', async () => {
    render(<AddSkill />);
    const skillTitleField = screen.getByLabelText('Skill title');

    fireEvent.change(skillTitleField, { target: { value: 'SkillTitle' } });

    fireEvent.click(screen.getByRole('button', 'submit'));

    await waitFor(() =>
      expect(screen.getByText('Processing...')).toBeInTheDocument()
    );
  });

  it('remove loading button when form submiting finished', async () => {
    render(<AddSkill />);
    const skillTitleField = screen.getByLabelText('Skill title');

    fireEvent.change(skillTitleField, { target: { value: 'SkillTitle' } });
    fireEvent.click(screen.getByRole('button', 'submit'));

    await waitForElementToBeRemoved(() =>
      screen.getByText('Processing...')
    );

    expect(screen.queryByText('Processing...')).toBeNull();
    expect(screen.getByRole('button', 'submit')).toBeInTheDocument();
  });

  describe('submiting form', () => {
    const server = setupServer(
      rest.post(
        `${process.env.REACT_APP_API_URL}addSkill`,
        (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json('Authentificiation failed')
          );
        }
      )
    );

    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('shows alert when there is server error', async () => {
      render(
        <BrowserRouter>
          <ToastContainer />
          <AddSkill />
        </BrowserRouter>
      );
      const skillTitleField = screen.getByLabelText('Skill title');

      await fireEvent.change(skillTitleField, {
        target: { value: 'SkillTitle' },
      });

      const submitButton = screen.getByRole('button', 'submit');
      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Oops, failed to fetch!')
      ).toBeInTheDocument();
    });

    it('shows success message on success submition', async () => {
      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addSkill`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ skillId: '123' }));
          }
        )
      );

      render(
        <BrowserRouter>
          <ToastContainer />
          <AddSkill />
        </BrowserRouter>
      );
      const skillTitleField = screen.getByLabelText('Skill title');

      fireEvent.change(skillTitleField, {
        target: { value: 'Skill title value' },
      });

      const submitButton = screen.getByRole('button', 'submit');
      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Skill added succesfully')
      ).toBeInTheDocument();
    });

    it('shows error message on success submition but without skill id', async () => {
      render(
        <BrowserRouter>
          <ToastContainer />
          <AddSkill />
        </BrowserRouter>
      );

      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addSkill`,
          (req, res, ctx) => {
            return res(
              ctx.status(200),
              ctx.json('Authentication was unsuccessful')
            );
          }
        )
      );

      const skillTitleField = screen.getByLabelText('Skill title');

      fireEvent.change(skillTitleField, {
        target: { value: 'Skill title value' },
      });

      const submitButton = screen.getByRole('button', 'submit');
      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Authentication was unsuccessful')
      ).toBeInTheDocument();
    });

    it.skip('navigate on skill detail after succesfuli submition', async () => {
      server.use(
        rest.post(
          `${process.env.REACT_APP_API_URL}addSkill`,
          (req, res, ctx) => {
            return res(ctx.status(200), ctx.json({ skillId: '123' }));
          }
        )
      );
      render(
        <BrowserRouter>
          <AddSkill />
        </BrowserRouter>
      );

      const skillTitleField = screen.getByLabelText('Skill title');

      fireEvent.change(skillTitleField, {
        target: { value: 'Skill title value' },
      });

      const submitButton = screen.getByRole('button', 'submit');
      fireEvent.click(submitButton);

      expect(
        await screen.findByText('Skill title value')
      ).toBeInTheDocument();
    });
  });
});
