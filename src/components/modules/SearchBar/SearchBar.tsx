import React from "react";
import { OutlinedInput, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./SearchBar.styles";

const SearchBar: React.FC = () => {
  const styles = useStyles();
  return (
    <OutlinedInput
      id="searchbar"
      // value={values.weight}
      // onChange={handleChange('weight')}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      inputProps={{
        "aria-label": "search",
      }}
      type="search"
      placeholder="Search..."
      className={styles.input}
    />
  );
};

export default SearchBar;
