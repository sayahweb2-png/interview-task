import { Module } from '@nestjs/common';
import { MappingModule } from './modules/mapping/mapping.module';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [MappingModule, PostsModule, UsersModule],
})
export class AppModule {}
