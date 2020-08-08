import Modal from "react-modal";
import styles from "../styles/Form.module.css";
import modalStyles from "../styles/Modal.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, closeModal } from "./../redux/Action";
import Loader from "react-loader-spinner";
Modal.setAppElement("#__next");
export default function CreateTaskModal(props) {
  const { register, errors, handleSubmit } = useForm();
  const { error, loading } = useSelector((state) => state.tasks);
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    if (props.id) {
      const response = await dispatch(
        updateTask({ ...data, list: props.task._id }, props.id)
      );
      if (response) {
        dispatch(closeModal());
      }
    } else {
      const response = await dispatch(
        addTask({ ...data, list: props.task._id })
      );
      if (response) {
        dispatch(closeModal());
      }
    }
  };
  return (
    <Modal
      isOpen={modal.isOpen}
      onRequestClose={() => dispatch(closeModal())}
      className={modalStyles.modal}
      aria={{
        labelledby: "title",
        describedby: "full_description",
      }}
      contentLabel="Add Task"
    >
      <div className="aria-close">
        <button
          className="aria-close__button bg--cancel"
          onClick={() => dispatch(closeModal())}
        >
          close
        </button>
      </div>
      <p className={styles.title}>Create Task</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            id="title"
            name="title"
            placeholder="Task Title"
            type="text"
            defaultValue={
              modal.defaultValues ? modal.defaultValues.title : null
            }
            className={styles.input}
            ref={register({ required: true })}
          />
          <p className={styles.error}>
            {errors.title && "Task Title is required"}
          </p>
        </div>
        <div className={styles.formGroup}>
          <textarea
            name="description"
            id="full_description"
            placeholder="Task description"
            type="text"
            defaultValue={
              modal.defaultValues ? modal.defaultValues.description : null
            }
            className={`${styles.input} ${styles.description}`}
            ref={register({ required: true })}
          />
          <p className={styles.error}>
            {errors.description && "Description is required"}
          </p>
        </div>
        <div>
          <div className="flex flex--column">
            <span>List</span>
            <span className="label my--1">
              {props.task && props.task.title}
            </span>
          </div>
        </div>
        <div className="flex">
          <input
            type="submit"
            disabled={loading ? "value" : null}
            value={props.id ? "Update" : "Add"}
            className={`${styles.button} ${styles.buttonCurve}`}
          />
        </div>

        {loading ? (
          <div className="flex flex--center mt--2">
            <Loader
              type="Oval"
              color="#00BFFF"
              height={40}
              width={40}
              timeout={3000} //3 secs
            />
          </div>
        ) : (
          <p className={styles.error}>{error}</p>
        )}
      </form>
    </Modal>
  );
}
