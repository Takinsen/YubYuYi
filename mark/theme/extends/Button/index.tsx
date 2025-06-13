import { Button } from '@mantine/core';
import style from './Button.module.css';

const ButtonExtend = Button.extend({
  defaultProps: {
    size: 'md',
  },
  classNames: {
    root: style.root,
  }
});

export default ButtonExtend;