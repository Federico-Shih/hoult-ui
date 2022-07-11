import React, { useState } from 'react';
import { IpAddress } from '../../../api/ip';
import { ListingContainer } from './listing.styled';
import { renderPorts } from './listing.utils';
import { Divider } from '@mui/material';
import { IpForm } from './edit-form';

interface IProps {
  ip: IpAddress;
}

const Listing = ({ ip }: IProps) => {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <ListingContainer style={{ boxShadow: selected ? 'inset 0px 0px 5px #c1c1c1' : 'none' }}>
        <div style={{ width: '100%', height: '100%' }} onClick={() => setSelected((prev) => !prev)}>
          <div>address: {ip.ip}</div>
          <div>ports: {renderPorts(ip.ports)}</div>
          <div className={'short-description'}>{ip.description}</div>
        </div>
        {selected && <IpForm ip={ip} className={'form'} />}
      </ListingContainer>
      <Divider />
    </>
  );
};

export default Listing;
