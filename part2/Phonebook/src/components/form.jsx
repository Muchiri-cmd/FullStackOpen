const Form = ({name,handleNameField,number,handleNumberField,onSubmit}) => {
    return (
      <form onSubmit={onSubmit} className="form">
            <div className="input-wrapper">
              <label>name:(e.g John Doe)
                <input value={name} onChange={handleNameField} type="text" required/>
              </label>
            </div>
  
            <div className="input-wrapper">
              <label>number : (e.g 012345678)
                <input value={number} onChange={handleNumberField} type="text" required/>
              </label>
            </div>
  
            <div className="button-container">
              <button className="submit-btn" type="submit">add</button>
            </div>
      </form>
    )
}

export default Form
  