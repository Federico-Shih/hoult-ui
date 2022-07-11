type IpAddress = {
  ip: string;
  ports: number[];
  description?: string;
  images: string[];
  additional?: Record<string, unknown>;
  registered: Date;
};

export type { IpAddress };
