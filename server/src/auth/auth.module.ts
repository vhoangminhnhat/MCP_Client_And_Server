import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './application/login.usecase';
import { AuthController } from './auth.controller';
import { USER_REPOSITORY } from './domain/token/user.repository.token';
import { UserRepository } from './infrastructure/user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: 'super-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [LoginUseCase],
})
export class AuthModule {}
