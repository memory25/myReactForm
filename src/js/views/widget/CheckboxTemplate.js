import React from 'react';
import Checkbox from 'views/widget/Checkbox';
import PropTypes from 'prop-types';

class CheckboxTemplate extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.disabled !== this.props.disabled;
  }

  render() {
    const {
      title,
      tag,
      checkboxName,
      checkboxObj,
      onChange,
      disabled,
      shape,
    } = this.props;
    const checked = checkboxObj ? checkboxObj[checkboxName] : false;

    return (
      <div className="coupleWrap">
        <div className="keyPair">{title}</div>
        <div className="valuePair">
          <Checkbox
            onChange={onChange}
            checkboxName={checkboxName}
            checked={checked}
            disabled={disabled}
            shape={shape}
          />
          <span>{tag}</span>
        </div>
      </div>
    );
  }
}

export default CheckboxTemplate;

CheckboxTemplate.propTypes = {
  title: PropTypes.string,
  tag: PropTypes.string,
  checkboxObj: PropTypes.objectOf(PropTypes.bool).isRequired,
  checkboxName: PropTypes.string.isRequired,
};

CheckboxTemplate.defaultProps = {
  disabled: false,
  title: '',
  tag: '',
};
