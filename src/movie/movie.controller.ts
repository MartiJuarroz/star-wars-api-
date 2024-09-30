import { Controller, Get, Post, Body, Param, Delete, Query, Put } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Auth } from 'src/auth/decorators';
import { ValidRoles } from 'src/auth/interfaces';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiBearerAuth()
  @Auth( ValidRoles.Admin )
  @ApiOperation({ summary: 'Creates a new movie',  description: 'Requires role: Admin' })
  @ApiResponse({ status: 201, description: 'New movie created'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'User needs valid Role' })
  @ApiResponse({ status: 500, description: 'Error creating a new movie' })
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all movies' })
  @ApiResponse({ status: 200, description: 'List of movies'})
  @ApiResponse({ status: 500, description: 'Error fetching the list of movies' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.movieService.findAll(paginationDto);
  }

  @Get('swapi')
  @Auth( ValidRoles.Admin )
  @ApiOperation({ summary: 'Find all movies in swapi',  description: 'Requires role: Admin' })
  @ApiResponse({ status: 200, description: 'List of movies from the swapi API'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'User needs valid Role' })
  @ApiResponse({ status: 500, description: 'Error fetching the list of movies' })
  findAllSwapi() {
    return this.movieService.findAllSwapi();
  }

  @Get(':id')
  @Auth( ValidRoles.User )
  @ApiOperation({ summary: 'Find a movie by id',  description: 'Requires role: User' })
  @ApiResponse({ status: 200, description: 'Movie entity searched'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'User needs valid Role' })
  @ApiResponse({ status: 500, description: 'Error fetching the list of movies' })
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Put(':id')
  @Auth( ValidRoles.Admin )
  @ApiOperation({ summary: 'Update a movie',  description: 'Requires role: Admin' })
  @ApiResponse({ status: 200, description: 'Movie entity updated'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'User needs valid Role' })
  @ApiResponse({ status: 500, description: 'Error updating a new movie' })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @Auth( ValidRoles.Admin )
  @ApiOperation({ summary: 'Remove a movie',  description: 'Requires role: Admin' })
  @ApiResponse({ status: 200, description: 'Movie entity removed (Logical remove)'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'User needs valid Role' })
  @ApiResponse({ status: 500, description: 'Error removing a new movie' })
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }

  
}
