const express = require('express');
const logger = require('./middleware/logger');
const { unknownEndpoint, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Init middleware
app.use(logger);

// Body Parser Middleware
app.use(express.json());

// Members API Routes
app.use('/api/members', require('./routers/membersRouter'));

// Error Middleware
app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));