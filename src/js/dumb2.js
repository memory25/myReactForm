import React from 'react';
import InputTemplate from 'views/widget/InputTemplate';

class Dumb2 extends React.Component {
  constructor(props) {
    super(props);

    this.test = props.onChange;
  }
  render() {
    // @onChange = this.test.onChange
    const {props} = this;

    return (
      <React.Fragment>
        <div className="block">
          <InputTemplate
            title="ipt6"
            iptName="i6"
            iptValid={props.iptValid}
            iptObj={props.ipt}
            onChange={props.onChange}
          />
          <InputTemplate title="ipt7" iptName="i7" />
          <InputTemplate title="ipt8" iptName="i8" disabled />
        </div>
        <div>
          <p>ipt6 : {props.ipt.i6}</p>
          <p>ipt7 : {props.ipt.i7}</p>
          <p>ipt8 : {props.ipt.i8}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Dumb2;
