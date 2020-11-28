import { Injectable } from '@nestjs/common';
import { User } from '../domain/user.model';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: "uuid1",
        username: 'macarc',
        password: 'password1',
      },
      {
        id: "uuid2",
        username: 'andra',
        password: 'password2',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
