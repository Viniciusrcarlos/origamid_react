import React from 'react'
import FeedModal from './FeedModal.jsx'
import FeedPhotos from './FeedPhotos.jsx'

export const Feed = () => {
  const [modalPhoto, setModalPhoto] = React.useState(null);

  return (
    <div>
      {modalPhoto && <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto}/>}
      <FeedPhotos setModalPhoto={setModalPhoto}/>
    </div>
  )
}
