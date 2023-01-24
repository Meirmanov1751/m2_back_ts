const model = require("../models/city.model");
import { Request, Response} from 'express';

exports.getCity= async (req: Request, res: Response) => {
  const apartment = await model.City.find();
  res.send(apartment);
};

exports.postCity = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);

  const name = req.body.name;

  res.send(req.body.name);

  const post = new model.City({
    name : name,
  });
  post.save(function (err: Error) {
    if (err) return console.log(err);
    console.log(req.body)
    res.send(JSON.parse(req.body));
  });
};

exports.getByIdCity = async (req: Request, res: Response) => {
  try {
    const apartment = await model.City.findOne({_id: req.params.id});
    res.send(apartment);
  }catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};

exports.putCity= async (req: Request, res: Response) => {
  try {
    const name = req.body.name;

    const apartment = await model.City.findOneAndUpdate({_id: req.params.id}, {
      name : name,
    });

    await apartment.save();
    res.send(apartment);
  } catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};

exports.deleteCity = async (req: Request, res: Response) => {
  try {
    await model.City.deleteOne({_id: req.params.id});
    res.status(204).send();
  }catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};
