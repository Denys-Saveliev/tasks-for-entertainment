import Section from "../Section/Section";
import Slider from "react-slick";
import s from "./SelectedActivities.module.css";
import PropTypes from "prop-types";

const SelectedActivities = ({ data, onClick }) => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: data.length >= 3,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };

  return (
    <>
      {data.length > 0 && (
        <Section title="Ideas in my list">
          <Slider {...settings}>
            {data.map((activity) => (
              <div
                className={s.card}
                key={activity.key}
                onClick={() => onClick(activity)}
              >
                <p className={s.text}>{activity.activity}</p>
                <p className={s.text}>{activity.type}</p>
              </div>
            ))}
          </Slider>
        </Section>
      )}
    </>
  );
};

export default SelectedActivities;

SelectedActivities.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      activity: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};
