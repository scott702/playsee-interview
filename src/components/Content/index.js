import React, { useEffect } from 'react'
import styled from 'styled-components'

//import { from } from 'rxjs'
//import { getPosts } from 'apis/request'

const Root = styled.div``

const App = () => {
  useEffect(() => {
    //bonus-以下為預先寫好的Api Request
    //from(getPosts()).subscribe(response => {})
  }, [])

  return <Root></Root>
}

export default App
