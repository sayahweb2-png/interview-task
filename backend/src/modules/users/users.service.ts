import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { User, UserWatchUpdate } from '../../common/interfaces/user.interface';
import { JSONPLACEHOLDER_BASE_URL } from '../../common/constants/api.constants';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly httpService: HttpService) {}

  // fetches user details from JSONPlaceholder.
  async getUserById(id: number): Promise<User> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<User>(`${JSONPLACEHOLDER_BASE_URL}/users/${id}`),
      );

      return data;
    } catch (error: any) {
      this.logger.error(`Failed to fetch user ${id}: ${error.message}`);

      if (error.response?.status === 404) {
        throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Failed to fetch user from external API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // sends watch tracking data to JSONPlaceholder via PATCH.
  // clled when a user watches >= 40% of a video 
  // or finishes a video
  async updateUserWatchData(id: number, data: UserWatchUpdate): Promise<any> {
    try {
      const { data: responseData } = await firstValueFrom(
        this.httpService.patch(`${JSONPLACEHOLDER_BASE_URL}/users/${id}`, data),
      );

      return responseData;
    } catch (error: any) {
      this.logger.error(`Failed to update watch data for user ${id}: ${error.message}`);

      if (error.response?.status === 404) {
        throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Failed to update user watch data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
