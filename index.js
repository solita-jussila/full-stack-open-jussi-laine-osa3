const express = require('express');

const app = express();

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

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});