const UserHandle = ({ handle, handleHandle, handleFormSubmit }) => {
  return (
    <div className="font-serif">
      <form onSubmit={handleFormSubmit}>
        <label>Please enter a twitter handle:</label> <br />
        <input
          className="py-2 px-4 rounded-full"
          value={handle}
          onChange={handleHandle}
          type="text"
          id="handle"
          name="handle"
        />
        <button
          className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          type="submit"
        >
          search
        </button>
      </form>
    </div>
  );
};

export default UserHandle;
