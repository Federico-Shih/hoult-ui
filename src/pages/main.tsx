import React, { useCallback, useEffect, useState } from 'react';

import { getAll, getTotal, IpAddress } from '../api/ip';
import List from '../components/ip/table';
import { Pagination } from '@mui/material';

const PAGE_SIZE = 100;

const MainPage = () => {
  const [addresses, setAddresses] = useState<IpAddress[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);

  const getTotalQuery = useCallback(async () => {
    const total = await getTotal();
    setTotal(total);
  }, []);

  const getAllQuery = useCallback(async () => {
    const res = await getAll({ limit: PAGE_SIZE, skip: page * PAGE_SIZE });
    setAddresses(res);
  }, [page]);

  useEffect(() => {
    getTotalQuery();
  }, []);

  useEffect(() => {
    getAllQuery();
  }, [getAllQuery]);
  return (
    <div style={{ width: 400 }}>
      <List ips={addresses} />
      <Pagination
        count={Math.ceil(total / PAGE_SIZE)}
        variant="outlined"
        shape="rounded"
        onChange={(event, page) => {
          setPage(page);
        }}
      />
    </div>
  );
};

export default MainPage;
