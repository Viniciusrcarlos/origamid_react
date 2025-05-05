import React from "react";
import Enviar from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch.jsx';
import { COMMENT_POST } from '../../Api.jsx';

const PhotoCommentsForm = ({ id }) => {
  const {request, error} = useFetch();
  const [comment, setComment] = React.useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const { url, options } = COMMENT_POST(id, {comment});
    await request(url, options);

  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
      id="comment"
      name="comment"
      placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button>
        <img src={Enviar} />
      </button>
    </form>
  );
};

export default PhotoCommentsForm;
