import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
}; // định nghĩa các kích thước cho button

const variations = {
  primary: css`
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);

    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    background-color: var(--color-red-700);

    &:hover {
      background-color: var(--color-red-800);
    }
  `,
}; // định nghĩa các biến thể cho button

const Button = styled.button`
  border: none;
  border-radius: var(
    --border-radius-sm
  ); // Các giá trị đã được định nghĩa ở GlobalStyles
  box-shadow: var(--shadow-sm); // Các giá trị đã được định nghĩa ở GlobalStyles
  ${(props) =>
    sizes[
      props.size
    ]} // nếu props.sizes === "small" thì sẽ áp dụng css của small và tương tự với các kích thước khác
  ${(props) =>
    variations[
      props.variation
    ]} // nếu props.variation === "primary" thì sẽ áp dụng css của primary, và tương tự với các biến thể khác
`;

Button.defaultProps = {
  size: "medium",
  variation: "primary",
};

export default Button;
