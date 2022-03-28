import React from 'react';

export const AddSkill = () => {
  return (
    <>
      <h1>Add Skill</h1>
      <form data-testid="addSkill">
        <div className="mb-4">
          <label htmlFor="skillTitle">Skill title</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="skillTitle"
            name="skillTitle"
          />
        </div>
        <button
          className={
            'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          }
          type="submit">
          Add skill
        </button>
      </form>
    </>
  );
};
