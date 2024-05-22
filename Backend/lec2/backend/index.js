import express from "express";

const app = express();

app.get('/api/', (req, res) => {
  res.send("server is on");
});

app.get('/api/jokes', (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "a joke",
      content: "this is joke"
    },
    {
      id: 2,
      title: "a joke",
      content: "this is joke"
    },
    {
      id: 3,
      title: "a joke",
      content: "this is joke"
    },
    {
      id: 4,
      title: "a joke",
      content: "this is joke"
    }
  ];
  res.send(jokes);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
