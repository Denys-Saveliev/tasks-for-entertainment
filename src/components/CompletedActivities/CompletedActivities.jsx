import moment from "moment";
import Section from "../Section";
import s from "./CompletedActivities.module.css";
import PropTypes from "prop-types";

const CompletedActivities = ({ data }) => {
  return (
    <>
      {data.length > 0 && (
        <Section title="Completed challenges">
          <table className={s.table}>
            <thead>
              <tr>
                <th className={s.head}>{""}</th>
                <th className={s.head}>{"Title"}</th>
                <th className={s.head}>{"Type"}</th>
                <th className={s.head}>{"When"}</th>
              </tr>
            </thead>
            {data.map(({ key, activity, type, date }, index) => (
              <tbody className={s.tbody} key={key}>
                <tr className={s.row}>
                  <td className={s.data}>{(index += 1)}</td>
                  <td className={s.data}>{activity}</td>
                  <td className={s.data}>{type}</td>
                  <td className={s.data}>{moment(date).fromNow()}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </Section>
      )}
    </>
  );
};

export default CompletedActivities;

CompletedActivities.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      activity: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      date: PropTypes.number,
    })
  ),
};
