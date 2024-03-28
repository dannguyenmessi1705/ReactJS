import styled, { css } from "styled-components";

const h1 = css`
  font-size: 3rem;
  font-weight: 600;
`; // định nghĩa các kiểu cho h1

const h2 = css`
  font-size: 2rem;
  font-weight: 600;
`; // định nghĩa các kiểu cho h2

const h3 = css`
  font-size: 2rem;
  font-weight: 500;
`; // định nghĩa các kiểu cho h3

const h4 = css`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
`; // định nghĩa các kiểu cho h4

const Heading = styled.h1`
  line-height: 1.4;
  ${(props) =>
    props.as === "h1" && h1} // nếu props.as === "h1" thì sẽ áp dụng css của h1
    ${(props) =>
    props.as === "h2" && h2} // nếu props.as === "h2" thì sẽ áp dụng css của h2
    ${(props) =>
    props.as === "h3" && h3} // nếu props.as === "h3" thì sẽ áp dụng css của h3
    ${(props) =>
    props.as === "h4" && h4} // nếu props.as === "h3" thì sẽ áp dụng css của h4
`;

export default Heading;
