export const USERS_REPOSITORY = 'USERS_REPOSITORY';

export interface IUserRepository {
  getAll(query: any): Promise<any>;
  create(dto: any): Promise<any>;
}
