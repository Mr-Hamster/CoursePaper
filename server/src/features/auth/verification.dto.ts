import { IsString } from 'class-validator';

class VerificationDataDto {
  @IsString()
  public code: string;
}

export default VerificationDataDto;