import { Module } from '@nestjs/common';
import { PersonalModule } from './personal/personal.module';

@Module({
  imports: [PersonalModule],
})
export class AppModule {}
