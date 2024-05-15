import { PartialType } from '@nestjs/swagger';
// import { z } from 'zod';

import { CreatePostDto } from './create-post.dto';

// export const updatePostSchema = z
//   .object({
//     id: z.number(),
//     url: z.string().optional(),
//     caption: z.string().optional(),
//     lat: z.number().optional(),
//     lng: z.number().optional(),
//     user_id: z.number().optional(),
//   })
//   .required();

// export type UpdatePostDto = z.infer<typeof updatePostSchema>;

export class UpdatePostDto extends PartialType(CreatePostDto) {}
