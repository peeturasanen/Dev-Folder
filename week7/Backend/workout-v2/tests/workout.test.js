const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});

describe("when there is initially some workouts saved", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0])
      .send(workouts[1]);
  });

  it("Workouts are returned as json", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("New workout added successfully", async () => {
    const newWorkout = {
      title: "testworkout",
      reps: 10,
      load: 100,
    };
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(newWorkout)
      .expect(201);  
});

  it("Existing workout updated successfully", async () => {
    const updatedWorkout = {
      title: "testworkout",
      reps: 10,
      load: 100,
    };
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(updatedWorkout)
      .expect(201);
    });

  it("Existing workout deleted successfully", async () => {
    // First, create a workout to delete
    const newWorkout = {
      title: "testworkout",
      reps: 10,
      load: 100,
    };
    const createdWorkoutResponse = await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(newWorkout)
      .expect(201);
  
    // Then, delete the workout using its ID
    const workoutToDeleteId = createdWorkoutResponse.body.id;
    await api
      .delete(`/api/workouts/${workoutToDeleteId}`)
      .set("Authorization", "bearer " + token)
      .expect(204);
  });
   
});

afterAll(() => {
  mongoose.connection.close();
});
