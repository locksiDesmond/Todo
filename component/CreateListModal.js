import Modal from "react-modal";
import styles from "../styles/Form.module.css";
import modalStyles from "../styles/Modal.module.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../redux/Action";
import Loader from "react-loader-spinner";
Modal.setAppElement("#__next");
export default function CreateListModal(props) {
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.list);
  const onSubmit = async (data) => {
    const response = await dispatch(addList(data));
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
            disabled={loading ? "value" : null}
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
