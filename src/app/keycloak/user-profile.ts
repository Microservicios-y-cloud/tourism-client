export interface UserAttributes {
  picture?: string;
  dob?: string;
  webUrl?: string;
  description?: string;
  userType?: 'customer' | 'supplier';
  socialMedia: string[];
}

export interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  token?: string;
  attributes?: UserAttributes;
}
