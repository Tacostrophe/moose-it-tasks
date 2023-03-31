import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUsers() {
    return [{ name: 'John' }, { name: 'Ted' }];
  }
}
