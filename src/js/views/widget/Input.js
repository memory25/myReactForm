import React from 'react';
import PropTypes from 'prop-types';
import {handleFormChange} from 'utils/fn';
import authConstants from 'constants/authConstants';
import {compose, debounce, reduceTagData} from 'utils';

const whenType = (authTypeName, jsType, isOtherConditionValid = true) => (
  props,
  propName,
  componentName
) => {
  const haveType = props.authTypes.some(type => type === authTypeName);

  if (!haveType) return null;
  const type = typeof props[propName];

  if (type === jsType && isOtherConditionValid) return null;
  return new Error(
    `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`
  );
};

const whenLengthType = (props, propName, componentName) => {
  const isOtherConditionValid = props.maxLength > props.minLength;

  return whenType('LENGTH', 'number', isOtherConditionValid)(
    props,
    propName,
    componentName
  );
};

const whenRangeType = (props, propName, componentName) => {
  const isOtherConditionValid = props.range.every(range => {
    const {max, min} = range;

    if (max === undefined || min === undefined) return true;

    return min <= max;
  });

  return whenType('RANGE', 'object', isOtherConditionValid)(
    props,
    propName,
    componentName
  );
};

const whenIpMaskGwType = (props, propName, componentName) => {
  const {ipName, maskName, gatewayName} = props.ipMaskGwObj;
  let isOtherConditionValid = true;
  const isIpMaskType = props.authTypes.some(type => type === 'IPMASK');
  const isIpMaskGwType = props.authTypes.some(type => type === 'IPMASKGW');

  if (isIpMaskType && !(ipName && maskName)) {
    isOtherConditionValid = false;
    return whenType('IPMASK', 'object', false)(props, propName, componentName);
  } else if (isIpMaskGwType && !(ipName && maskName && gatewayName)) {
    isOtherConditionValid = false;
  }
  return whenType('IPMASKGW', 'object', isOtherConditionValid)(
    props,
    propName,
    componentName
  );
};

class Input extends React.Component {
  constructor(props) {
    super(props);
    const {
      authTypes,
      onChange,
      debounceTime,
      iptName,
      minLength,
      maxLength,
      ipMaskGwObj,
      range,
    } = props;
    const authTypesFilter = authTypes.filter(type =>
      Object.values(authConstants).some(typeCons => type === typeCons)
    );

    const connectTag = reduceTagData({
      iptName,
      minLength,
      maxLength,
      ipMaskGwObj,
      range,
      authTypes: authTypesFilter,
    });

    const onChangeEnhance = compose(
      onChange,
      handleFormChange
    );
    // const onChangeEnhance = compose(onChange, handleFormChange, connectTag, e => e.target); if dont want to async;
    const onChangeDebounce = compose(
      debounce(onChangeEnhance)(debounceTime),
      connectTag,
      e => e.target
    );

    this.state = Object.assign(
      {},
      {
        authTypesFilter,
        onChangeDebounce,
      }
    );
  }

  shouldComponentUpdate(nextProps) {
    const {disabled, isValid, type} = this.props;

    return (
      nextProps.disabled !== disabled ||
      nextProps.isValid !== isValid ||
      nextProps.type !== type
    );
  }

  render() {
    const {type, isValid, maxLength, disabled, value} = this.props;
    const {onChangeDebounce} = this.state;

    return (
      <input
        type={type}
        defaultValue={value}
        onChange={onChangeDebounce}
        className={isValid || disabled ? '' : 'invalidIpt'}
        maxLength={maxLength === 0 ? null : maxLength}
        disabled={disabled}
      />
    );
  }
}

export default Input;

Input.propTypes = {
  iptName: PropTypes.string.isRequired,
  type: PropTypes.string,
  authTypes: PropTypes.arrayOf(PropTypes.string),
  isValid: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  range: whenRangeType,
  minLength: whenLengthType,
  maxLength: whenLengthType,
  ipMaskGwObj: whenIpMaskGwType,
  debounceTime: PropTypes.number,
};

Input.defaultProps = {
  minLength: 0,
  maxLength: 0,
  authTypes: [],
  range: [],
  type: 'text',
  disabled: false,
  ipMaskGwObj: {
    ipName: '',
    maskName: '',
    gatewayName: '',
  },
  debounceTime: 400,
};
