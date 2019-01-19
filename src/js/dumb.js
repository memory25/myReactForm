import React from 'react';
import InputTemplate from 'views/widget/InputTemplate';
import SelectTemplate from 'views/widget/SelectTemplate';
import PasswordTemplate from 'views/widget/PasswordTemplate';
import CheckboxTemplate from 'views/widget/CheckboxTemplate';
import TextareaTemplate from 'views/widget/TextareaTemplate';
import authType from 'constants/authConstants';

export default props => (
  <React.Fragment>
    <div className="block">
      <SelectTemplate
        title="select"
        selectName="s1"
        options={[
          {title: 's1', value: 's111'},
          {title: 'hello', value: 'hello'},
        ]}
      />
      <SelectTemplate
        title="select"
        selectName="s2"
        options={[
          {title: 's2', value: 's111'},
          {title: 'hello', value: 'hello'},
        ]}
        disabled
      />
      <PasswordTemplate title="password" iptName="i0" />
      <TextareaTemplate title="textarea1" iptName="i1" />
    </div>
    <div className="block">
      <CheckboxTemplate title="check1" shape="circle" checkboxName="c1" />
      <CheckboxTemplate
        title="check1"
        shape="circle"
        checkboxName="c3"
        disabled
      />
      <CheckboxTemplate title="check2" shape="rect" checkboxName="c2" />
      <CheckboxTemplate
        title="check2"
        shape="rect"
        checkboxName="c4"
        disabled
      />
    </div>
    <div className="block">
      <InputTemplate
        title="length 6~8"
        iptName="i2"
        authTypes={[authType.LENGTH]}
        minLength={6}
        maxLength={8}
      />
      <InputTemplate
        title="Range 20~30 1~10"
        iptName="i3"
        authTypes={[authType.RANGE]}
        range={[{max: 30, min: 20}, {max: 10, min: 1}]}
      />
      <InputTemplate title="Ip" iptName="i4" authTypes={[authType.IP]} />
      <InputTemplate title="Mac" iptName="i5" authTypes={[authType.MAC]} />
    </div>
  </React.Fragment>
);
