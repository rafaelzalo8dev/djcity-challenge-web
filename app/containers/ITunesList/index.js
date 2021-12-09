/**
 *
 * ITunesList
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  TableRow,
} from '@material-ui/core';

import messages from './messages';
import { FormContainer, InputContainer, Title, ContainerFAB } from './styles';

import { getList } from '../../services/itunes';

export function ITunesList(props) {
  const { history } = props;
  const [listItems, setListItems] = useState([]);
  const [filter, setFilter] = useState('');

  const interval = setInterval(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.removeItem('user');
      history.push('/');
      stopInterval();
    }
  }, 3000);

  const stopInterval = () => {
    clearInterval(interval);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/');
  };

  useEffect(() => {
    async function getData() {
      try {
        const token = localStorage.getItem('token');
        const response = await getList(filter, token);
        setListItems([]);
        const { result } = response;
        const { results } = result;
        setListItems(results);
      } catch (err) {
        alert('Error while trying to consult list ');
      }
    }
    getData();
  }, [filter]);

  return (
    <div>
      <Helmet>
        <title>ITunesList</title>
        <meta name="description" content="Description of ITunesList" />
      </Helmet>
      <Title>Search your favorite songs at the iTunes API</Title>
      <FormContainer>
        <span>Type some words to seach at the iTunes API</span>
        <InputContainer>
          <Input
            value={filter}
            placeholder={messages.inputs.filter}
            onChange={e => {
              setFilter(e.target.value);
            }}
            type="text"
          />
        </InputContainer>
      </FormContainer>

      {listItems.length > 0 && (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ minWidth: 170 }}>Title</TableCell>
                  <TableCell style={{ minWidth: 170 }}>Artist</TableCell>
                  <TableCell style={{ minWidth: 170 }}>Collection</TableCell>
                  <TableCell style={{ minWidth: 170 }}>
                    Collection Price
                  </TableCell>
                  <TableCell style={{ minWidth: 170 }}>Release Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listItems.map(row => (
                  <TableRow
                    key={row.trackCensoredName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.trackCensoredName}
                    </TableCell>
                    <TableCell>{row.artistName}</TableCell>
                    <TableCell>{row.collectionName}</TableCell>
                    <TableCell>
                      {numeral(row.collectionPrice).format('$0,0.00')}
                    </TableCell>
                    <TableCell>
                      {moment(row.releaseDate).format('DD/MM/YYYY')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
      <ContainerFAB onClick={() => handleLogout()}>Logout</ContainerFAB>
    </div>
  );
}

ITunesList.propTypes = {
  history: PropTypes.object,
};

const withConnect = connect(null);

export default compose(
  withConnect,
  memo,
)(ITunesList);
