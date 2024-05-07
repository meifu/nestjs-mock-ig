import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prisma.posts.create({ data: createPostDto });
  }

  findAll({ currentUser, query }) {
    console.log(currentUser);
    const { page, take } = query;
    const skip = (page - 1) * take;
    try {
      return this.prisma.posts.findMany({
        take,
        skip,
      });
    } catch (err) {
      console.log(`findall posts error: ${err}`);
    }
  }

  findOne(id: number) {
    try {
      return this.prisma.posts.findFirst({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log('posts findOne error', err);
    }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    try {
      return this.prisma.posts.update({
        where: { id },
        data: updatePostDto,
      });
    } catch (err) {
      console.log('update post error:', err);
    }
  }

  remove(id: number) {
    try {
      return this.prisma.posts.delete({ where: { id } });
    } catch (err) {
      console.log(`delete post ${id} error: ${err}`);
    }
  }
}
