import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Main from "./../../layout/Main";
import styles from "../../styles/Card.module.css";
import formStyles from "../../styles/Form.module.css";
import TaskCard from "../../component/TaskCard";
import { useSelector, useDispatch } from "react-redux";
import CreateTaskModal from "./../../component/CreateTaskModal";
import { getTask, deleteTask } from "./../../redux/Action";
import isArrayEmpty from "./../../lib/isArrayEmpty";
export default function Tasks() {
  const router = useRouter();
  const { id } = router.query;
  const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);
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
  }, [tasks]);
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
    <Main createTask task={currentList}>
      <CreateTaskModal
        task={currentList}
        isOpen={taskModalIsOpen}
        closeModal={() => setTaskModalIsOpen(false)}
      />
      <div>
        <div className="flex flex--space-between mb--1">
          <p>Task</p>
          <div className="flex flex--space-between">
            {checkedItems.length ? (
              <button
                onClick={() => handleDelete()}
                className={`${formStyles.button} mx--1 button--box-shadow width--auto bg--cancel`}
              >
                Delete
              </button>
            ) : null}
            <button
              onClick={() => setTaskModalIsOpen(true)}
              className={`${formStyles.button} mx--1 button--box-shadow width--auto`}
            >
              Create Task
            </button>
          </div>
        </div>
        <div className={styles.taskCards}>
          {isArrayEmpty(currentTasks) ? (
            loading ? (
              new Array(4)
                .fill(null)
                .map((item, index) => <TaskCard key={index} data={item} />)
            ) : (
              <p>No task </p>
            )
          ) : (
            currentTasks
          )}
        </div>
      </div>
    </Main>
  );
}
