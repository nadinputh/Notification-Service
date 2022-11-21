import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { IUserService } from '@services/user.service';
import {
  IUserRepository,
  USERS_REPOSITORY,
} from '@adapters/repository/user.repository';
import { USER_CREATED } from '@application/event/user-created.event';
import { NotifierService } from '@notifier';
import { MailerService } from '@mailer';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private userRepository: IUserRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly notifier: NotifierService,
    private readonly mailerService: MailerService,
  ) {}

  async getAll({ size, page }: any): Promise<any> {
    await this.mailerService.send();
    // const d =
    //   'fL35UG8cvks5ZYK_O2JCTE:APA91bHQ5ZQ9KEPr8T2YHqF1rTrgcrzrWDOJVvoK8KFSE70427mCq6SvWFoxyknKsuw_NDOLEyS-MVhyuIA0r9y1V-TBDZ6ytQM4HwlUtH2zc0YfqqRUOULvMy4xKPWPxv-cMuYaGtpn';
    // this.notifier.toDevices(
    //   {
    //     notification: {
    //       title: 'Hello World!',
    //       body: 'Testing Testing...',
    //     },
    //     payload: {
    //       name: 'Nadin POUTH',
    //     },
    //     badge: 10,
    //   },
    //   [d],
    // );
    return this.userRepository.getAll({ size, page });
  }

  async create(dto: any): Promise<any> {
    const user = await this.userRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
    });
    this.eventEmitter.emit(USER_CREATED, user);
    return user;
  }
}
