import React from 'react'

import { ReactComponent as Logo } from 'assets/images/logo/logo.svg'
import classes from './style/style.module.scss'

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <div className={classes.logo}>
          <a href=''>
            <Logo alt='Playsee' />
            <span>Playsee</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
