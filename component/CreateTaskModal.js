import Modal from "react-modal";
import styles from "../styles/Form.module.css";
import modalStyles from "../styles/Modal.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "./../redux/Action";
Modal.setAppElement("#__next");
export default function CreateTaskModal(props) {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.tasks);
  const onSubmit = async (data) => {
    const response = await dispatch(addTask({ ...data, list: props.task.id }));
    if (response) {
      props.closeModal();
    }
  };

  return (
    <Modal
      isOpen={props.isOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={props.closeModal}
      className={modalStyles.modal}
      aria={{
        labelledby: "title",
        describedby: "full_description",
      }}
      contentLabel="Example Modal"
    >
      <div className="aria-close">
        <button
          className="aria-close__button text--cancel"
          onClick={props.closeModal}
        >
          close
        </button>
      </div>
      <p className={styles.title}>Create Task</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            id=""
            name="title"
            placeholder="Task Title"
            type="text"
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
            value="Add"
            className={`${styles.button} ${styles.buttonCurve}`}
          />
        </div>

        {loading ? <p>loading</p> : <p className={styles.error}>{error}</p>}
      </form>
    </Modal>
  );
}
