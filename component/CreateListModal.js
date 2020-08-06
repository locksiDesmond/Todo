import Modal from "react-modal";
import styles from "../styles/Form.module.css";
import modalStyles from "../styles/Modal.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../redux/Action";
Modal.setAppElement("#__next");
export default function CreateListModal(props) {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.list);
  const onSubmit = (data) => {
    dispatch(addList(data));
  };

  return (
    <Modal
      isOpen={props.isOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={props.closeModal}
      className={modalStyles.modal}
      contentLabel="Example Modal"
    >
      <div className="aria-close">
        <button
          className="aria-close__button bg--cancel"
          onClick={props.closeModal}
        >
          close
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            name="title"
            placeholder="List Title"
            type="title"
            className={styles.input}
            ref={register({ required: true })}
          />
          <p className={styles.error}>{errors.title && "Title is required"}</p>
        </div>
        <div className="flex">
          <input
            type="submit"
            value="Create"
            className={`${styles.button} ${styles.buttonCurve}`}
          />
        </div>

        {loading ? <p>loading</p> : <p className={styles.error}>{error}</p>}
      </form>
    </Modal>
  );
}
