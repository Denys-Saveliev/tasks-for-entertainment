import s from "./Header.module.css";
import PropTypes from "prop-types";

const Header = ({ logo, children }) => {
  return (
    <div className={s.container}>
      <a href="/" className={s.logo}>
        {logo}
      </a>
      {children}
    </div>
  );
};

export default Header;

Header.propTypes = {
  logo: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
