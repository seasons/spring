import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Typography } from '@material-ui/core';

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 3rem;
`

const LoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(63, 63, 116, 1) 0%, rgba(2, 0, 36, 1) 100%);
  color: #96b7d9;
`

const Rocket = () => {
  return (
    <span role="img" aria-label="rocket">
      ❄️
    </span>
  )
}

export const AppLoader: React.FunctionComponent = () => {
  return (
    <LoaderContainer>
      <div>
        <Typography variant="h3">
          <Rotate>
            <Rocket />
          </Rotate>{" "}
          Getting your drip on{" "}
          <Rotate>
            <Rocket />
          </Rotate>
        </Typography>
      </div>
    </LoaderContainer>
  )
}
