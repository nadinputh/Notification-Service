import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { IUserService, USER_SERVICE } from '@services/user.service';
import { CreateUserRequest } from '../request/create-user.request';
import { PaginateRequest } from '../request/paging.query';

@Controller('/users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Get()
  async index(@Query() query: PaginateRequest): Promise<any> {
    // throw new NotFoundException({ message: { key: 'exceptions.not_found' } });
    return this.userService.getAll(query);
  }

  @Post()
  async create(@Body() request: CreateUserRequest): Promise<any> {
    return {
      user: await this.userService.create({
        firstName: request.firstName,
        lastName: request.lastName,
      }),
    };
  }
}
