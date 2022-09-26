import Section from "../Section";
import { nanoid } from "nanoid";
import s from "./Statistics.module.css";
import PropTypes from "prop-types";

const Statistics = ({ data }) => {
  const typesOfActivities = [...new Set(data.map((type) => type.type))];

  return (
    <>
      {data.length > 0 && (
        <Section title="Achievments">
          <div className={s.statisticsWrapper}>
            {typesOfActivities.map((type) => (
              <div key={nanoid()} className={s.statisticBox}>
                <div className={s.statisticNumber}>
                  {data.filter((item) => item.type === type).length}
                </div>
                <p className={s.statisticText}>{type}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  );
};

export default Statistics;

Statistics.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
    })
  ),
};
