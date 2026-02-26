import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { LoginUseCase } from './application/login.usecase';
import { SignUpUseCase } from './application/signUp.usecase';
import { AuthController } from './auth.controller';
import { UserToken } from './domain/token/user.repository.token';
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
    SignUpUseCase,
    {
      provide: UserToken.USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [LoginUseCase, SignUpUseCase],
})
export class AuthModule {}
