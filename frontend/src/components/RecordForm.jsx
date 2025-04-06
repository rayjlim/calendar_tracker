import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { format, sub } from 'date-fns';
import { ToastContainer } from 'react-toastify';
import { FULL_DATE_FORMAT } from '../constants';
import useRecordForm from '../hooks/useRecordForm';
import '../styles/recordForm.css';

const AdjustmentButton = memo(({ value, onClick, children }) => (
  <button
    type="button"
    className="action-button"
    onClick={() => onClick(value)}
  >
    {children}
  </button>
));

const DefaultButton = memo(({ countDefault, onClick }) => (
  <button
    type="button"
    className="action-button destructive-button default-button"
    onClick={onClick}
  >
    {`Default: ${countDefault}`}
  </button>
));

const RecordForm = ({ onUpdate }) => {
  const {
    setRecordDate,
    saveDefault,
    saveGoal,
    countRef,
    countDefault,
    addFactorToCount,
    commentRef,
    isSending,
    sendRecord,
    recordDate,
    changeDate,
  } = useRecordForm(onUpdate);

  const handleSubmit = e => {
    e.preventDefault();
    sendRecord();
  };

  const handleDefaultReset = () => {
    countRef.current.value = countDefault;
    setRecordDate(format(new Date(), FULL_DATE_FORMAT));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <ToastContainer />
      <div className="actions-container">
        <AdjustmentButton value={-0.2} onClick={addFactorToCount}>-.2</AdjustmentButton>
        <AdjustmentButton value={-1.0} onClick={addFactorToCount}>-1</AdjustmentButton>
        <AdjustmentButton value={1.0} onClick={addFactorToCount}>+1</AdjustmentButton>
        <AdjustmentButton value={0.2} onClick={addFactorToCount}>+.2</AdjustmentButton>
      </div>

      <div className="actions-container">
        {/* eslint-disable-next-line  */}
        <label htmlFor="goalEntry">Track</label>
        <select
          className="input-field"
          name="goal"
          id="goalEntry"
          aria-label="Track goal type"
        >
          <option>weight</option>
        </select>
        <button type="button" className="action-button orange-button" onClick={saveGoal}>Goal</button>
      </div>

      <div className="actions-container">
        {/* eslint-disable-next-line  */}
        <label htmlFor="countInput">Count:</label>
        <input
          id="countInput"
          className="input-field count-input"
          type="number"
          step="0.1"
          ref={countRef}
          defaultValue={countDefault}
        />
        <button type="submit" disabled={isSending} className="action-button green-button">
          {isSending ? 'Sending Record...' : 'Submit'}
        </button>
      </div>

      <div className="actions-container">
        {/* eslint-disable-next-line  */}
        <label htmlFor="commentInput" id="commentLabel">Comment</label>
        <input
          id="commentInput"
          className="input-field comment-input"
          type="text"
          ref={commentRef}
          placeholder="Enter comment"
          aria-labelledby="commentLabel"
        />
      </div>
      <div className="actions-container">
        <DefaultButton countDefault={countDefault} onClick={handleDefaultReset} />
        <button type="button" className="action-button blue-button" onClick={saveDefault}>Default</button>
      </div>
      <div className="actions-container">
        {/* eslint-disable-next-line  */}
        <label htmlFor="dateInput">Date:</label>
        <input
          id="dateInput"
          type="date"
          value={recordDate}
          onChange={changeDate}
        />
        <button
          type="button"
          className="action-button"
          onClick={() => {
            setRecordDate(format(sub(new Date(recordDate), { days: 0 }), FULL_DATE_FORMAT));
          }}
        >
          -1 day
        </button>
      </div>
    </form>
  );
};

AdjustmentButton.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

DefaultButton.propTypes = {
  countDefault: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

RecordForm.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default RecordForm;
