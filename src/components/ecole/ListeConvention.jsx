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

const rows = [
  createData('Henceforth', 'YOUSSEF BOURAOUI', 'Développement'),
  createData('Henceforth', 'YOUSSEF BOURAOUI', 'Développement'),
  createData('Henceforth', 'YOUSSEF BOURAOUI', 'Développement'),
  createData('Henceforth', 'YOUSSEF BOURAOUI', 'Développement'),
  createData('Henceforth', 'YOUSSEF BOURAOUI', 'Développement'),
  createData('Henceforth', 'YOUSSef', 'Développement'),
];

export default function ListeConvention({PostulationDetails}) {
  const handleGenerateConvention = async(row) => {
    const { num_postulation,titre,nom_etudiant,nom_entreprise, prenom_etudiant,date_debut,date_fin } = row
    const pdfFile = await generatePDF(titre,nom_etudiant,nom_entreprise, prenom_etudiant,date_debut,date_fin);
    const response = await CreerConvention(pdfFile);
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

  // Slice the rows based on pagination
  const paginatedRows = PostulationDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedRows.map((row) => (
            <StyledTableRow key={row.num_entreprise}>
              <StyledTableCell component="th" scope="row">
                {row.nom_entreprise}
              </StyledTableCell>
              <StyledTableCell align="right">{row.nom_etudiant} {row.prenom_etudiant}</StyledTableCell>
              <StyledTableCell align="right">{row.titre}</StyledTableCell>
              <StyledTableCell align="right">{row.date_debut}</StyledTableCell>
              <StyledTableCell align="right">{row.date_fin}</StyledTableCell>
              <StyledTableCell align="right">
                <Button variant="contained" color="primary" onClick={handleGenerateConvention}>
                  Générer
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
