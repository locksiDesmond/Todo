import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Main from "./../../layout/Main";
import styles from "../../styles/Card.module.css";
import formStyles from "../../styles/Form.module.css";
import TaskCard from "../../component/TaskCard";
import { useSelector, useDispatch } from "react-redux";
import CreateTaskModal from "./../../component/CreateTaskModal";
export default function Tasks() {
  const router = useRouter();
  const { id } = router.query;
  const [taskModalIsOpen, setTaskModalIsOpen] = useState(false);
  const [shouldDelete, setShouldDelete] = useState(false);
  const [currentList, setCurrentList] = useState({});
  const { tasks } = useSelector((state) => state.tasks);
  const { lists } = useSelector((state) => state.list);
  // const dispatch = useDispatch();
  useEffect(() => {
    const item = tasks.filter(
      (element) => element.id === id && element.checked
    );
    if (item.length) {
      setShouldDelete(true);
    } else {
      setShouldDelete(false);
    }
  }, [tasks, id]);
  useEffect(() => {
    if (id) {
      lists.forEach((element) => {
        if (element.id === id) {
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
            {shouldDelete && (
              <button
                className={`${formStyles.button} mx--1 button--box-shadow width--auto bg--cancel`}
              >
                Delete
              </button>
            )}
            <button
              onClick={() => setTaskModalIsOpen(true)}
              className={`${formStyles.button} mx--1 button--box-shadow width--auto`}
            >
              Create Task
            </button>
          </div>
        </div>
        <div className={styles.taskCards}>
          {tasks.map((item, index) => {
            if (item.id === id) {
              return <TaskCard task={item} key={index} />;
            }
          })}
        </div>
      </div>
    </Main>
  );
}
