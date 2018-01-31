import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Cell = ({ value, onClick }) => (
  <div className="block" onClick={onClick}>
    <div
      className={classNames(
        'circle',
        { red: value === 1 },
        { yellow: value === 2 }
      )}
    />
  </div>
)

Cell.propTypes = {
  value: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default Cell
