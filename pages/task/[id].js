import formStyles from "../../styles/Form.module.css";
import { useState, useEffect } from "react";
import Main from "./../../layout/Main";
import Router, { useRouter } from "next/router";
import styles from "../../styles/Task.module.css";
import { useDispatch, useSelector } from "react-redux";
import { DateConversion } from "./../../lib/DateConversion";
import { deleteTask, openModal } from "./../../redux/Action";
import Spinner from "./../../component/Spinner";
export default function Task() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const tasks = useSelector((state) => state.tasks);
  const handleDelete = async () => {
    const response = await dispatch(deleteTask(id));
    if (response) {
      Router.push(`/tasks/${data.list._id}`); // reroute user back to Tasks page
    }
  };
  useEffect(() => {
    // fetch a task using its id
    const fetchTask = async () => {
      try {
        const response = await fetch(`/api/task?id=${id}`).then((res) =>
          res.json()
        );
        if (response) {
          setData(response);
          setLoading(false);
        }
      } catch (e) {
        Router.push(`/`);
      }
    };
    if (id) {
      fetchTask();
    }
  }, [id]);
  const handleTaskUpdate = async () => {
    // sends a request to open modal with default values
    dispatch(
      openModal(
        {
          title: data.title,
          description: data.description,
        },
        {
          id: data._id,
          task: data.list,
        }
      )
    );
  };
  return (
    <Main
      createTask
      task={data.list}
      back={data.list && `/tasks/${data.list._id}`}
    >
      {loading ? (
        <div className="flex flex--center">
          <Spinner />
        </div>
      ) : (
        <React.Fragment>
          <div className={styles.container}>
            <p className={styles.title}>{data.title}</p>
            <div className={styles.dateAndList}>
              {data.list && (
                <div className="label my--1 label--sm">{data.list.title}</div>
              )}
              <span> | </span>
              <div className={styles.clock}>
                <img src="/svg/clock.svg" /> {DateConversion(data.date_created)}
              </div>
            </div>
            <div className={styles.descriptionGroup}>
              <p>Description</p>
              <div className={styles.description}>{data.description}</div>
            </div>
            <div className="flex flex--space-between mt--3">
              <button
                className={`${formStyles.button} mx--1 button--box-shadow width--auto bg--cancel`}
                onClick={() => handleDelete()}
                disabled={tasks.loading ? "value" : null}
              >
                Delete
              </button>
              <button
                onClick={() => handleTaskUpdate()}
                className={`${formStyles.button} mx--1  button--box-shadow width--auto`}
              >
                Update Task
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
    </Main>
  );
}
