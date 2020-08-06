import Joi from "@hapi/joi";
import nextConnect from "next-connect";
import Connection from "./../../database/Connection";
import Authorize from "./../../middleware/Authorize";
import Task from "./../../database/models/Tasks";
const handler = nextConnect();
handler.use(Authorize);
handler.use(Connection);
handler.post(async (req, res) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
    list: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.json(error);
  } else {
    await Task.create(
      { ...req.body, created_by: res.decodeId },
      (err, task) => {
        if (err) {
          throw err;
        }
        if (task) {
          res.json(task);
        }
      }
    );
  }
});
export default handler;
