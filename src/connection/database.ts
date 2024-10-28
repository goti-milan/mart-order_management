import { Sequelize } from 'sequelize-typescript';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, NODE_ENV } from '../config';
import { Order } from '../models/order';
import { OrderList } from '../models/orderList';

// Initialize Sequelize instance
const sequelize = new Sequelize({
  database: DB_NAME || 'mart-dev',
  dialect: 'postgres',
  username: DB_USER || 'postgres',
  password: DB_PASSWORD || 'postgres',
  host: DB_HOST || 'localhost',
  port: Number(DB_PORT) || 5432,
  models: [Order, OrderList], // Registering models
  logging: NODE_ENV !== 'production', // Disable logging in production
  pool: {
    max: 10, // Max number of connections
    min: 0,  // Min number of connections
    acquire: 30000, // Maximum time (ms) to get a connection
    idle: 10000, // Time (ms) before releasing idle connection
  },
  define: {
    freezeTableName: true, // Prevents automatic pluralization of table names
    timestamps: true, // Enables createdAt and updatedAt by default
  },
});

export default sequelize;
