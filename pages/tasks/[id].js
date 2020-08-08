import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Main from "./../../layout/Main";
import styles from "../../styles/Card.module.css";
import formStyles from "../../styles/Form.module.css";
import TaskCard from "../../component/TaskCard";
import { useSelector, useDispatch } from "react-redux";
import { getTask, deleteTask, openModal } from "./../../redux/Action";
import isArrayEmpty from "./../../lib/isArrayEmpty";
export default function Tasks() {
  const router = useRouter();
  const { id } = router.query;
  const [currentList, setCurrentList] = useState({});
  const [currentTasks, setCurrentTasks] = useState();
  const [checkedItems, setCheckedItems] = useState([]);
  const { tasks, loading } = useSelector((state) => state.tasks);
  const { lists } = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const handleDelete = () => {
    checkedItems.map((item) => {
      dispatch(deleteTask(item._id));
    });
  };
  useEffect(() => {
    const item = tasks.filter(
      (element) => element.list === id && element.checked
    );
    setCheckedItems(item);
  }, [tasks, id]);

  useEffect(() => {
    const current = tasks.map((item, index) => {
      if (item.list === id) {
        return <TaskCard task={item} key={index} />;
      }
    });
    setCurrentTasks(current);
  }, [tasks, loading]);
  useEffect(() => {
    if (id) {
      dispatch(getTask(id));
      lists.forEach((element) => {
        if (element._id === id) {
          setCurrentList(element);
        }
      });
    }
  }, [id]);

  return (
    <Main createTask task={currentList} back="/">
      <div>
        <div className="flex flex--space-between mb--1 flex--align-center">
          <h2 className="text--bold text--capitalize text--sm ml--1">
            {currentList.title} Tasks
          </h2>
          <div className="flex flex--space-between colgap--1 ">
            {checkedItems.length ? (
              <button
                onClick={() => handleDelete()}
                className={`${formStyles.button} button--box-shadow width--auto button--md bg--cancel`}
              >
                Delete
              </button>
            ) : null}
            <button
              onClick={() => dispatch(openModal(null, { task: currentList }))}
              className={`${formStyles.button} button--box-shadow  bg--create width--auto`}
            >
              Create Task
            </button>
          </div>
        </div>
        {isArrayEmpty(currentTasks) ? (
          loading ? (
            <div className={styles.taskCards}>
              {new Array(4).fill(null).map((item, index) => (
                <TaskCard key={index} data={item} />
              ))}
            </div>
          ) : (
            <p className=" flex flex--center">You have no task to do</p>
          )
        ) : (
          <div className={styles.taskCards}>{currentTasks}</div>
        )}
      </div>
    </Main>
  );
}
