import Modal from "react-modal";
import styles from "../styles/Form.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../redux/Action";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export default function CreateListModal(props) {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.list);
  const onSubmit = (data) => {
    console.log(data);
    dispatch(addList(data));
  };

  return (
    <Modal
      isOpen={props.isOpen}
      //   onAfterOpen={afterOpenModal}
      onRequestClose={props.closeModal}
      style={customStyles}
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
