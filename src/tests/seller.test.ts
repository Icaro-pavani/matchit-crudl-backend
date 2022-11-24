import request from 'supertest';
import { createConnection, getConnection } from 'typeorm';
import { mockConnection } from '../databases';
import { CreateSellerDto } from '../dtos/sellers.dto';
import App from '../app';
import { SellerEntity } from '../entities/sellers.entity';
import SellerRoute from '../routes/sellers.route';

beforeAll(async () => {
  await createConnection(mockConnection);
});

afterAll(async () => {
  await getConnection().close();
});

describe('Testing Sellers', () => {
  describe('[POST] /sellers', () => {
    it('should respond status 201 when body is valid', async () => {
      const sellerData: CreateSellerDto = {
        name: 'Company test',
        cnpj: '44.637.384/0001-64',
        address: 'R. Lorem Solum, 500 - Lorem/SP',
      };

      const sellersRoute = new SellerRoute();

      const app = new App([sellersRoute]);
      const response = await request(app.getServer()).post(`${sellersRoute.path}`).send(sellerData);

      expect(response.statusCode).toBe(201);

      const registeredSeller = await SellerEntity.findOne({ where: { id: response.body.data.id } });
      expect(registeredSeller.name).toBe(sellerData.name);

      await SellerEntity.clear();
    });

    it('should respond status 400 when body is invalid or missing', async () => {
      const sellerData: CreateSellerDto = {
        name: 'Company test',
        cnpj: '44.637.38401-64',
        address: 'R. Lorem Solum, 500 - Lorem/SP',
      };
      const sellersRoute = new SellerRoute();

      const app = new App([sellersRoute]);
      const response = await request(app.getServer()).post(`${sellersRoute.path}`).send(sellerData);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('[GET] /sellers', () => {
    it('should respond status 200 and with a list of all sellers', async () => {
      const sellerDatas: CreateSellerDto[] = [
        {
          name: 'Company test',
          cnpj: '77.637.384/0001-64',
          address: 'R. Lorem Solum, 500 - Lorem/SP',
        },
        {
          name: 'Company test 2',
          cnpj: '45.637.384/0001-64',
          address: 'R. Lorem Solum, 700 - Lorem/SP',
        },
      ];

      await SellerEntity.create(sellerDatas[0]).save();
      await SellerEntity.create(sellerDatas[1]).save();

      const sellersRoute = new SellerRoute();

      const app = new App([sellersRoute]);
      const response = await request(app.getServer()).get(`${sellersRoute.path}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.data).toHaveLength(2);

      await SellerEntity.clear();
    });
  });

  describe('[GET] /sellers/:id', () => {
    it('should respond status 200 and one specific seller information', async () => {
      const sellerDatas: CreateSellerDto[] = [
        {
          name: 'Company test',
          cnpj: '77.637.384/0001-64',
          address: 'R. Lorem Solum, 500 - Lorem/SP',
        },
        {
          name: 'Company test 2',
          cnpj: '45.637.384/0001-64',
          address: 'R. Lorem Solum, 700 - Lorem/SP',
        },
      ];

      await SellerEntity.create(sellerDatas[0]).save();
      const checkSeller = await SellerEntity.create(sellerDatas[1]).save();

      const sellersRoute = new SellerRoute();

      const app = new App([sellersRoute]);
      const response = await request(app.getServer()).get(`${sellersRoute.path}/${checkSeller.id}`);
      expect(response.statusCode).toBe(200);
      expect(response.body.data.cnpj).toBe(checkSeller.cnpj);

      await SellerEntity.clear();
    });

    it('should respond status 409 when id is invalid', async () => {
      const sellersRoute = new SellerRoute();

      const app = new App([sellersRoute]);
      const response = await request(app.getServer()).get(`${sellersRoute.path}/2`);
      expect(response.statusCode).toBe(409);
    });
  });

  describe('[PUT] /sellers/:id', () => {
    it('should respond status 200 when id and body are valid', async () => {
      const sellerData: CreateSellerDto = {
        name: 'Company test',
        cnpj: '44.637.384/0001-64',
        address: 'R. Lorem Solum, 500 - Lorem/SP',
      };

      const updateSellerData: Partial<CreateSellerDto> = {
        cnpj: '55.675.345/0001-76',
      };
      const testSeller = await SellerEntity.create(sellerData).save();

      const sellersRoute = new SellerRoute();

      const app = new App([sellersRoute]);
      const response = await request(app.getServer()).put(`${sellersRoute.path}/${testSeller.id}`).send(updateSellerData);

      expect(response.statusCode).toBe(200);
      const updatedSeller = await SellerEntity.findOne({ where: { id: testSeller.id } });
      expect(updatedSeller.cnpj).toBe(updateSellerData.cnpj);

      SellerEntity.clear();
    });

    it('should respond status 409 when id does not exist', async () => {
      const updateSellerData: Partial<CreateSellerDto> = {
        cnpj: '55.675.345/0001-76',
      };

      const sellersRoute = new SellerRoute();

      const app = new App([sellersRoute]);
      const response = await request(app.getServer()).put(`${sellersRoute.path}/1`).send(updateSellerData);

      expect(response.statusCode).toBe(409);
    });
  });

  describe('[DELETE] /sellers/:id', () => {
    it('should respond status 200 with correct id', async () => {
      const sellerData: CreateSellerDto = {
        name: 'Company test',
        cnpj: '44.637.384/0001-64',
        address: 'R. Lorem Solum, 500 - Lorem/SP',
      };
      const testSeller = await SellerEntity.create(sellerData).save();

      const sellersRoute = new SellerRoute();

      const app = new App([sellersRoute]);
      const response = await request(app.getServer()).delete(`${sellersRoute.path}/${testSeller.id}`);

      expect(response.statusCode).toBe(200);
      const sellers = await SellerEntity.find();
      expect(sellers).toHaveLength(0);
    });

    it('should respond status 409 with incorrect id', async () => {
      const sellersRoute = new SellerRoute();

      const app = new App([sellersRoute]);
      const response = await request(app.getServer()).delete(`${sellersRoute.path}/1`);

      expect(response.statusCode).toBe(409);
    });
  });
});
