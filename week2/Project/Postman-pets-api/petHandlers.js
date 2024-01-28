const pets = [];

let nextPetId = 1;

function getNewPetId() {
  const newPetId = nextPetId;
  nextPetId++;
  return newPetId;
}

//  HANDLERS

// GET /pets
const getAllPets = (req, res) => {
  console.log(pets);
  res.json(pets);
};

// POST /pets
const createPet = (req, res) => {
    const { name, species, age, color, weight } = req.body;
    const newPet = {
      petId: getNewPetId(),
      name,
      species,
      age,
      color,
      weight,
    };
    pets.push(newPet);
    res.json(newPet);
  };

// GET /pets/:petId
const getPetById = (req, res) => {
  const petId = req.params.petId;
  const pet = pets.find((pet) => pet.petId == petId);
  res.json(pet);
};

// PUT /pets/:petId
const updatePet = (req, res) => {
    const { name } = req.body;
    const { petId } = req.params;
    const pet = pets.find((pet) => pet.petId == petId);
  
    if (!pet) {
      res.status(404).json({ message: 'Pet not found' });
      return;
    }
  
    pet.name = name;
    res.json(pet);
  };

// DELETE /pets/:petId
const deletePet = (req, res) => {
  const petId = req.params.petId;
  const petIdx = pets.findIndex((pet) => pet.petId == petId);
  pets.splice(petIdx, 1);
  res.json({ message: "success" });
};

module.exports = {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
};
