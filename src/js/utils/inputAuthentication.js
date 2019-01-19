import compose from 'utils/compose';

const lengthType = auth => {
  if (!auth.isValid) return auth;
  const {minLength, maxLength, value} = auth;
  const leng = value.length;
  const isValid = leng >= Number(minLength) && leng <= Number(maxLength);
  const error = isValid ? '' : 'LENGTH';

  return Object.assign({}, auth, {isValid, error});
};

const rangeType = auth => {
  if (!auth.isValid) return auth;
  const value = Number(auth.value);

  if (value !== 0 && !value) {
    return Object.assign({}, auth, {isValid: false, error: 'expect number'});
  }

  const isValid = auth.range.some(range => {
    const {max, min} = range;

    if (max === undefined && min === undefined) {
      return true;
    } else if (max === undefined) {
      return value >= min;
    } else if (min === undefined) {
      return value <= max;
    }
    return value >= min && value <= max;
  });
  const error = isValid ? '' : 'LENGTH';

  return Object.assign({}, auth, {isValid, error});
};

const ipType = auth => {
  if (!auth.isValid) return auth;
  const {value} = auth;

  if (value.split('.').length !== 4) {
    return Object.assign({}, auth, {isValid: false, error: 'IP'});
  }

  const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

  const isValid =
    ipReg.test(value) &&
    value !== '255.255.255.255' &&
    value !== '127.0.0.1' &&
    value !== '0.0.0.0';
  const error = isValid ? '' : 'IP';

  return Object.assign({}, auth, {isValid, error});
};

const ipMaskType = auth => {
  if (!auth.isValid) return auth;

  let {isValid, error} = auth;
  const {ipValue, maskValue} = auth;

  if (ipValue === maskValue) {
    return Object.assign({}, auth, {isValid: false, error: 'IPMASK'});
  }
  if (ipValue.split('.').length !== 4) {
    return Object.assign({}, auth, {isValid: false, error: 'IP'});
  }
  if (maskValue.split('.').length !== 4) {
    return Object.assign({}, auth, {isValid: false, error: 'MASK'});
  }

  const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

  if (!ipReg.test(ipValue)) {
    return Object.assign({}, auth, {isValid: false, error: 'IP'});
  }
  if (!ipReg.test(maskValue)) {
    return Object.assign({}, auth, {isValid: false, error: 'MASK'});
  }

  const maskReg = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
  const aIpRegAll = /^(\d|[1-9]\d|1[0-1]\d|12[0-7])(\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}$/;
  const bIpRegAll = /^(12[8-9]|1[3-8]\d|19[0-1])(\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}$/;
  const cIpRegAll = /^(19[2-9]|2[0-1]\d|22[0-3])((\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))){3}$/;
  let ipBelongTo = [];

  if (aIpRegAll.test(ipValue)) {
    ipBelongTo = [255, 0, 0, 0];
  } else if (bIpRegAll.test(ipValue)) {
    ipBelongTo = [255, 255, 0, 0];
  } else if (cIpRegAll.test(ipValue)) {
    ipBelongTo = [255, 255, 255, 0];
  }

  if (!maskReg.test(auth.maskValue)) {
    isValid = false;
    error = 'IPMASK';
  } else {
    const maskArr = maskValue.split('.');

    ipBelongTo
      .map((num, i) => num & parseInt(maskArr[i], 10))
      .every((num, i) => {
        if (num !== ipBelongTo[i]) {
          isValid = false;
          error = 'IPMASK';
          return false;
        }
        return true;
      });
  }
  return Object.assign({}, auth, {isValid, error});
};

const ipMaskGwType = auth => {
  if (!auth.isValid) return auth;
  const ipMaskAuthResult = ipMaskType(auth);

  if (!ipMaskAuthResult.isValid) return ipMaskAuthResult;

  let {isValid, error} = auth;
  const {ipValue, maskValue, gwValue} = auth;

  if (gwValue.split('.').length !== 4) {
    return Object.assign({}, auth, {isValid: false, error: 'GW'});
  }

  const ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

  if (!ipReg.test(maskValue)) {
    return Object.assign({}, auth, {isValid: false, error: 'MASK'});
  }
  if (!ipReg.test(gwValue)) {
    return Object.assign({}, auth, {isValid: false, error: 'GW'});
  }

  if (ipValue === gwValue || maskValue === gwValue) {
    return Object.assign({}, auth, {isValid: false, error: 'IPMASKGW'});
  }

  const ipArr = ipValue.split('.');
  const maskArr = maskValue.split('.');
  const gwArr = gwValue.split('.');

  const isNetValid = maskArr.every(
    (numString, i) =>
      (parseInt(ipArr[i], 10) & parseInt(numString, 10)) ===
      (parseInt(gwArr[i], 10) & parseInt(numString, 10))
  );

  if (!isNetValid) {
    isValid = false;
    error = 'IPMASKGW';
  }

  return Object.assign({}, auth, {isValid, error});
};

const macType = auth => {
  if (!auth.isValid) return auth;

  const {value} = auth;

  if (value.length !== 17) {
    return Object.assign({}, auth, {isValid: false, error: 'MAC'});
  }

  const macReg = /([A-Fa-f0-9]{2}:){5}[A-Fa-f0-9]{2}/;

  if (!macReg.test(value)) {
    return Object.assign({}, auth, {isValid: false, error: 'MAC'});
  }
  return auth;
};

const typeMap = {
  LENGTH: lengthType,
  RANGE: rangeType,
  IP: ipType,
  IPMASK: ipMaskType,
  IPMASKGW: ipMaskGwType,
  MAC: macType,
};

export default auth =>
  compose(...auth.authTypes.map(type => typeMap[type]))(auth);

export {lengthType, rangeType, ipType, ipMaskType, ipMaskGwType, macType};
