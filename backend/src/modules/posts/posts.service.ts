import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MappingService } from '../mapping/mapping.service';
import { Post, PostWithVideo } from '../../common/interfaces/post.interface';
import { JSONPLACEHOLDER_BASE_URL } from '../../common/constants/api.constants';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly mappingService: MappingService,
  ) {}

  async getPostById(id: number): Promise<PostWithVideo> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<Post>(`${JSONPLACEHOLDER_BASE_URL}/posts/${id}`),
      );

      const mediaclipId = this.mappingService.getMediaclipId(id);

      return {
        ...data,
        mediaclipId,
      };
    } catch (error: any) {
      this.logger.error(`ffailed to fetch post ${id}: ${error.message}`);

      if (error.response?.status === 404) {
        throw new HttpException(`post with id ${id} not found`, HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'failed to fetch post from external api',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
