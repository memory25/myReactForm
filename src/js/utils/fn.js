import Authentication from './inputAuthentication';

export const transUnit = byte => {
  const KB = byte / 1024;

  if (KB < 999) return `${Math.round(KB)} KB`;

  const MB = KB / 1024;

  if (MB < 999) return `${Math.round(MB)} MB`;

  return `${Math.round(MB / 1024)} GB`;
};

export const handleFormChange = tag => {
  const {value} = tag.target;
  const {iptName, selectName, checkboxName} = tag.data;

  return state => {
    if (iptName) {
      const ipt = Object.assign({}, state.ipt);
      const iptValid = Object.assign({}, state.iptValid);
      const {authTypes, minLength, maxLength, ipMaskGwObj, range} = tag.data;

      if (value === ipt[iptName]) {
        // test stage, want to avoid input frequencyly re-render;
        return null;
      }

      ipt[iptName] = value;
      if (authTypes.length === 0) return {ipt, iptValid}; // if type is empty, do nothing auth

      const {ipName, maskName, gatewayName} = ipMaskGwObj;

      const {isValid, error} = Authentication({
        authTypes,
        value,
        isValid: true,
        error: '',
        minLength,
        maxLength,
        ipValue: ipt[ipName],
        maskValue: ipt[maskName],
        gwValue: ipt[gatewayName],
        range,
      });

      const iptValidObj = {
        isValid,
        error,
      };

      // ipMaskGw
      const isIpMaskType = authTypes.some(type => type === 'IPMASK');
      const isIpMaskGwType = authTypes.some(type => type === 'IPMASKGW');

      if (isIpMaskType) {
        iptValid[ipName] = Object.assign({}, iptValidObj);
        iptValid[maskName] = Object.assign({}, iptValidObj);
      } else if (isIpMaskGwType) {
        iptValid[ipName] = Object.assign({}, iptValidObj);
        iptValid[maskName] = Object.assign({}, iptValidObj);
        iptValid[gatewayName] = Object.assign({}, iptValidObj);
      } else {
        iptValid[iptName] = Object.assign({}, iptValidObj);
      }
      //

      return {ipt, iptValid};
    } else if (selectName) {
      const select = Object.assign({}, state.select);

      select[selectName] = value;
      return {select};
    } else if (checkboxName) {
      const checked = tag.target.checked;
      const checkbox = Object.assign({}, state.checkbox);

      checkbox[checkboxName] = checked;
      return {checkbox};
    }
  };
};

export const checkingValidBeforeApply = iptValid =>
  Object.values(iptValid).every(info => info.isValid);

export const generateIptValid = ipt => {
  const iptValidInit = {};

  Object.keys(ipt).forEach(key => {
    iptValidInit[key] = {isValid: true, error: ''};
  });
  return iptValidInit;
};
