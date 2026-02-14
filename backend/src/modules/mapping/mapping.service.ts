import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MappingService implements OnModuleInit {
  private readonly logger = new Logger(MappingService.name);
  private readonly mappings = new Map<number, string>();

  onModuleInit() {
    const csvPath = path.join(process.cwd(), '..', 'static', 'mapping.csv');
    const content = fs.readFileSync(csvPath, 'utf-8');
    const lines = content.trim().split('\n');

    for (const line of lines) {
      const commaIndex = line.indexOf(',');
      if (commaIndex === -1) continue;

      const postId = parseInt(line.substring(0, commaIndex), 10);
      const mediaclipId = line.substring(commaIndex + 1).replace(/"/g, '').trim();

      if (!isNaN(postId) && mediaclipId) {
        this.mappings.set(postId, mediaclipId);
      }
    }

    this.logger.log(`Loaded ${this.mappings.size} post-to-mediaclip mappings`);
  }

  getMediaclipId(postId: number): string | null {
    return this.mappings.get(postId) ?? null;
  }
}
