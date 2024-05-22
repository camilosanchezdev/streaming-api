import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import { RolesModule } from './features/roles/roles.module';
import { MoviesModule } from './features/movies/movies.module';

@Module({
  imports: [AuthModule, UsersModule, RolesModule, MoviesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
