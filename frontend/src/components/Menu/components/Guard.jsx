import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HistoryIcon from '@material-ui/icons/History';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { useHistory } from 'react-router-dom';

const baseUrl = '/app/guardia';

export default function GuardMenu() {
  const history = useHistory();

  return (
    <div>
      <ListItem button onClick={() => history.push(baseUrl)}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItem>
      <ListItem button onClick={() => history.push(baseUrl + '/add-visit')}>
        <ListItemIcon>
          <PersonAddOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Registrar Visita" />
      </ListItem>

      <ListItem button onClick={() => history.push(baseUrl + '/display-history')}>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Historial visitas" />
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
