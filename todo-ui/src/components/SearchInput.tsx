import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import debounce from "lodash/debounce";
import React, { ChangeEvent } from "react";

const SearchInput: React.FC<SearchProps> = ({ onSearch, ...props }) => {
  const debouncedSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
        onSearch(e.target.value);
    }
  }, 500);

  return (
    <Input.Search
      onChange={debouncedSearch}
      onSearch={onSearch}
      placeholder="Search..."
      {...props}
    />
  );
};

export default SearchInput;
