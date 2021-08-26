import React from 'react'
import styled from 'styled-components'

import Header from 'components/Header'
import Content from 'components/Content'

const Root = styled.div`
  height: 100%;
  display: flex;
  flex-flow: column;
`

const App = () => {
  return (
    <Root>
      <Header className="header"/>
      <Content className="content"/>
    </Root>
  )
}

export default App
