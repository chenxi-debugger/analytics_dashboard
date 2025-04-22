import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, value }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};
Card.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default Card;
