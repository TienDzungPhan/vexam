import React, { useState } from "react";
import {
  AppBar,
  Button,
  Slide,
  SwipeableDrawer,
  Toolbar,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import SortIcon from "@material-ui/icons/Sort";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Filters from "@Modules/Filters";
import { TFilters } from "@Reducers/homeData";
import useStyles from "./FiltersDrawer.styles";

interface IProps {
  filters: TFilters;
  handleFiltersChange: (filters: TFilters) => void;
}

const FiltersDrawer: React.FC<IProps> = ({ filters, handleFiltersChange }) => {
  const styles = useStyles();
  const trigger = useScrollTrigger();
  const [opened, setOpened] = useState(false);
  const handleOpen = () => {
    setOpened(true);
  };
  const handleClose = () => {
    setOpened(false);
  };
  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar color="default" className={styles.filtersAppBar}>
          <Toolbar variant="dense" className={styles.toolBar}>
            <Button
              size="small"
              startIcon={<FilterListIcon />}
              onClick={handleOpen}
            >
              Filters
            </Button>
            <Button size="small" startIcon={<SortIcon />}>
              Sort By
            </Button>
          </Toolbar>
        </AppBar>
      </Slide>
      <SwipeableDrawer
        anchor="left"
        open={opened}
        onOpen={handleOpen}
        onClose={handleClose}
        className={styles.leftDrawer}
      >
        <Filters
          variant="drawer"
          filters={filters}
          handleFiltersChange={handleFiltersChange}
        />
      </SwipeableDrawer>
    </>
  );
};

export default FiltersDrawer;
