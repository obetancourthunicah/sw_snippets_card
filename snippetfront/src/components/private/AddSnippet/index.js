import Page from '../../shared/Page/Page';
import Field from '../../shared/DataField/DataField';

import {useState} from 'react';

import './AddSnippet.css';
const AddSnippet = ()=> {
  const [form, setForm] = useState({name: "", snippet: ""});
  const onChangeHandler = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    const { name, value } = e.target;
    console.log(name, value);
    const newState = {
      ...form,
      [name]:value
    }
    setForm(newState);
  }
  const {name, snippet} = form;
  return (
    <Page showHeader title="Nuevo">
      <section>
        <Field
          name="name"
          id="name"
          placeholder="Nombre del Snippet"
          type="text"
          labelText="Nombre"
          value={name}
          onChange={onChangeHandler}
        >
        </Field>
        <Field
          name="snippet"
          id="snippet"
          placeholder="Codigo del Snippet"
          type="textarea"
          labelText="Nombre"
          value={snippet}
          onChange={onChangeHandler}
          rows="10"
          style={{minHeight:"40vh"}}
        >
        </Field>
      </section>
    </Page>
    );
}

export default AddSnippet;
