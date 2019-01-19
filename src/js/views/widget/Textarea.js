import React from 'react';
import PropTypes from 'prop-types';
import {handleFormChange} from 'utils/fn';
import authConstants from 'constants/authConstants';
import {compose, debounce, reduceTagData} from 'utils';

const lengthType = (props, propName, componentName) => {
  const isLengthType = props.authTypes.some(type => type === 'LENGTH');

  if (!isLengthType) return null;

  if (
    typeof props[propName] === 'number' &&
    props.maxLength > props.minLength
  ) {
    return null;
  }
  return new Error(
    `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`
  );
};

class Textarea extends React.Component {
  constructor(props) {
    super(props);
    const {
      authTypes,
      onChange,
      debounceTime,
      iptName,
      minLength,
      maxLength,
    } = props;
    const authTypesFilter = authTypes.filter(type =>
      Object.values(authConstants).some(typeCons => type === typeCons)
    );

    const connectTag = reduceTagData({
      iptName,
      minLength,
      maxLength,
      authTypes: authTypesFilter,
      ipMaskGwObj: {
        ipName: '',
        maskName: '',
        gatewayName: '',
      },
    });

    const onChangeEnhance = compose(
      onChange,
      handleFormChange
    );
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
    const {disabled, isValid} = this.props;

    return nextProps.disabled !== disabled || nextProps.isValid !== isValid;
  }

  render() {
    const {isValid, value, maxLength, disabled} = this.props;
    const {onChangeDebounce} = this.state;

    return (
      <textarea
        defaultValue={value}
        onChange={onChangeDebounce}
        className={isValid ? '' : 'invalidIpt'}
        maxLength={maxLength === 0 ? null : maxLength}
        disabled={disabled}
      />
    );
  }
}

export default Textarea;

Textarea.propTypes = {
  iptName: PropTypes.string.isRequired,
  authTypes: PropTypes.arrayOf(PropTypes.string),
  isValid: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  minLength: lengthType,
  maxLength: lengthType,
  disabled: PropTypes.bool,
};

Textarea.defaultProps = {
  minLength: 0,
  maxLength: 0,
  authTypes: [],
  disabled: false,
  debounceTime: 400,
};
