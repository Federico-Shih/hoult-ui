import { IGetAllProps, IUpdateListingProps } from './services.types';
import { IpAddress } from './ip.model';
import axios from 'axios';

const mock: IpAddress = {
  ip: '2.2.2.2',
  ports: [1, 2],
  description: 'biiitch',
  images: [],
  additional: {
    '123': '123',
    title: 'Google 44',
    lastSeen: 'yesterdadddddy',
  },

  registered: new Date('2022-07-10T12:01:19.417Z'),
};

export const getAll = async ({ limit, skip }: IGetAllProps): Promise<IpAddress[]> => {
  const { data } = await axios.get<IpAddress[]>(
    `${process.env.REACT_APP_API_URL}?limit=${limit}&skip=${skip}`
  );
  console.log(data);

  return data;
};

export const getTotal = async (): Promise<number> => {
  const { data } = await axios.get<{ total: number }>(`${process.env.REACT_APP_API_URL}/stats`);
  return data.total;
};

export const updateListing = async ({ ip, update }: IUpdateListingProps) => {
  // console.log(update);
  const { data } = await axios.patch<IpAddress>(`${process.env.REACT_APP_API_URL}/${ip}`, update);
  console.log(data);
  return data;
};
