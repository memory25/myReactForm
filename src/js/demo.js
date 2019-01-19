import React from 'react';
import {generateIptValid} from 'utils/fn';
import Dumb from './dumb';
import Dumb2 from './dumb2';

class Demo extends React.Component {
  constructor() {
    super();
    const ipt = {};

    for (let i = 0; i < 20; i++) {
      ipt[`i${i}`] = `input${i}`;
    }
    ipt.i2 = 'length';
    ipt.i3 = '10';
    ipt.i4 = '192.168.0.1';
    ipt.i5 = '00:0A:02:0B:03:0C';
    const iptValid = generateIptValid(ipt);

    this.state = {
      ipt,
      iptValid,
      select: {
        s1: 's1',
        s2: 's2',
      },
      checkbox: {
        c1: true,
        c2: true,
        c3: true,
        c4: true,
      },
    };
  }

  handleFormOnChange = utils => this.setState(utils);

  render() {
    console.log(this.state);
    return (
      <section className="littleSection">
        <Dumb {...this.state} onChange={this.handleFormOnChange} />
        <Dumb2 {...this.state} onChange={this.handleFormOnChange} />
      </section>
    );
  }
}

export default Demo;
