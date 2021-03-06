import Joi from "@hapi/joi";
import nextConnect from "next-connect";
import Connection from "../../database/Connection";
import List from "../../database/models/Lists";
import Authorize from "../../middleware/Authorize";
const handler = nextConnect();

// joi schema for authentication
const schema = Joi.object().keys({
  title: Joi.string().min(3).required(),
});

handler.use(Authorize); //check's if user is authorized
handler.use(Connection); // connects to database
handler.post(async (req, res) => {
  // @desc   this function validates a user form data and creates a list;

  // validates user's form data
  const { error } = schema.validate(req.body);
  if (error) {
    res.json(error);
  } else {
    //creates a todo list
    await List.create(
      { ...req.body, created_by: res.decodeId },
      (err, list) => {
        if (err) {
          throw err;
        }
        if (list) {
          res.json(list);
        }
      }
    );
  }
});
handler.get(async (req, res) => {
  // @desc this function fetchings all List created by a user;

  await List.find({ created_by: res.decodeId }, (err, lists) => {
    if (err) throw err;
    if (lists) {
      res.json(lists);
    }
  });
});
handler.delete(async (req, res) => {
  // @desc this function will delete a user list
  if (req.query.id) {
    await List.findByIdAndDelete(req.query.id, (err, result) => {
      if (err) throw err;
      if (result) {
        res.json({ message: "List successfully deleted" });
      }
    });
  } else {
    throw "no id found";
  }
});
handler.put(async (req, res) => {
  // @desc this function finds and update a user's list;
  if (req.query.id) {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.json(error);
    } else {
      // edits a list
      await List.findByIdAndUpdate(
        req.query.id,
        { ...req.body },
        { new: true },
        (err, list) => {
          if (err) throw err;
          res.json({ list });
        }
      );
    }
  } else {
    throw "no id found";
  }
});
export default handler;
