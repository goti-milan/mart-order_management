import app from './app';
import { PORT } from './config';
import sequelize from './connection/database';

// Function to start the server
async function startServer() {
  try {
    // Authenticate the database connection
    await sequelize.authenticate();
    console.log('Database connected successfully.');



    // Sync the models with the database (optional: { force: false } avoids re-creating tables)
    await sequelize.sync(); 
    console.log('Database synchronized.');

    // Start the server after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit process if the connection fails
  }
}

// Start the server
startServer();
