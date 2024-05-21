import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/core/auth/auth.module';
import { UsersModule } from 'src/features/users/users.module';
import { RolesModule } from 'src/features/roles/roles.module';

@Module({
  imports: [AuthModule, UsersModule, RolesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
