import { FormEvent, ReactElement, useRef } from 'react';

type Props = {
  onFilter: (filter: string) => void;
};

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
      />
      <button type="submit" data-testid="filter-submit">
        Suche
      </button>
    </form>
  );
};

export default Filter;
