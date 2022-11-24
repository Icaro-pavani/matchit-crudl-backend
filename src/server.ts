import App from '@/app';
import IndexRoute from '@routes/index.route';
import SellersRoute from '@routes/sellers.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new SellersRoute()]);

app.listen();
