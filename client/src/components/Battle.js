import React from 'react';
import { Subscription } from 'react-apollo'
import Challenger from './Challenger';

const Battle = (left, right) => (
  <div>
    <Challenger challenger={left} />
    vs
    <Challenger challenger={right} />
  </div>
)
export default Battle
