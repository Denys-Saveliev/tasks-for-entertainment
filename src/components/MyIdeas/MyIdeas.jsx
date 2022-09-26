import Header from "../Header/Header";
import s from "./MyIdeas.module.css";
import PropTypes from "prop-types";

const MyIdeas = ({ onSave, onSet }) => {
  return (
    <Header logo="Idea management">
      <div>
        <button className={s.btn} onClick={onSet}>
          Set Ideas
        </button>
        <button className={s.btn} onClick={onSave}>
          Save Ideas
        </button>
      </div>
    </Header>
  );
};

export default MyIdeas;

MyIdeas.propTypes = {
  onSet: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};
