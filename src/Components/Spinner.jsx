import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const Spinner = (props) => {
  const { type, color } = props;

  Spinner.propTypes = {
    color: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };
  return (
    <div
      style={{
        margin: 'auto',
        width: '50%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        fontFamily: 'cursive',
        fontWeight: 'bolder',
        fontSize: '1.5em',
      }}
    >
      <Loader
        type={type}
        color={color}
        height={100}
        width={100}
        secondaryColor="blue"
      />
      Loading ...
    </div>
  );
};

export default React.memo(Spinner);
