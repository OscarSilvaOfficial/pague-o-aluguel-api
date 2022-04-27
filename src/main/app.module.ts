import { Module } from '@nestjs/common';
import { AppRouter } from '@/infra/http/routes/app.router';

@Module({
  imports: [],
  controllers: [AppRouter],
  providers: [],
})
export class AppModule {}
