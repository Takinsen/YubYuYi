import { Input } from '@mantine/core';
import style from './Input.module.css';

const InputExtend = Input.extend({
  defaultProps: {
    size: 'md',
  },
  classNames: {
    input: style.input, 
  },
});

export default InputExtend;
