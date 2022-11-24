import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import SellersController from '@/controllers/seller.controller';
import { CreateSellerDto } from '@/dtos/sellers.dto';

class SellersRoute implements Routes {
  public path = '/sellers';
  public router = Router();
  public sellersController = new SellersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.sellersController.getSellers);
    this.router.get(`${this.path}/:id(\\d+)`, this.sellersController.getSellerById);
    this.router.post(`${this.path}`, validationMiddleware(CreateSellerDto, 'body'), this.sellersController.createSeller);
    this.router.put(`${this.path}/:id(\\d+)`, validationMiddleware(CreateSellerDto, 'body', true), this.sellersController.updateSeller);
    this.router.delete(`${this.path}/:id(\\d+)`, this.sellersController.deleteSeller);
  }
}

export default SellersRoute;
