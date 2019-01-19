const a = `import React from 'react';
import ModalUnsaveWarn from 'views/widget/ModalUnsaveWarn';
import authConstants from 'constants/authConstants';
import InputTemplate from 'views/widget/InputTemplate';
import SelectTemplate from 'views/widget/SelectTemplate';
import CheckboxTemplate from 'views/widget/CheckboxTemplate';

class Device extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	name: 'Sam'
    };
  }

  render() {
    const {state, props} = this;
    const onChange = this.handleFormOnChange;

    return (
      <React.Fragment>
            <div className="block">
              <InputTemplate
                title="Hostname"
                iptName="hostname"
                iptValid={iptValid}
                iptObj={ipt}
                authTypes={[LENGTH]}
                minLength={0}
                maxLength={32}
              />
              <input type="text" model={state.name} />
              <input type="text" model={this.state.name} />
            </div>
      </React.Fragment>
    );
  }
}

export default Device;
`

const b = `export default (props) => {
	// @onChange = abc
	
	return <div>
	<InputTemplate title='i0' iptName='i0'/>
	<PasswordTemplate title='p1' iptName='i1' />
	<TextareaTemplate title='t1' iptName='i2' onChange={props.onChange} />
	<CheckboxTemplate title='c1' shape='circle' checkboxName='c1' />
	</div>
}`


module.exports = b