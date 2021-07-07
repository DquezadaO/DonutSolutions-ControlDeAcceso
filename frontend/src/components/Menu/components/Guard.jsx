import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import HistoryIcon from '@material-ui/icons/History';
import PeopleIcon from '@material-ui/icons/People';
import { useHistory } from 'react-router-dom';

const baseUrl = '/app/guardia';

export default function GuardMenu() {
  const history = useHistory();

  return (
    <div>
      <ListItem button onClick={() => history.push(baseUrl)}>
        <ListItemIcon>
          <FlashOnIcon />
        </ListItemIcon>
        <ListItemText primary="Ingreso automático" />
      </ListItem>
      <ListItem button onClick={() => history.push(baseUrl + '/visit-entries')}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Ingreso manual" />
      </ListItem>

      <ListItem button onClick={() => history.push(baseUrl + '/display-history')}>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Historial ingresos" />
      </ListItem>

      <ListItem button onClick={() => history.push(baseUrl + '/display-residents')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Residentes" />
      </ListItem>
    </div>
  );
}
