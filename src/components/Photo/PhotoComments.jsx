import React from "react";
import { UserContext } from "../../UserContext.jsx";
import PhotoCommentsForm from "./PhotoCommentsForm";

const PhotoComments = (props) => {
  const [comments, getComments] = React.useState(() => props.comments);
  const { login } = React.useContext(UserContext);

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_ID}></li>
        ))}
      </ul>
      {login && <PhotoCommentsForm id={props.id} />}
    </div>
  );
};

export default PhotoComments;
