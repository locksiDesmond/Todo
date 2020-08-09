import { useState } from "react";
import styles from "../styles/Card.module.css";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { deleteList, openModal } from "./../redux/Action";
export default function ListCard({ data }) {
  // @desc this component will return a list card with
  // @features it can delete a list , edit a list
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useDispatch();
  const handleRoute = (e) => {
    if (data) {
      Router.push(`/tasks/${data._id}`); // route to another page
    }
  };
  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteList(data._id)); // delete list
    setShowDelete(!showDelete);
  };
  const handleEdit = (e) => {
    e.stopPropagation();
    setShowDelete(!showDelete); // close list card option once modal is open
    dispatch(openModal({ title: data.title }, { id: data._id })); // open modal with defaultvalues and options
  };
  return (
    <div
      onClick={handleRoute}
      className={`${styles.card} hover ${!data && styles.wrapper}`}
    >
      <p className={`${styles.title} ${!data && styles.animate}`}>
        {data && data.title}
      </p>
      <div className={`${styles.task} ${!data && styles.animate}`}>
        {data && data.no_of_task + " Tasks"}
        <span
          onClick={(e) => {
            e.stopPropagation();
            setShowDelete(!showDelete);
          }}
          className={`${styles.hambugger} hover_item `}
        >
          <img
            src="/svg/more.svg"
            className={`${styles.img} ${!data && "d--none"}`}
            alt="more"
          />
        </span>
      </div>
      <div
        className={`${styles.more} ${showDelete ? styles.show : styles.none}`}
      >
        <div className="text--create text--bold" onClick={(e) => handleEdit(e)}>
          Edit
        </div>
        <div
          className="text--cancel text--bold"
          onClick={(e) => handleDelete(e)}
        >
          Delete
        </div>
      </div>
    </div>
  );
}
