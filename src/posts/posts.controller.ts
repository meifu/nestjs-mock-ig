import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
  // UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiHeader,
} from '@nestjs/swagger';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { HeaderDto, QueryDto } from './dto/find-all.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
// import { ZodValidationPipe } from 'src/validation.pipe';
import { ValidationPipe } from 'src/validation.pipe';
import { RolesGuard } from 'src/role.guard';

@ApiHeader({
  name: 'X-MyHeader',
  description: 'custom header',
})
@Controller('posts')
@ApiTags('posts')
@UseGuards(RolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiCreatedResponse({ type: PostEntity })
  // @UsePipes(new ZodValidationPipe(createPostSchema))
  create(@Body(new ValidationPipe()) createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOkResponse({ type: PostEntity, isArray: true })
  findAll(@Query() query: QueryDto, @Headers() header: HeaderDto) {
    const currentUser = header.current_user_id;
    return this.postsService.findAll({ currentUser, query });
  }

  @Get(':id')
  @ApiOkResponse({ type: PostEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: PostEntity })
  update(
    @Param('id', ParseIntPipe)
    id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: PostEntity })
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: string,
  ) {
    return this.postsService.remove(+id);
  }
}
