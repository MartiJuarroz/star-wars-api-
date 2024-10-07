import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user'})
  @ApiResponse({ status: 201, description: 'New user registered'})
  @ApiResponse({ status: 400, description: 'Email already registered' })
  @ApiResponse({ status: 500, description: 'Error registering a new user' })
  createUser(@Body() createUserDto: CreateUserDto ) {
    return this.authService.create( createUserDto );
  }

  @Post('login')
  @ApiOperation({ summary: 'Log in'})
  @ApiResponse({ status: 201, description: 'Log in succesfull'})
  @ApiResponse({ status: 401, description: 'Credencials not valid' })
  @ApiResponse({ status: 500, description: 'Error trying to log in' })
  loginUser(@Body() loginUserDto: LoginUserDto ) {
    return this.authService.login( loginUserDto );
  }

}
