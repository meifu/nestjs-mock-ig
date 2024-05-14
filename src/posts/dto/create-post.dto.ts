import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNumber } from 'class-validator';
// import { z } from 'zod';

// export const createPostSchema = z.object({
//   url: z.string(),
//   caption: z.string().optional(),
//   lat: z.number().optional(),
//   lng: z.number().optional(),
//   user_id: z.number(),
// });

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  url: string = '';

  @ApiProperty()
  @IsString()
  caption?: string;

  @ApiProperty()
  @IsNumber()
  lat?: number;

  @ApiProperty()
  @IsNumber()
  lng?: number;

  @ApiProperty()
  @IsInt()
  user_id: number = 0;
}

// export type CreatePostDto = z.infer<typeof createPostSchema>;
