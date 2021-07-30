import './DataField.css';
const DataField = ({ labelText, type, placeholder, value, name, id, error, title, onChange, ...rest})=>{
  //const errorControl = (error && true) ? (<div className="error">{error}</div>) : null;
  if (type == "textarea") {
    return (
      <fieldset>
        <label>{labelText}</label>
        <textarea
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          id={id}
          title={title}
          onChange={onChange}
          {...rest}
        ></textarea>
        {(error && (<div className="error">{error}</div>))}
      </fieldset>
    );
  }
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
        onChange={onChange}
        {...rest}
      />
      {(error && (<div className="error">{error}</div>))}
    </fieldset>
  );
}

export default DataField;
