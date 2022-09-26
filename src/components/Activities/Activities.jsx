import Section from "../Section";
import s from "./Activities.module.css";
import { ThreeDots } from "react-loader-spinner";
import PropTypes from "prop-types";

const Activities = ({ data, onClick, onFetch }) => {
  return (
    <Section title="Choose fresh ideas to do">
      {data.length > 0 ? (
        <div className={s.cardWrapper}>
          {data.map((activity) => (
            <div
              className={activity.selected ? s.selectedCard : s.card}
              key={activity.key}
              onClick={() => onClick(activity)}
            >
              <p className={s.text}>{activity.activity}</p>
              <p className={s.text}>{activity.type}</p>
            </div>
          ))}
          <div className={s.btn} onClick={() => onFetch()}></div>
        </div>
      ) : (
        <div className={s.loader}>
          <ThreeDots height="20" width="60" color="#edf2f4" />
        </div>
      )}
    </Section>
  );
};

export default Activities;

Activities.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      activity: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
  onFetch: PropTypes.func.isRequired,
};
