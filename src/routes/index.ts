import orderRoutes from './orderRoutes'
import orderListRoutes from './orderListRoutes'
import express from 'express';
const router = express.Router();

router.use('/order', orderRoutes);
router.use('/order-list', orderListRoutes);



export default router;
