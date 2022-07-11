import React, { ReactNode, useState } from 'react';
import { IpAddress, updateListing } from '../../../../api/ip';
import { CustomCard as Card } from './form.styled';
import { renderPorts } from '../listing.utils';
import { Button, TextField } from '@mui/material';
import useIpForm from './useIpForm';

interface IProps {
  ip: IpAddress;
  className?: string;
}

const HyperLinkedIpAddress = ({ ip, children }: { ip: IpAddress; children: ReactNode }) => {
  if (ip.ports.includes(443)) {
    return <a href={`https://${ip.ip}`}>{children}</a>;
  }
  if (ip.ports.includes(80)) {
    return <a href={`http://${ip.ip}`}>{children}</a>;
  }

  return <div>{children}</div>;
};

const IpForm = ({ ip, className }: IProps) => {
  const { state, actions } = useIpForm({ ip, editIpAddress: updateListing });

  return (
    <Card className={className}>
      <HyperLinkedIpAddress ip={ip}>{ip.ip}</HyperLinkedIpAddress>
      <div>Ports available: {renderPorts(ip.ports)}</div>
      <div>
        <div>Description:</div>
        {state.editing ? (
          <TextField
            style={{ width: '100%' }}
            multiline
            value={state.tempDesc}
            onChange={({ target }) => {
              actions.setDesc(target.value);
            }}
          />
        ) : (
          <div>{ip.description}</div>
        )}
      </div>
      <div>
        <div>Additional data: </div>
        {state.editing ? (
          <TextField
            style={{ width: '100%' }}
            multiline
            error={state.invalidJsonErr}
            label={state.invalidJsonErr ? 'Invalid JSON format' : ''}
            value={state.tempAdd}
            onChange={({ target }) => {
              actions.setTempAdd(target.value);
            }}
          />
        ) : (
          <div style={{ whiteSpace: 'pre-line' }}>
            {ip.additional && JSON.stringify(ip.additional, null, 2)}
          </div>
        )}
      </div>
      <div>Registered at: {new Date(ip.registered).toISOString()}</div>
      {state.editing ? (
        <div>
          <Button onClick={actions.cancelEdition}>Cancel</Button>
          <Button onClick={actions.saveEdition}>Save</Button>
        </div>
      ) : (
        <Button onClick={actions.startEdition}>Edit</Button>
      )}
    </Card>
  );
};

export default IpForm;
