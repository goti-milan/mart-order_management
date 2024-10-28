import express from 'express';
import { deleteOrderList, getOrderList, orderListCreate, orderListUpdate } from '../controllers/orderListControllers';


const router = express.Router();


router.get('/:id', getOrderList);

router.post('/create', orderListCreate);

router.patch('/:id', orderListUpdate);

router.delete('/:id', deleteOrderList);


export default router;
