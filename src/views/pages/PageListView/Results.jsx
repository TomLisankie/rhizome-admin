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

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
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
                          {customers.slice(0, limit).map((customer) => (
                              <TableRow
                                  hover
                                  key={customer.id}
                                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
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
                                              {customer.name}
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
              count={customers.length}
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
  customers: PropTypes.array.isRequired
};

export default Results;
