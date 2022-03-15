import React from 'react';

export const PersonForm = () => {
  return (
    <div>
      <h1>Add Person</h1>
      <form data-testid="addPerson">
        <div>
          <label htmlFor="beforeNameTitle">Titles before name</label>
          <input id="beforeNameTitle" name="beforeNameTitle" />
        </div>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" />
        </div>
        <div>
          <label htmlFor="afterNameTitle">Titles after name</label>
          <input id="afterNameTitle" name="afterNameTitle" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />
        </div>
      </form>
    </div>
  );
};
