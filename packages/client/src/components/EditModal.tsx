import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import Media from './Media';

function EditModal(props: {
  showId: string;
  show: boolean;
  post: {
    id: number;
    caption: string;
    media: string;
    mediaType: string;
    owner: string;
  };
  handleClose: any;
  refreshQueue: any;
}) {
  const { show, post, showId, handleClose, refreshQueue } = props;
  const [caption, setCaption] = useState<string>(post.caption);
  const [username, setUsername] = useState<string>(post.owner);
  const [media, setMedia] = useState<string>(post.media);

  if (showId !== post.id.toString()) return <div />;

  const handleDelete = () => {
    axios
      .delete('/api/queue/delete', {
        params: {
          id: post.id,
        },
      })
      .then((code) => {
        if (code.status === 200) {
          handleClose();
          refreshQueue(post, 'DELETE');
        }
      });
  };

  const handleSave = () => {
    handleClose(false);
    axios
      .patch('/api/queue/update_post', {
        data: {
          id: post.id,
          caption,
          username,
        },
      })
      .then(() => {
        handleClose();
        refreshQueue({ id: post.id, caption, username }, 'UPDATE');
      });
  };

  const postProcessUsernameInImg = (usr: string) => {
    if (show && post.mediaType === 'IMAGE') {
      axios
        .get('api/post_process_image/by_id', {
          params: {
            id: post.id,
            username: usr,
          },
        })
        .then((data) => {
          setMedia(data.data);
        });
    }
  };

  if (media === post.media) postProcessUsernameInImg(post.owner);

  return (
    <>
      <Modal show={show} onHide={handleClose} fullscreen className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Queued post from: @{username}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: '#282c34' }}>
          <div className="modal-container">
            <div className="modal-image">
              <Media mediaType={post.mediaType} media={media} autoplay />
              <div style={{ display: 'flex' }}>
                <div>
                  <ul>
                    <li>Owner: {post.owner}</li>
                    <li>ID: {post.id}</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>Type: {post.mediaType}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div style={{ width: '100%', paddingLeft: '1rem' }}>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={post.owner}
                    onChange={(e) => {
                      postProcessUsernameInImg(e.target.value);
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Caption</Form.Label>
                  <Form.Control
                    as="textarea"
                    defaultValue={caption}
                    rows={16}
                    onChange={(e) => setCaption(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSave}>
            Save
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete from queue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
