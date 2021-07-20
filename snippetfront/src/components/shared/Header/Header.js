import './Header.css';
const Header = ({children})=>{
  return (
    <section className="header">
      {children}
    </section>
  );
}

export default Header;
