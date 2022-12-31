import React from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';

interface AlertProps {
  message: String,
  severity: AlertColor
}

type AlertTypes = AlertProps;

const AlertMessage = (props: AlertTypes) => {
  const { message, severity } = props;
  return <Alert severity={severity}>{message}</Alert>
}
export default AlertMessage;
