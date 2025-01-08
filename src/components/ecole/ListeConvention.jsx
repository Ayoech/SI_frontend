import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import generatePDF from '../../Services/GenererConvention';
import { Button } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import CreerConvention from '../../Services/CreerConvention'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(entreprise, etudiant, sujet) {
  return { entreprise, etudiant, sujet };
}

export default function ListeConvention({PostulationDetails}) {
  const handleGenerateConvention = async(row) => {
    const { num_postulation, titre, nom_etudiant, nom_entreprise, prenom_etudiant, date_debut, date_fin } = row;
    const pdfFile = await generatePDF(titre, nom_etudiant, nom_entreprise, prenom_etudiant, date_debut, date_fin);
    const response = await CreerConvention(pdfFile);
  };

  const handleAccept = (row) => {
    console.log('Accepted:', row);
  };

  const handleReject = (row) => {
    // Logic for rejecting the convention (e.g., update the status)
    console.log('Rejected:', row);
  };

  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const paginatedRows = React.useMemo(() => {
    return PostulationDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [PostulationDetails, page, rowsPerPage]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Entreprise</StyledTableCell>
            <StyledTableCell align="right">Etudiant</StyledTableCell>
            <StyledTableCell align="right">Sujet</StyledTableCell>
            <StyledTableCell align="right">Date de début</StyledTableCell>
            <StyledTableCell align="right">Date de fin</StyledTableCell>
            <StyledTableCell align="right">Convention</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row) => (
            <StyledTableRow key={row.NUM_POSTULATION}>
              <StyledTableCell component="th" scope="row">
                {row.NOM_ENTREPRISE}
              </StyledTableCell>
              <StyledTableCell align="right">{row.NOM_ETUDIANT} {row.PRENOM_ETUDIANT}</StyledTableCell>
              <StyledTableCell align="right">{row.TITRE}</StyledTableCell>
              <StyledTableCell align="right">{row.DATE_DEBUT.split('T')[0]}</StyledTableCell>
              <StyledTableCell align="right">{row.DATE_FIN.split('T')[0]}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleGenerateConvention(row)}
                  disabled={row.STATUT_ACCEPTATION !== 'Accepté'}
                >
                  Générer
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
                <div className='mr-2'>
                <Button
                  variant="contained"
                  color="success"
                  className='mr-2'
                  onClick={() => handleAccept(row)}
                >
                  Accepter
                </Button>
                </div>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleReject(row)}
                >
                  Refuser
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={PostulationDetails.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
