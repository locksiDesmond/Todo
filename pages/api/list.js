import Joi from "@hapi/joi";
import nextConnect from "next-connect";
import Connection from "../../database/Connection";
import List from "../../database/models/Lists";
import Authorize from "../../middleware/Authorize";

const handler = nextConnect();
handler.use(Authorize);
handler.use(Connection);
handler.post(async (req, res) => {
  const schema = Joi.object().keys({
    title: Joi.string().min(3).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.json(error);
  } else {
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
export default handler;
