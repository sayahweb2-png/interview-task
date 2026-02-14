import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostWithVideo } from '../../common/interfaces/post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get(':id')
  async getPost(@Param('id', ParseIntPipe) id: number): Promise<PostWithVideo> {
    return this.postsService.getPostById(id);
  }

}
