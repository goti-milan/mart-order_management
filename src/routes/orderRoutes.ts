import express from 'express';
import { deleteOrder, getOrder, orderRegistration, orderUpdate } from '../controllers/orderControllers';

const router = express.Router();


router.get('/:id', getOrder);

router.post('/create', orderRegistration);

router.patch('/:id', orderUpdate);

router.delete('/:id', deleteOrder);


export default router;
