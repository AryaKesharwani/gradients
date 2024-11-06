
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5030;

// Middleware
app.use(express.json());
app.use(cors({
  origin: '*',
}));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/colorsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define the schema and model
const colorSchema = new mongoose.Schema({
  name: String,
  colors: [String],
});

const Color = mongoose.model('Color', colorSchema);

// Routes
app.post('/colors', async (req, res) => {
  try {
    const newColor = new Color(req.body);
    await newColor.save();
    res.status(201).send(newColor);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/colors', async (req, res) => {
  try {
    const colors = await Color.find();
    res.status(200).send(colors);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/colors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Color.findByIdAndDelete(id);
    res.status(200).send({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting color', error });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
