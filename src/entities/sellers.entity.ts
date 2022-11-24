import { Seller } from '@/interfaces/sellers.interface';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class SellerEntity extends BaseEntity implements Seller {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsNotEmpty()
  @Unique(['cnpj'])
  cnpj: string;

  @Column()
  @IsNotEmpty()
  address: string;
}
