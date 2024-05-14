import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface FindAllPostsForUserInterface {
  currentUser: number;
  query: {
    page: number;
    take: number;
  };
}

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prisma.posts.create({ data: createPostDto });
  }

  async findAll({ currentUser, query }: FindAllPostsForUserInterface) {
    const { page, take } = query;
    const skip = (+page - 1) * +take;

    try {
      const leads = await this.prisma.followers.findMany({
        where: {
          follower_id: +currentUser,
        },
        select: {
          leader_id: true,
        },
      });
      const leadIds = leads.map((l) => l.leader_id);

      return this.prisma.posts.findMany({
        where: {
          user_id: { in: leadIds },
        },
        take: +take,
        skip,
        include: {
          comments: true,
          likes: true,
        },
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
