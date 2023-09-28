import { Router } from 'express';
import { getAll, getById, insert, update, deleteById} from '../controllers/plato.js'

const routerSize = Router();

routerSize.get("/platos", getAll);
routerSize.get("/plato/:id", getById);
routerSize.post("/plato", insert);
routerSize.put("/plato", update);
routerSize.delete("/plato/:id", deleteById);