import React from 'react';

export const AddChild = () => {
  return (
    <>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">
        Add Child
      </h1>
      <form data-testid="addChildForm">
        <div>
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" id="firstName" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" id="lastName" />
        </div>
        <div>
          <label htmlFor="childCode">Child Code</label>
          <input name="childCode" id="childCode" />
        </div>
        <div>
          <label htmlFor="sex">Sex</label>
          <select name="sex" id="sex">
            <option />
          </select>
        </div>
      </form>
    </>
  );
};
