import { Module } from '@nestjs/common';
import { MappingModule } from './modules/mapping/mapping.module';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [MappingModule, PostsModule],
})
export class AppModule {}
