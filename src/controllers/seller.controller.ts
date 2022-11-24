import { NextFunction, Request, Response } from 'express';
import { Seller } from '@/interfaces/sellers.interface';
import SellerService from '@/services/sellers.service';
import { CreateSellerDto } from '@/dtos/sellers.dto';

class SellersController {
  public sellerService = new SellerService();

  public getSellers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllSellersData: Seller[] = await this.sellerService.findAllSeller();

      res.status(200).json({ data: findAllSellersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getSellerById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sellerId = Number(req.params.id);
      const findOneSellerData: Seller = await this.sellerService.findSellerById(sellerId);

      res.status(200).json({ data: findOneSellerData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createSeller = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sellerData: CreateSellerDto = req.body;
      const createSellerData: Seller = await this.sellerService.createSeller(sellerData);

      res.status(201).json({ data: createSellerData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateSeller = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const selerId = Number(req.params.id);
      const sellerData: CreateSellerDto = req.body;
      const updateSellerData: Seller = await this.sellerService.updateSeller(selerId, sellerData);

      res.status(200).json({ data: updateSellerData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteSeller = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sellerId = Number(req.params.id);
      const deleteSellerData: Seller = await this.sellerService.deleteSeller(sellerId);

      res.status(200).json({ data: deleteSellerData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default SellersController;
