import { Menu } from '@mantine/core';
import styles from './Menu.module.css';

const MenuExtend = Menu.extend({
  classNames: {
    dropdown: styles.menuDropdown,
    item: styles.menuItem,
  },
  defaultProps: {
    shadow: 'md',
    position: 'bottom-start',
    withArrow: false,
  },
});

export default MenuExtend;