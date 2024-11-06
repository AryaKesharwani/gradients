const mongoose = require('mongoose');

// Replace with your MongoDB connection string
const dbURI = 'mongodb://127.0.0.1:27017/colorsDB';

// Define the gradient schema
const gradientSchema = new mongoose.Schema({
  name: String,
  colors: [String],
});

// Create a model from the schema
const Gradient = mongoose.model('Gradient', gradientSchema);

// Connect to the database
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    seedData();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Gradient data to seed
const gradients = [
  { name: "Oceanic", colors: ["#0093E9", "#80D0C7"] },
  { name: "Cotton Candy", colors: ["#D9AFD9", "#97D9E1"] },
  { name: "Gotham", colors: ["#2C3E50", "#4CA1AF"] },
];

// Function to seed data
async function seedData() {
  try {
    // Clear existing data
    await Gradient.deleteMany({});
    console.log('Existing data cleared');

    // Insert new data
    await Gradient.insertMany(gradients);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}
