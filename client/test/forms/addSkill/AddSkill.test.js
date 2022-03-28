import React from 'react';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
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
});
