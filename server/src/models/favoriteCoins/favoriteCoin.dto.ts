import { IsString } from 'class-validator';

class FavoriteCoinsDto {
  @IsString()
  _id: string;

  @IsString()
  title: string;

  @IsString()
  ticket: string;
  
  @IsString()
  imageUrl: string;
}

export default FavoriteCoinsDto;