import { Router } from 'express';
import { getAll, getById, insert, update, deleteById} from '../controllers/plato.js'

const routerPlato = Router();

routerPlato.get("/platos", getAll);
routerPlato.get("/plato/:id", getById);
routerPlato.post("/plato", insert);
routerPlato.put("/plato", update);
routerPlato.delete("/plato/:id", deleteById);

export default routerPlato