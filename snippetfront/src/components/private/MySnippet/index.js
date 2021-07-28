import {useSession} from '../../../hooks/Session';
import {Link, Redirect} from 'react-router-dom';
import Page from '../../shared/Page/Page';
import { useEffect } from 'react';
import { privateaxios } from '../../../store/axios';
import { SNIPPET_CURRENT_LOAD } from '../../../store/reducers/snippets';

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
      <section key={i}>
        <div>{o.email}</div>
        <div>{o.comment}</div>
        <div>{o.date}</div>
      </section>);
  });
  return (
    <Page title={currentSnippet.name} showHeader>
      <h2>Snippet</h2>
      <pre>
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
      <Link to="/mysnippets">Regresar</Link>
    </Page>
  )
}

export default MySnippet;
