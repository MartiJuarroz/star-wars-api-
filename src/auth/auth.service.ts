import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Role } from './entities/role.entity';


@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    private readonly jwtService: JwtService,
  ) {}


  async create( createUserDto: CreateUserDto) {

    const emailFound = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (emailFound) throw new BadRequestException('Email already registered, try another')
    
    try {

      const { password, roles, ...userData } = createUserDto;

      const rolesUser = await this.roleRepository.find({
        where: roles.map(name => ({ name })),
      });
      
      const user = this.userRepository.create({
        ...userData,
        password: await bcrypt.hash(password, 10),
        roles: rolesUser
      });

      await this.userRepository.save( user )
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };

    } catch (error) {
      throw new InternalServerErrorException(`Error creating a new user ${error}`)
    }

  }

  async login( loginUserDto: LoginUserDto ) {

    const { password, email } = loginUserDto;

    const user = await this.userRepository.createQueryBuilder('User')
      .select(['User.id', 'User.email', 'User.password', 'Role.name'])
      .innerJoin('User.roles','Role')
      .where('User.email = :email', { email })
      .getOne()

    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');

    delete user.password;

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  // async checkAuthStatus( user: User ){

  //   return {
  //     ...user,
  //     token: this.getJwtToken({ id: user.id })
  //   };

  // }
  
  private getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign( payload );
    return token;

  }

}
