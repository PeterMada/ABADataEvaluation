import React from 'react';

export const PersonForm = () => {
  return (
    <div>
      <h1>Add Person</h1>
      <form data-testid="addPerson">
        <div>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" />
        </div>
      </form>
    </div>
  );
};
