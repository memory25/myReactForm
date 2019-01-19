import React from 'react';
import PropTypes from 'prop-types';
import {handleFormChange} from 'utils/fn';
import {compose, reduceTagData} from 'utils';

class Select extends React.Component {
  constructor(props) {
    super(props);
    const {onChange, selectName} = props;

    const connectTag = reduceTagData({selectName});

    const onChangeEnhance = compose(
      onChange,
      handleFormChange,
      connectTag,
      e => e.target
    );

    this.state = {onChangeEnhance};
  }

  shouldComponentUpdate(nextProps) {
    const {disabled, optionsChangeCount} = this.props;

    return (
      nextProps.disabled !== disabled ||
      nextProps.optionsChangeCount !== optionsChangeCount
    );
  }
  render() {
    const {value, disabled, options, optionsChangeCount} = this.props;
    const {onChangeEnhance} = this.state;

    return (
      <select
        key={optionsChangeCount}
        defaultValue={value}
        onChange={onChangeEnhance}
        disabled={disabled}
      >
        {options instanceof Array ? (
          options.map(option => (
            <option
              key={option.title + option.value}
              value={option.value}
              hidden={option.hidden}
            >
              {option.title}
            </option>
          ))
        ) : (
          <option value="0">Error props !!</option>
        )}
      </select>
    );
  }
}

export default Select;

Select.propTypes = {
  selectName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      hidden: PropTypes.bool,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  optionsChangeCount: PropTypes.number,
};

Select.defaultProps = {
  disabled: false,
  optionsChangeCount: 0,
};
