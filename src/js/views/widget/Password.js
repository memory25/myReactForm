import React from 'react';
import PropTypes from 'prop-types';
import Input from 'views/widget/Input';
import authConstants from 'constants/authConstants';

class Password extends React.Component {
  state = {openEyes: false};

  shouldComponentUpdate(nextProps, nextState) {
    const {disabled, isValid} = this.props;
    const {openEyes} = this.state;

    return (
      nextProps.disabled !== disabled ||
      nextProps.isValid !== isValid ||
      nextState.openEyes !== openEyes
    );
  }

  handlePasswordToggle = () => {
    this.setState(state => ({openEyes: !state.openEyes}));
  };

  render() {
    const {state} = this;
    const {
      iptName,
      isValid,
      value,
      onChange,
      minLength,
      maxLength,
      disabled,
      debounceTime,
    } = this.props;
    const {LENGTH} = authConstants;

    return (
      <div className="password">
        <Input
          type={state.openEyes ? 'text' : 'password'}
          iptName={iptName}
          authTypes={[LENGTH]}
          isValid={isValid || disabled}
          value={value}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
          disabled={disabled}
          debounceTime={debounceTime}
        />
        <span
          className={
            'icon ' +
            (state.openEyes ? 'icon-password-toggle' : 'icon-password')
          }
          onClick={this.handlePasswordToggle}
          role="button"
          tabIndex="-1"
        />
      </div>
    );
  }
}

export default Password;

Password.propTypes = {
  iptName: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  debounceTime: PropTypes.number,
};

Password.defaultProps = {
  minLength: 3,
  maxLength: 64,
  debounceTime: 400,
  disabled: false,
};
