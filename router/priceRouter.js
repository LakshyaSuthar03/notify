import {Router} from "express";
import {fetchPrice} from "../controller/PriceController.js";

const router = Router();


router.get('/price', fetchPrice);

export default router;