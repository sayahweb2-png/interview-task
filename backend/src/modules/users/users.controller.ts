import { Controller, Get, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserWatchUpdate } from '../../common/interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  async updateUserWatchData(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UserWatchUpdate,
  ): Promise<any> {
    return this.usersService.updateUserWatchData(id, data);
  }
}
