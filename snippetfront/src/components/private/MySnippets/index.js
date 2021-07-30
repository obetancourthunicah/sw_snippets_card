import { MdRemoveRedEye, MdAddCircleOutline} from 'react-icons/md';

import Page from '../../shared/Page/Page';
import {useEffect, useRef} from 'react';
import {privateaxios} from '../../../store/axios';
import { useSession } from '../../../hooks/Session';
import { SNIPPET_FETCHING, SNIPPET_LOAD, SNIPPET_SETCURRENT } from '../../../store/reducers/snippets';
import {Redirect, Link} from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroller';

import './MySnippets.css';

const MySnippets = ()=>{

  const [{ snippet}, dispatch] = useSession();
  const { page, itemsPages, snippets, fetching, hasMore, redirect, scrollto} = snippet;

  const loadMoreSnippets = async (pageToLoad)=>{
    if(!fetching && hasMore){
      try {
        console.log(page, pageToLoad);
        const indexPage = page + 1;
        dispatch({ type: SNIPPET_FETCHING });
        let { data } = await privateaxios.get(`/api/snippets/facet/${indexPage}/${itemsPages}`);
        dispatch({ type: SNIPPET_LOAD, payload: data });
      } catch (ex) {
        console.log(ex);
      }
    }
  }

  const onClickHandler = (_id)=>{
    const scrollToY = scrollParentRef.current.scrollTop;
    dispatch({ type: SNIPPET_SETCURRENT, payload: { _id: _id, scrollToY: scrollToY}});
  }
  const scrollParentRef = useRef();

  useEffect(()=>{
    scrollParentRef.current.scrollTo(0, scrollto);
  }, []);
  if (redirect) {
    return (<Redirect to="/mysnippet"></Redirect>);
  }

  const listOfSnippets = snippets.map((o,i)=>{
    return (
      <li key={o._id + i} className="listItem">
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
      <Link to="/addsnippet" className="addBtn"><MdAddCircleOutline/></Link>
      <section className="scrollerParent" ref={scrollParentRef}>
        <InfiniteScroll
          hasMore={hasMore}
          getScrollParent={()=>scrollParentRef.current}
          loader={(<li className="listItem" key="loaderkeyid">Loading...</li>)}
          loadMore={loadMoreSnippets}
          element="section"
          useWindow={false}
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
