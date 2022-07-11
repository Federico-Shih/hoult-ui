import styled from 'styled-components';
import { ListItem } from '@mui/material';

export const ListingContainer = styled(ListItem)`
  && {
    position: relative;
  }

  .short-description {
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
  }

  .form {
    position: absolute;
    left: 100%;
    top: 0;
  }
`;
