import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
    Checkbox,
    Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
    Typography,
    FormControl,
    NativeSelect,
    InputLabel,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, pages, ...rest }) => {
  const classes = useStyles();
  const [selectedPageIds, setSelectedPageIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedPageIds;

    if (event.target.checked) {
      newSelectedPageIds = pages.map((page) => page["id"]);
    } else {
      newSelectedPageIds = [];
    }

    setSelectedPageIds(newSelectedPageIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedPageIds.indexOf(id);
    let newSelectedPageIds = [];

    if (selectedIndex === -1) {
      newSelectedPageIds = newSelectedPageIds.concat(selectedPageIds, id);
    } else if (selectedIndex === 0) {
      newSelectedPageIds = newSelectedPageIds.concat(selectedPageIds.slice(1));
    } else if (selectedIndex === selectedPageIds.length - 1) {
      newSelectedPageIds = newSelectedPageIds.concat(selectedPageIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedPageIds = newSelectedPageIds.concat(
        selectedPageIds.slice(0, selectedIndex),
        selectedPageIds.slice(selectedIndex + 1)
      );
    }

    setSelectedPageIds(newSelectedPageIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
      <Card
          className={clsx(classes.root, className)}
          {...rest}
      >
          <PerfectScrollbar>
              <Box minWidth={1050}>
                  <Table>
                      <TableHead>
                          <TableRow>
                              <TableCell>
                                  Page Title
                              </TableCell>
                              <TableCell>
                                  Visibility
                              </TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {pages.slice(0, limit).map((page) => (
                              <TableRow
                                  hover
                                  key={page["id"]}
                                  selected={selectedPageIds.indexOf(page.id) !== -1}
                              >
                                  <TableCell>
                                      <Box
                                          alignItems="center"
                                          display="flex"
                                      >
                                          <Typography
                                              color="textPrimary"
                                              variant="body1"
                                          >
                                              {page["content"]}
                                          </Typography>
                                      </Box>
                                  </TableCell>
                                  <TableCell>
                                      <FormControl className={classes.formControl}>
                                          <NativeSelect
                                              defaultValue={1}
                                              inputProps={{
                                                  name: 'visibility',
                                                  id: 'uncontrolled-native',
                                              }}
                                          >
                                              <option value={0}>Private</option>
                                              <option value={1}>Public</option>
                                          </NativeSelect>
                                      </FormControl>
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </Box>
          </PerfectScrollbar>
          <TablePagination
              component="div"
              count={pages.length}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleLimitChange}
              page={page}
              rowsPerPage={limit}
              rowsPerPageOptions={[5, 10, 25]}
          />
      </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.array.isRequired
};

export default Results;
