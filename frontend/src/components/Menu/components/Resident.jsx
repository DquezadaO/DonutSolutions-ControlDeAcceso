import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HistoryIcon from '@material-ui/icons/History';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import { useHistory } from 'react-router-dom';

const baseUrl = '/app/residente';

export default function ResidentMenu() {
  const history = useHistory();

  return (
    <div>
      <ListItem button onClick={() => history.push(baseUrl + '/add-visit')}>
        <ListItemIcon>
          <PersonAddOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Agendar visita" />
      </ListItem>

      <ListItem button onClick={() => history.push(baseUrl + '/display-history')}>
        <ListItemIcon>
          <HistoryIcon />
        </ListItemIcon>
        <ListItemText primary="Historial visitas" />
      </ListItem>
    </div>
  );
}
