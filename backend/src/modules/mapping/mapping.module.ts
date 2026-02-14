import { Global, Module } from '@nestjs/common';
import { MappingService } from './mapping.service';

@Global()
@Module({
  providers: [MappingService],
  exports: [MappingService],
})
export class MappingModule {}
