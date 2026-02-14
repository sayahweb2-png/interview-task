import { Module } from '@nestjs/common';
import { MappingModule } from './modules/mapping/mapping.module';

@Module({
  imports: [MappingModule],
})
export class AppModule {}
