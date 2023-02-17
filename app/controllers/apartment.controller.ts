const model = require("../models/apartment.model");
import { Request, Response} from 'express';

exports.getApartment= async (req: Request, res: Response) => {
  if(req.query["name"]){
    const regEx: any = req.query["name"]
    const apartment = await model.Apartment.find({"name": new RegExp(regEx, "i")}).sort({"name": 1});
    res.send(apartment);
  } else {
    const apartment = await model.Apartment.find();
    console.log(apartment)
    res.send(apartment);
  };
};

exports.postApartment = async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);

  const name = req.body.name;
  const area = req.body.area
  const soldArea = req.body.soldArea
  const building = req.body.building

  res.send(req.body.name);

  const post = new model.Apartment({
    name : name,
    area : area,
    soldArea : soldArea,
    building : building
  });

  post.save(function (err: Error) {
    if (err) return console.log(err);
    console.log(req.body)
    res.send(JSON.parse(req.body));
  });
};

exports.getByIdApartment = async (req: Request, res: Response) => {
  try {
    const apartment = await model.Apartment.findOne({_id: req.params.id});
    res.send(apartment);
  }catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};

exports.putApartment= async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const area = req.body.area
    const soldArea = req.body.soldArea
    const building = req.body.building

    const apartment = await model.Apartment.findOneAndUpdate({_id: req.params.id}, {
      name : name,
      area : area,
      soldArea : soldArea,
      building : building
    });

    await apartment.save();
    res.send(apartment);
  } catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};

exports.deleteApartment = async (req: Request, res: Response) => {
  try {
    await model.Apartment.deleteOne({_id: req.params.id});
    res.status(204).send();
  }catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};
