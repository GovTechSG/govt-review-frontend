/* eslint max-len: 0 */

import React, { Component } from 'react';

export default class PageLoadSpinner extends Component {
  componentDidMount() {
    let startxCircle8 = null;
    const pathx = document.getElementsByClassName('nc-circle-03-linear');
    const pathxNumber = pathx.length;

    function stepCircleThreeLinX(t) {
      startxCircle8 || (startxCircle8 = t);
      const e = t - startxCircle8;
      const n = Math.min(e / 1.4, 360);
      e < 505 || (startxCircle8 += 504);
      if (pathx[0]) {
        window.requestAnimationFrame(stepCircleThreeLinX);
        for (let j = 0; pathxNumber > j; j++) {
          pathx[j].setAttribute('transform', `rotate(${n} 16 16)`);
        }
      }
    }

    window.requestAnimationFrame(stepCircleThreeLinX);
  }

  render() {
    return (
      <svg className="nc-icon glyph" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
        <g>
          <path opacity="0.4" fill="#509ed3" d="M16,32C7.17773,32,0,24.82227,0,16S7.17773,0,16,0s16,7.17773,16,16S24.82227,32,16,32z M16,4C9.3833,4,4,9.3833,4,16s5.3833,12,12,12s12-5.3833,12-12S22.6167,4,16,4z"></path>
          <path className="nc-circle-03-linear" data-color="color-2" fill="#509ed3" d="M32,16h-4c0-6.6167-5.3833-12-12-12V0C24.82227,0,32,7.17773,32,16z" transform="rotate(67.29071430096936 16 16)"></path>
        </g>
      </svg>
    );
  }
}
