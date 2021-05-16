import { IsOptional, MinLength, MaxLength, IsString, ValidateNested, IsEmail } from 'class-validator';

class CreateUserDto {
  @IsString()
  @MinLength(3, {
    message: 'The minimum length for "username" is 3 characters',
  })
  @MaxLength(16, {
    message: 'The maximum length for "username" is 16 characters',
  })
  public username: string;

  @IsEmail({}, {
    message: "This email is not correct, try again!"
  })
  public email: string;

  @IsString()
  public password: string;
}

export default CreateUserDto;
