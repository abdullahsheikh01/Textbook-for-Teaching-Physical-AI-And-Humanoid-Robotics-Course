import React from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import {useNavbarSecondaryMenu, useScrollPosition} from '@docusaurus/theme-common/internal';
import {useColorMode} from '@docusaurus/theme-common';
import styles from './styles.module.css';

function Navbar({children}) {
  const {navbar: {hideOnScroll}} = useThemeConfig();
  const mobileSidebar = useNavbarSecondaryMenu();
  const { colorMode, setColorMode } = useColorMode();
  const is  Dark  = colorMode === 'dark';

  const { scrollY } = useScrollPosition();

  return (
    <nav
      className={clsx('navbar', 'navbar--fixed-top', {
        [styles.navbarHideable]: hideOnScroll,
        [styles.navbarHidden]: hideOnScroll && scrollY > 50,
      })}
    >
      <div className="navbar__inner">
        {children}
      </div>
    </nav>
  );
}

export default React.memo(Navbar);