import React from 'react';
import Password from 'views/widget/Password';
import PropTypes from 'prop-types';

class PasswordTemplate extends React.Component {
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
      minLength,
      maxLength,
      disabled,
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
          <Password
            iptName={iptName}
            isValid={isValid || disabled}
            value={value}
            onChange={onChange}
            minLength={minLength}
            maxLength={maxLength}
            disabled={disabled}
            debounceTime={debounceTime}
          />
        </div>
      </div>
    );
  }
}

export default PasswordTemplate;

PasswordTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  iptName: PropTypes.string.isRequired,
  iptObj: PropTypes.objectOf(PropTypes.string).isRequired,
  iptValid: PropTypes.objectOf(
    PropTypes.shape({
      isValid: PropTypes.bool.isRequired,
      error: PropTypes.string.isRequired,
    })
  ).isRequired,
};

PasswordTemplate.defaultProps = {
  minLength: 3,
  maxLength: 64,
  disabled: false,
};
