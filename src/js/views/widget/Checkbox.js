import React from 'react';
import PropTypes from 'prop-types';
import {handleFormChange} from 'utils/fn';
import {compose, reduceTagData} from 'utils';

function shapeFactory(shape) {
  if (shape === 'circle') return 'checkboxImg-circle';
  if (shape === 'rect') return 'checkboxImg-rect';
}

class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    const {onChange, checkboxName} = props;

    const connectTag = reduceTagData({checkboxName});

    const onChangeEnhance = compose(
      onChange,
      handleFormChange,
      connectTag,
      e => e.target
    );

    this.state = {onChangeEnhance};
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.disabled !== this.props.disabled;
  }

  render() {
    const {checkboxName, checked, disabled, shape} = this.props;
    const {onChangeEnhance} = this.state;

    return (
      <React.Fragment>
        <input
          id={checkboxName}
          defaultChecked={checked}
          type="checkbox"
          className="checkbox"
          onChange={onChangeEnhance}
          disabled={disabled}
        />
        <label htmlFor={checkboxName} className={shapeFactory(shape)} />
      </React.Fragment>
    );
  }
}

export default Checkbox;

Checkbox.propTypes = {
  checkboxName: PropTypes.string.isRequired,
  shape: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
};

Checkbox.defaultProps = {disabled: false};
