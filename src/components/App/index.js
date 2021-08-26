import React from 'react'
import styled from 'styled-components'

import Header from 'components/Header'
import Content from 'components/Content'

const Root = styled.div`
  width: 100%;
  height: 100%;
`

const App = () => {
  return (
    <Root>
      <Header />
      <Content />
    </Root>
  )
}

export default App
