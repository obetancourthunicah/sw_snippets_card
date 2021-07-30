import {useSession} from '../../../hooks/Session';
import {Link, Redirect} from 'react-router-dom';
import Page from '../../shared/Page/Page';
import { useEffect } from 'react';
import { privateaxios } from '../../../store/axios';
import { SNIPPET_CURRENT_LOAD } from '../../../store/reducers/snippets';

import './MySnippet.css';

const MySnippet = () => {
  const [{ snippet }, dispatch ] = useSession();

  useEffect(
    async ()=>{
      if (snippet.setCurrentId && true) {
        const { data } = await privateaxios.get(`/api/snippets/byid/${snippet.setCurrentId}`);
        dispatch({type:SNIPPET_CURRENT_LOAD, payload:data});
      }
    },
    []
  );
  // Si no hay un codigo a cargar se regresa a la lista
  if (!(snippet.setCurrentId && true)) {
    return (
      <Redirect to="/mysnippets"></Redirect>
    )
  }
  const { currentSnippet } = snippet;

  // Si hay un codigo pero aun no se ha cargado ... se muestra cargando
  if (!(currentSnippet && true)){
    return (
      <Page title="My Snippet" showHeader>
        <strong>Loading .... </strong>
      </Page>
    );
  }
  //Si hay un codigo y ya esta cargado
  const keys = currentSnippet.keywords.map((o, i)=>{
    return (<span key={i} className="keyword">{o}</span>);
  });
  const comments = currentSnippet.comments.map((o,i)=>{
    return (
      <section key={i} className="comment">
        <div>
          <div>{o.email}</div>
          <div>{new Date(o.date).toLocaleDateString()}</div>
        </div>
        <div>{o.comment}</div>
      </section>);
  });
  return (
    <Page title={currentSnippet.name} showHeader>
      <h2>Snippet</h2>
      <pre className="pre">
        {currentSnippet.snippet}
      </pre>
      <section>
        <h2>Palabras Claves</h2>
        {keys}
      </section>
      <section>
        <h2>Comentarios</h2>
        {comments}
      </section>
      <Link to="/mysnippets" className="btn">Regresar</Link>
    </Page>
  )
}

export default MySnippet;
