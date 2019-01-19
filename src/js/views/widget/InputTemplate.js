import React from 'react';
import Input from 'views/widget/Input';
import PropTypes from 'prop-types';

class InputTemplate extends React.Component {
  shouldComponentUpdate(nextProps) {
    const {iptName, disabled, iptValid} = this.props;

    return (
      nextProps.disabled !== disabled ||
      nextProps.iptValid[iptName].isValid !== iptValid[iptName].isValid
    );
  }

  render() {
    const {
      title,
      iptName,
      iptObj,
      iptValid,
      onChange,
      authTypes,
      minLength,
      maxLength,
      disabled,
      ipMaskGwObj,
      range,
      debounceTime,
    } = this.props;
    const isValid = iptValid ? iptValid[iptName].isValid : true;
    const value = iptObj ? iptObj[iptName] : '';

    return (
      <div className="coupleWrap">
        <div className={`keyPair ${isValid || disabled ? '' : 'invalidLabel'}`}>
          {title}
        </div>
        <div className="valuePair">
          <Input
            iptName={iptName}
            authTypes={authTypes}
            isValid={isValid || disabled}
            value={value}
            onChange={onChange}
            minLength={minLength}
            maxLength={maxLength}
            disabled={disabled}
            ipMaskGwObj={ipMaskGwObj}
            range={range}
            debounceTime={debounceTime}
          />
        </div>
      </div>
    );
  }
}

export default InputTemplate;

InputTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  iptObj: PropTypes.objectOf(PropTypes.string).isRequired,
  iptValid: PropTypes.objectOf(
    PropTypes.shape({
      isValid: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
    })
  ).isRequired,
};

InputTemplate.defaultProps = {
  minLength: 0,
  maxLength: 0,
  authTypes: [''],
  type: 'text',
  disabled: false,
  ipMaskGwObj: {
    ipName: '',
    maskName: '',
    gatewayName: '',
  },
};
