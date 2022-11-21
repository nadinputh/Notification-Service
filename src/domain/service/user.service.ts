export const USER_SERVICE = 'USER_SERVICE';

export interface IUserService {
  getAll(dto: any): Promise<any>;
  create(dto: any): Promise<any>;
}
