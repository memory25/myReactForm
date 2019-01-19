import React from 'react';
import Select from 'views/widget/Select';
import PropTypes from 'prop-types';

class SelectTemplate extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {disabled, optionsChangeCount} = this.props;

    return (
      nextProps.disabled !== disabled ||
      nextProps.optionsChangeCount !== optionsChangeCount
    );
  }
  render() {
    const {
      title,
      selectName,
      selectObj,
      onChange,
      disabled,
      options,
      optionsChangeCount,
    } = this.props;
    const value = selectObj ? selectObj[selectName] : '';

    return (
      <div className="coupleWrap" key={optionsChangeCount}>
        <div className="keyPair">{title}</div>
        <div className="valuePair">
          <Select
            selectName={selectName}
            value={value}
            onChange={onChange}
            disabled={disabled}
            options={options}
            optionsChangeCount={optionsChangeCount}
          />
        </div>
      </div>
    );
  }
}

export default SelectTemplate;

SelectTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  selectObj: PropTypes.objectOf(PropTypes.string).isRequired,
  selectName: PropTypes.string.isRequired,
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

SelectTemplate.defaultProps = {
  disabled: false,
  optionsChangeCount: 0,
};
