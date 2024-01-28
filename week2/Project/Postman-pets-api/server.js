const express = require("express");
const app = express();

const {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
} = require("./petHandlers"); // 'petHandlers.js' contains the route handlers

// Middleware to parse JSON
app.use(express.json());

// ROUTES
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method);
    console.log('Path:  ', request.path);
    console.log('Body:  ', request.body);
    console.log('---');
    next();
  }

  app.use(requestLogger);

  // GET /dogs
app.get("/pets", getAllPets);

// POST /dogs
app.post("/pets", createPet);

// GET /dogs/:dogId
app.get("/pets/:petId", getPetById);

// PUT /dogs/:dogId
app.put("/pets/:petId", updatePet);

// DELETE /dogs/:dogId
app.delete("/pets/:petId", deletePet);

const port = 3001;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});