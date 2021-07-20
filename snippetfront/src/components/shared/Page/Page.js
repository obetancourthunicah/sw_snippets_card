import { Fragment } from 'react';
import Header from '../Header/Header';
import './Page.css';
const Page = ({showHeader, title, children})=>{
  if (showHeader && true) {
    return (
      <Fragment>
        <Header>
          {title}
        </Header>
        <section className="page withHeader">
          {children}
        </section>
      </Fragment>
    )
  } else {
    return (
      <section className="page withNoHeader">
        {children}
      </section>
    );
  }

}

export default Page;
