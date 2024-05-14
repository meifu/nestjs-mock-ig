import { ApiProperty } from '@nestjs/swagger';

export class PostEntity {
  @ApiProperty()
  id: number = 0;

  @ApiProperty()
  url: string = '';

  @ApiProperty()
  caption: string = '';

  @ApiProperty()
  lat: number = 0;

  @ApiProperty()
  lng: number = 0;

  @ApiProperty()
  user_id: number = 0;
}
