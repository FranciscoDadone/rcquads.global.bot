import { Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import '../assets/css/PostCard.css';
import MediaModal from './MediaModal';
import videoImg from '../assets/images/video.png';

function PostCard(props: { post: any, removeFromPostsHandler: any }) {
  const { post, removeFromPostsHandler } = props;

  let previewSrc = `/storage/${post.storage_path}`;

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };

  const handleDelete = () => {
    axios.delete('/api/deletePost', {
      params: {
        post_id: post.post_id,
      },
    });
    removeFromPostsHandler();
  };

  if (post === undefined) return <div />;

  if (post.media_type === 'VIDEO') {
    previewSrc = videoImg;
  }

  return (
    <>
      <div className="cardStyle">
        <Card
          style={{
            width: '18rem',
            height: '29rem',
          }}
          bg="dark"
          border="light"
        >
          <Card.Header className="mb-2">@{post.username}</Card.Header>
          <Card.Body
            className="container"
            style={{ cursor: 'pointer' }}
            onClick={handleShow}
          >
            <Card.Img variant="top" src={previewSrc} />
          </Card.Body>
          <Card.Footer>
            <div className="footer-container">
              <div>
                <small className="text-muted">Fetched: {post.date}</small>
              </div>
              <div className="trashcan">
                <Button variant="danger" onClick={handleDelete}>
                  <img
                    src="https://img.icons8.com/ios-glyphs/25/000000/trash--v1.png"
                    alt="trash can"
                  />
                </Button>
              </div>
            </div>
          </Card.Footer>
        </Card>
      </div>

      <MediaModal
        show={show}
        post={post}
        media={`/storage/${post.storage_path}`}
        mediaType={post.media_type}
        handleClose={() => setShow(false)}
        handleDelete={handleDelete}
      />
    </>
  );
}

export default PostCard;
