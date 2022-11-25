import { IsString, Matches, MinLength } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @MinLength(3)
  public name: string;

  @IsString()
  @Matches(/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/, {
    message: 'CNPJ must be in the format 00.000.000/0001-00',
  })
  public cnpj: string;

  @IsString()
  @MinLength(3)
  public address: string;
}
