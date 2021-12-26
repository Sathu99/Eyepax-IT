import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { Button, TableFooter, Tooltip } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ViewListIcon from "@material-ui/icons/ViewList";
import Paper from "@material-ui/core/Paper";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  body: {
    margin: 100,
    border: "1px solid black",
  },
  topnav: {
    overflow: "hidden",
    backgroundColor: "Grey",
    paddingLeft: 20,
  },
  box: {
    position: "relative",
    padding: 100,
    margin: 100,
  },
  topright: {
    position: "absolute",
    top: 16,
    right: 100,
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function TablePaginationActions(props) {
  const classes1 = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes1.root}>
      <Tooltip title="First Page">
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
      </Tooltip>
      <Tooltip title="Previous Page">
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Next Page">
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip title="Last Page">
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  console.log("Table Component props : ", props);

  return (
    <div className={classes.body}>
      <div className={classes.topnav}>
        <h2>Sales Representatives</h2>
      </div>
      <div className={classes.box}>
        <div className={classes.topright}>
          <Button
            size="small"
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => props.showAddModal()}
          >
            Add New
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            aria-label="sticky table"
            className={classes.table}
          >
            <TableHead>
              <TableRow>
                {props.columns.map((column) => (
                  <StyledTableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </StyledTableCell>
                ))}
                <StyledTableCell
                  style={{ minWidth: 300 }}
                  align="center"
                  colSpan={3}
                >
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      {props.columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <StyledTableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </StyledTableCell>
                        );
                      })}
                      <StyledTableCell align="center">
                        <Button
                          id={row.id}
                          name="a"
                          variant="contained"
                          color="default"
                          startIcon={<ViewListIcon />}
                          size="small"
                          onClick={() => props.showDetailModal(row.id)}
                        >
                          View
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          component={Link}
                          to={`/team/edit/${row.id}`}
                          id={row.id}
                          name="b"
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          id={row.id}
                          name="c"
                          variant="contained"
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          size="small"
                          onClick={() => props.deleteMember(row.id)}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={props.rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { "aria-label": "rows per page" },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default React.memo(StickyHeadTable);
