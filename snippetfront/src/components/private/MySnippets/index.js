import { MdRemoveRedEye} from 'react-icons/md';

import Page from '../../shared/Page/Page';
import {useEffect, useRef} from 'react';
import {privateaxios} from '../../../store/axios';
import { useSession } from '../../../hooks/Session';
import { SNIPPET_FETCHING, SNIPPET_LOAD, SNIPPET_SETCURRENT } from '../../../store/reducers/snippets';
import {Redirect} from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroller';

import './MySnippets.css';

const MySnippets = ()=>{

  const [{ snippet}, dispatch] = useSession();
  const { page, itemsPages, snippets, fetching, hasMore, redirect} = snippet;
 
  const loadMoreSnippets = async ()=>{
    if(!fetching){
      try {
        const indexPage = page + 1;
        dispatch({ type: SNIPPET_FETCHING });
        let { data } = await privateaxios.get(`/api/snippets/facet/${indexPage}/${itemsPages}`);
        dispatch({ type: SNIPPET_LOAD, payload: data });
      } catch (ex) {
        console.log(ex);
      }
    }
  }
  useEffect(
    async () => {
      loadMoreSnippets();
    }, []
  );

  const onClickHandler = (_id)=>{
    dispatch({type:SNIPPET_SETCURRENT, payload:{_id:_id}});
  }
  const scrollParentRef = useRef();

  if (redirect) {
    return (<Redirect to="/mysnippet"></Redirect>);
  }

  const listOfSnippets = snippets.map((o)=>{
    return (
      <li key={o._id} className="listItem">
        <span className="listDetail">
          <span>{o.name}</span>
          <span>{o.sales}</span>
        </span>
        <span onClick={()=>onClickHandler(o._id)}><MdRemoveRedEye/></span>
      </li>
    );
  });
 
  return(
    <Page showHeader title="My Snippets">
      <section>
        <InfiniteScroll
          pageStart={page}
          hasMore={hasMore}
          getScrollParent={()=>scrollParentRef.current}
          loader={(<li key="loaderkeyid">Loading...</li>)}
          loadMore={loadMoreSnippets}
          element="section"
        >
          <ul className="listHolder">
            {listOfSnippets}
          </ul>
        </InfiniteScroll>
      </section>
    </Page>
  )
}

export default MySnippets;
