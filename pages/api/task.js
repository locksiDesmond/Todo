import Joi from "@hapi/joi";
import nextConnect from "next-connect";
import Connection from "./../../database/Connection";
import Authorize from "./../../middleware/Authorize";
import Task from "./../../database/models/Tasks";
import List from "./../../database/models/Lists";
const Async = require("async");
const schema = Joi.object().keys({
  title: Joi.string().min(3).required(),
  description: Joi.string().required(),
  list: Joi.string().required(),
});
const handler = nextConnect();
handler.use(Authorize);
handler.use(Connection);
handler.post(async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.json(error);
  } else {
    Async.waterfall(
      [
        function (callback) {
          Task.create(
            { ...req.body, created_by: res.decodeId },
            (err, task) => {
              if (err) {
                throw err;
              }
              callback(null, task);
            }
          );
        },
        function (task, callback) {
          List.findById(task.list, (err, list) => {
            if (err) throw err;
            if (list) {
              callback(null, list, task);
            }
          });
        },
        function (list, task, callback) {
          List.findByIdAndUpdate(
            list._id,
            { no_of_task: list.no_of_task + 1 },
            (err, result) => {
              if (err) throw err;
              if (result) {
                callback(null, task);
              }
            }
          );
        },
      ],
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.json(result);
        }
      }
    );
  }
});

handler.get(async (req, res) => {
  if (req.query.list) {
    await Task.find({ list: req.query.list }, (err, list) => {
      if (err) {
        throw err;
      }
      if (list) {
        return res.json(list);
      }
    });
  } else if (req.query.id) {
    const task = await Task.findById(req.query.id).populate("list");
    res.json(task);
  } else {
    throw "no id";
  }
});

handler.put(async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.json(error);
  } else {
    if (req.query.id) {
      await Task.findByIdAndUpdate(
        req.query.id,
        { ...req.body },
        (err, task) => {
          if (err) throw err;
          res.json({ task });
        }
      );
    } else {
      throw "no id";
    }
  }
});
handler.delete(async (req, res) => {
  if (req.query.id) {
    Async.waterfall(
      [
        function (callback) {
          Task.findByIdAndDelete(req.query.id, (err, result) => {
            if (err) throw err;
            if (result) {
              callback(null, result);
            }
          });
        },
        function (task, callback) {
          List.findById(task.list, (err, list) => {
            if (err) throw err;
            if (list) {
              callback(null, list, task);
            }
          });
        },
        function (list, task, callback) {
          List.findByIdAndUpdate(
            list._id,
            { no_of_task: list.no_of_task - 1 },
            (err, result) => {
              if (err) throw err;
              if (result) {
                callback(null, task);
              }
            }
          );
        },
      ],
      (err, result) => {
        if (err) throw err;
        if (result) {
          res.json({ message: "List successfully deleted" });
        }
      }
    );
  } else {
    throw "no id";
  }
});
export default handler;
