import React from "react";
import { UserContext } from "../../UserContext.jsx";
import PhotoCommentsForm from "./PhotoCommentsForm";
import Styles from './PhotoComments.module.css';

const PhotoComments = (props) => {
  const [comments, getComments] = React.useState(() => props.comments);
  const { login } = React.useContext(UserContext);

  return (
    <div>
      <ul className={styles.comments}>
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
              <b>{comment.comment_author}:  </b>
              <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm id={props.id} />}
    </div>
  );
};

export default PhotoComments;
