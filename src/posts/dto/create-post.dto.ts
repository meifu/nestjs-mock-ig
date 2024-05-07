import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  url: string;

  @ApiProperty()
  caption?: string;

  @ApiProperty()
  lag?: number;

  @ApiProperty()
  lng?: number;

  @ApiProperty()
  user_id: number;
}
