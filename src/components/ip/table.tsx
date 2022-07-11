import React from 'react';
import { IpAddress } from '../../api/ip';
import { Listing } from './listing';
import { List } from '@mui/material';

interface IProps {
  ips: IpAddress[];
}

const CustomList = ({ ips }: IProps) => {
  return (
    <List>
      {ips.map((ip, index) => (
        <Listing key={index} ip={ip} />
      ))}
    </List>
  );
};

/*
{ips.map((ip) => (
        <Listing key={ip.ip} ip={ip} />
      ))}
 */
export default CustomList;
