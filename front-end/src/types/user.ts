// ----------------------------------------------------------------------
export type Permission = {
  name: string;
  type: string | null;
  displayName: string;
  icon_uri: string;
  uris: string[];
  resource_scopes: Scope[];
  attributes: {
    order: string[];
    visible: string[];
    main: string | null;
  };
  viewOrder: number;
  visible: boolean;
  url: string;
  _id: string;
};

export type Scope = {
  name: string;
};

export type Client = {
  id: string;
  clientId: string;
  name: string;
  description: string;
  secret: string;
  token: string | null;
  permissions: Permission[];
};

export type User = {
  firstName: string | null;
  lastName: string;
  email: string;
  userName: string;
  token: string;
  clients: Client[];
};

export type IUserAccountBillingHistory = {
  id: string;
  price: number;
  createdAt: Date;
  invoiceNumber: string;
};

export type ClientPermissionsMap = {
  [clientId: string]: ClientMap;
};
export type ClientMap = {
  [clientId: string]: string[];
};

export type IUserItem = {
  id: string;
  name: string;
  city: string;
  role: string;
  email: string;
  state: string;
  status: string;
  address: string;
  country: string;
  zipCode: string;
  company: string;
  avatarUrl: string;
  phoneNumber: string;
  isVerified: boolean;
};

export type TUser = {
  id: number;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  fullName: string;
  email: string;
  password: string; // hashed password
  enabled: boolean;
  authorities: any[]; // adjust type if authorities have a specific structure
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
};
