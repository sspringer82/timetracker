/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FormEvent, ReactElement, useRef } from "react";

type Props = {
  onFilter: (filter: string) => void;
};

type ButtonProps = {
  variant?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = styled.button<ButtonProps>`
  border-radius: 5px;
  color: ${({ variant }) => (variant === "primary" ? "white" : "black")};
  background-color: ${({ variant }) =>
    variant === "primary" ? "blue" : "lightgray"};
  margin: 0 10px;
`;

const Filter = ({ onFilter }: Props): ReactElement => {
  const searchRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const value = searchRef.current?.value;
    onFilter(value!);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Suchbegriff"
        ref={searchRef}
        data-testid="filter-input"
        css={css`
          margin: 0 10px;
        `}
      />
      <Button type="submit" data-testid="filter-submit" variant="primary">
        Suche
      </Button>
    </form>
  );
};

export default Filter;
