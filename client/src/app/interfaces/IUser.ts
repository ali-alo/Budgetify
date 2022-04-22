export interface IUser {
  name: string;
  surname: string;
  email: string;
  country: string;
  password: string;
  dob: Date;
  accountsIds: string[];
  categoriesIds: object;
  isAdmin: boolean;
}
