import './DataField.css';
const DataField = ({ labelText, type, placeholder, value, name, id, error, title, onChangeHandler})=>{
  //const errorControl = (error && true) ? (<div className="error">{error}</div>) : null;
  return (
    <fieldset>
      <label>{labelText}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        id={id}
        title={title}
        onChange={onChangeHandler}
      />
      {(error && (<div className="error">{error}</div>))}
    </fieldset>
  );
}

export default DataField;
