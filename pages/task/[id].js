import formStyles from "../../styles/Form.module.css";
import { useState, useEffect } from "react";
import Main from "./../../layout/Main";
import Router, { useRouter } from "next/router";
import styles from "../../styles/Task.module.css";
import CreateTaskModal from "./../../component/CreateTaskModal";
import { useDispatch } from "react-redux";
import { DateConversion } from "./../../lib/DateConversion";
import { deleteTask } from "./../../redux/Action";
import Spinner from "./../../component/Spinner";
export default function Task() {
  const router = useRouter();
  const { id } = router.query;
  const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const handleDelete = async () => {
    const response = await dispatch(deleteTask(id));
    if (response) {
      Router.push(`/tasks/${data.list._id}`);
    }
  };
  useEffect(() => {
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
  return (
    <Main>
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
              <span>{DateConversion(data.date_created)}</span>
            </div>
            <div className={styles.descriptionGroup}>
              <p>Description</p>
              <div className={styles.description}>{data.description}</div>
            </div>
            <div className="flex flex--space-between">
              <button
                className={`${formStyles.button} mx--1 button--box-shadow width--auto bg--cancel`}
                onClick={() => handleDelete()}
              >
                Delete
              </button>
              <button
                onClick={() => setTaskModalIsOpen(true)}
                className={`${formStyles.button} mx--1 button--box-shadow width--auto`}
              >
                Update Task
              </button>
            </div>
          </div>
          <CreateTaskModal
            isOpen={taskModalIsOpen}
            defaultValues={{ title: data.title, description: data.description }}
            id={data._id}
            update
            task={data.list}
            closeModal={() => setTaskModalIsOpen(false)}
          />
        </React.Fragment>
      )}
    </Main>
  );
}
