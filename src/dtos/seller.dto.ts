import { IsString, Matches } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  public name: string;

  @IsString()
  @Matches(/^\d{3}/)
  public cnpj: string;

  @IsString()
  public adress: string;
}
