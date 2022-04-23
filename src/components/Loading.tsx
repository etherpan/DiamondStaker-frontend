import styled from 'styled-components'

const Loading = styled.div`
  // border: 8px solid #f3f3f3;
  // border-radius: 50%;
  // border-top: 8px solid #ddd;
  // border-bottom: 8px solid #ddd;
  position: absolute;
  width: 120px;
  height: 120px;
  left: calc(50% - 60px);
  top: calc(50% - 60px);
  background-image: url('images/rolling.png');
  background-size: contain;
  background-repeat: no-repeat;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default Loading
