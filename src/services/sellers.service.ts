import { EntityRepository, Repository } from 'typeorm';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';
import { Seller } from '@/interfaces/sellers.interface';
import { SellerEntity } from '@/entities/sellers.entity';
import { CreateSellerDto } from '@/dtos/sellers.dto';

@EntityRepository()
class SellerService extends Repository<SellerEntity> {
  public async findAllSeller(): Promise<Seller[]> {
    const sellers: Seller[] = await SellerEntity.find();
    return sellers;
  }

  public async findSellerById(sellerId: number): Promise<Seller> {
    if (isEmpty(sellerId)) throw new HttpException(400, 'SellerId is empty');

    const findSeller: Seller = await SellerEntity.findOne({ where: { id: sellerId } });
    if (!findSeller) throw new HttpException(409, "Seller doesn't exist");

    return findSeller;
  }

  public async createSeller(sellerData: CreateSellerDto): Promise<Seller> {
    if (isEmpty(sellerData)) throw new HttpException(400, 'sellerData is empty');

    const findSeller: Seller = await SellerEntity.findOne({ where: { cnpj: sellerData.cnpj } });
    if (findSeller) throw new HttpException(409, `This cnpj ${sellerData.cnpj} already exist`);

    const createSellerData: Seller = await SellerEntity.create(sellerData).save();

    return createSellerData;
  }

  public async updateSeller(sellerId: number, sellerData: CreateSellerDto): Promise<Seller> {
    if (isEmpty(sellerId)) throw new HttpException(400, 'SellerId is empty');

    const findSeller: Seller = await SellerEntity.findOne({ where: { id: sellerId } });
    if (!findSeller) throw new HttpException(409, "Seller doesn't exist");

    await SellerEntity.update({ id: sellerId }, sellerData);

    const updateSeller: Seller = await SellerEntity.findOne({ where: { id: sellerId } });

    return updateSeller;
  }

  public async deleteSeller(sellerId: number): Promise<Seller> {
    if (isEmpty(sellerId)) throw new HttpException(400, 'SellerId is empty');

    const findSeller: Seller = await SellerEntity.findOne({ where: { id: sellerId } });
    if (!findSeller) throw new HttpException(409, `Seller doesn't exist`);

    await SellerEntity.delete({ id: sellerId });

    return findSeller;
  }
}

export default SellerService;
