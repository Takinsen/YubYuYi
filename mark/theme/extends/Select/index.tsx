import { Select } from '@mantine/core';
import style from './Select.module.css';

const SelectExtend = Select.extend({
  defaultProps: {
    placeholder: 'Select an option',
    searchable: true,
    size: 'md',
  },
  classNames: {
     root: style.root,
     dropdown: style.dropdown,
     option: style.item,
     input: style.input,
  },
});

export default SelectExtend;