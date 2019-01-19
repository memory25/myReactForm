import React from 'react';
import Textarea from 'views/widget/Textarea';
import PropTypes from 'prop-types';

class TextareaTemplate extends React.Component {
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
    } = this.props;
    const isValid = iptValid ? iptValid[iptName].isValid : true;
    const value = iptObj ? iptObj[iptName] : '';

    return (
      <div className="coupleWrap">
        <div className={`keyPair ${isValid ? '' : 'invalidLabel'}`}>
          {title}
        </div>
        <div className="valuePair">
          <Textarea
            iptName={iptName}
            authTypes={authTypes}
            isValid={isValid}
            value={value}
            onChange={onChange}
            minLength={minLength}
            maxLength={maxLength}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }
}

export default TextareaTemplate;

TextareaTemplate.propTypes = {
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

TextareaTemplate.defaultProps = {
  minLength: 0,
  maxLength: 0,
  authTypes: [''],
  disabled: false,
};
