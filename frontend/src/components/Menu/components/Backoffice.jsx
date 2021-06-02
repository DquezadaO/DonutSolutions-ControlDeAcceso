import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DriveEtaOutlinedIcon from '@material-ui/icons/DriveEtaOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import PeopleIcon from '@material-ui/icons/People';
import SecurityIcon from '@material-ui/icons/Security';
import { useHistory } from 'react-router-dom';

const baseUrl = '/app/backoffice';

export default function BackofficeMenu() {
  const history = useHistory();

  return (
    <div>
      <ListItem button onClick={() => history.push(baseUrl + '/display-residents')}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Residentes" />
      </ListItem>
      <ListItem button onClick={() => history.push(baseUrl + '/display-guards')}>
        <ListItemIcon>
          <SecurityIcon />
        </ListItemIcon>
        <ListItemText primary="Guardias" />
      </ListItem>
      <ListItem button onClick={() => history.push(baseUrl + '/display-providers')}>
        <ListItemIcon>
          <LocalShippingOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Proveedores" />
      </ListItem>
      <ListItem button onClick={() => history.push(baseUrl + '/display-cars')}>
        <ListItemIcon>
          <DriveEtaOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Vehículos" />
      </ListItem>
    </div>
  );
}
