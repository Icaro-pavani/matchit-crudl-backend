# Back-End: MatchIT - CRUDL - Challenge

## :clipboard: Description

This project is a CRUDL API that manages Sellers information, storing name, registry(CNPJ) and address.
You can find the front of this API [here](https://github.com/Icaro-pavani/matchit-crudl-frontend)

---

## :computer: Concepts and Technologies

- REST API
- Node.js
- PostgreSQL
- Express
- TypeScript
- TypeORM
- Swagger
- Jest
- [typescript-express-starter](https://www.npmjs.com/package/typescript-express-starter)

---

## 🏁 Running the application

Inside the main folder, start installing the dependencies with this command:

```yml
npm install
```

After all the dependencies installed, create a `.env.development.local` file, following the `.env.example.local`.

If you are running localy the application, start creating a database with the same name inputed in the `.env.development.local` file.

Now, to initiate the API, just use the command: 

```yml
npm run dev
```

It will initiate the API in development mode and will create the necessary table in the database. The url[http://localhost:5000](http://localhost:5000) will become the base API address and through this address, requests can be made for the different routes.

To create and execute the API in production mode, create a `.env.production.local` based on `.env.example.local` and create the database with the name added to the .env file. Then, execute the command:

```yml
npm start
```

It will generate the files for production in the folder `/dist` and initiate the application.

### Docker

The application can be executed in development mode using Docker. It only needs to change `.env.development.local`'s DB_HOST to `pg` and maintain the other variables as the example. Execute the command:

```yml
docker-compose build
```

to build the image of the containers. At last, execute the commando: 

```yml
docker-compose up
```

And the application will be up and running.


### Tests

To run the tests, need to follow the same setup. First create `.env.test.local` following the `.env.example.local` and create a database with the same name added to the env file (Don't use the same databse for development or prodution in the test because it will be reseted in each test). Then, just execute the command:

```yml
npm run test
```

to execute all tests added to this API.



---

## :rocket: Routes

GET /api-docs

- Route responsible to bring the API routes documentation
- Use this route in the browser to read and interact 
- link: [https://localhost:5000/api-docs](https://localhost:5000/api-docs)

```yml
GET /
    - Route responsible to confirma if the API is up and running
    - headers: {}
    - body: {}
    - response: "OK"
```

```yml
GET /sellers
    - Route responsible to get all sellers stored in the database
    - headers: {}
    - body: {}
    - response: {
        "data": [{
          "id": "number",
          "name": "string",
          "cnpj": "string",
          "address": "string",
        }],
        "message": "string"
    }
    
```

```yml
GET /sellers/:id
    - Route responsible to get one specific seller information
    - headers: {}
    - body: {}
    - response: {
        "data": {
          "id": "number",
          "name": "string",
          "cnpj": "string",
          "address": "string",
        },
        "message": "string"
    }
```

```yml
POST /sellers
    - Route responsible to create a new Seller in the database
    - headers: {}
    - body: {
        "name": "string",
        "cnpj": "string", #format: xx.xxx.xxx/xxxx-xx
        "address": "string",
    }
    - response: {
        "data": {
          "id": "number",
          "name": "string",
          "cnpj": "string",
          "address": "string",
        },
        "message": "string"
    }
```

```yml
PUT /sellers/:id
    - Route responsible to update a Seller information by its id
    - headers: {}
    - body: {
        "name": "string",
        "cnpj": "string", #format: xx.xxx.xxx/xxxx-xx
        "address": "string",
    }
    - response: {
        "data": {
          "id": "number",
          "name": "string",
          "cnpj": "string",
          "address": "string",
        },
        "message": "string"
    }
    - The field in this body are optional
    
```

```yml
DELETE /sellers/:id
    - Route responsible for delete one specific Seller by id
    - headers: {}
    - body: {}
    - response: {
        "data": {
          "id": "number",
          "name": "string",
          "cnpj": "string",
          "address": "string",
        },
        "message": "string"
    }
```

---