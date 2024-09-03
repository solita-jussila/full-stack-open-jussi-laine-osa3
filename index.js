const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(express.json());

app.use(morgan('tiny'));

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": "1"
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": "2"
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": "3"
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": "4"
  }
];

app.get('/info', (request, response) => {
  const now = new Date();
  response.send(`Phonebook has info for ${persons.length} people.<br /><br />${now}`);
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const targetPerson = persons.find(person => person.id === request.params.id);

  if (targetPerson) {
    response.json(targetPerson);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter(person => person.id !== request.params.id);
  response.status(204).end();
});

function getRandomInt(max) {
  return String(Math.floor(Math.random() * max));
}

app.post('/api/persons', (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: 'Name is missing'
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'Number is missing'
    });
  }

  const existingName = persons.find((person) => person.name === body.name);

  if (existingName) {
    return response.status(400).json({
      error: 'Name must be unique'
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: getRandomInt(10000000),
  };

  persons = persons.concat(newPerson);

  response.json(newPerson);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});