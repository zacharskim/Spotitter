
const UserHandle = ({handle, handleHandle, tweetService, handleFormSubmit}) => {
   
    return(
        
        <div className="font-serif">
            <form onSubmit={handleFormSubmit}>
                <label for="lname">Please enter a twitter handle:</label> <br />
                <input value={handle} onChange={handleHandle} type="text" id="handle" name="handle"/>
                <button type="submit">search</button>
            </form>
        </div>

    );
}

export default UserHandle