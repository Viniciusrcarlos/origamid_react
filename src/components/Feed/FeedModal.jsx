import React from 'react'
import styles from './FeedModal.module.css'
import useFetch from '../../Hooks/useFetch'
import { PHOTO_GET } from '../../Api';
import Error from '../Helper/Error.jsx'
import Loading from '../Helper/Loading.jsx'
import PhotoContent from '../Photo/PhotoContent.jsx';

const FeedModal = ({photo, setModalPhoto}) => {
  const {data, error, loading, request} = useFetch();

  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  function handleOutsideClick(e) {
    if (e.target === e.currentTarget) {
      setModalPhoto(null)
    }
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data}/>}
    </div>
  )
}

export default FeedModal