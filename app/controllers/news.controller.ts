const model = require("../models/news.model");
import { Request, Response} from 'express';

exports.getNews = async (req: Request, res: Response) => {
  if(req.query["name"]){
    const regEx: any = req.query["name"]
    const building = await model.News.find({"name": new RegExp(regEx, "i")}).sort({"name": 1});
    res.send(building);
  } else {
    const building = await model.News.find()
    res.send(building);
  };
};

exports.postNews= async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);

  const title = req.body.title;
  const content = req.body.content;

  res.send(req.body.name);

  const post = new model.News({
    title: title,
    content: content
  });
  post.save(function (err: Error) {
    if (err) return console.log(err);
    console.log(req.body)
    res.send(JSON.parse(req.body));
  });
};

exports.getByIdNews = async (req: Request, res: Response) => {
  try {
    const building = await model.News.findOne({_id: req.params.id});
    res.send(building);
  }catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};

exports.putNews = async (req: Request, res: Response) => {
  try {
    const title = req.body.title;
    const content = req.body.content;

    const building = await model.News.findOneAndUpdate({_id: req.params.id}, {
      title: title,
      content: content
    });

    await building.save();
    res.send(building);
  } catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};

exports.deleteNews = async (req: Request, res: Response) => {
  try {
    await model.News.deleteOne({_id: req.params.id});
    res.status(204).send();
  }catch {
    res.status(404);
    res.send({error: "Post doesn't exist!"});
  };
};
