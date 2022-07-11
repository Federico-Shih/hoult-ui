import { IpAddress } from './ip.model';

export interface IGetAllProps {
  limit: number;
  skip: number;
}

export type UpdateType = {
  description?: string;
  additional?: Record<string, unknown>;
};

export interface IUpdateListingProps {
  update: UpdateType;
  ip: string;
}

export type UpdateListingMutation = (_: IUpdateListingProps) => Promise<IpAddress>;
