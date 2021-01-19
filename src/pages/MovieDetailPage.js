import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import ModalVideo from "react-modal-video";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;

function MovieDetailPage() {
  const { id } = useParams();
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoKey, setVideoKey] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchData() {
      setLoading(true);
      const url = `${API_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setMovies(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }

    async function fetchVideo() {
      setLoading(true);
      const url = `${API_URL}/movie/${id}/videos?api_key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("video key", data.results[0].key);
      setVideoKey(data.results[0].key);
    }
    fetchVideo();
  }, [id]);

  return (
    <div>
      {!loading && (
        <div className="detail-page-container">
          <Card style={{ width: "18rem" }} key={movies.id}>
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
            />
            <Card.Body>
              <Card.Title>{movies.name}</Card.Title>
              <Card.Text>{movies.original_language}</Card.Text>
              {/* MODAL BUTTON */}
              <Button variant="primary" onClick={() => setModalIsOpen(true)}>
                Trailer
              </Button>

              {/* <Card.Text>{movies.}</Card.Text>
              <Card.Text>{movies.}</Card.Text>
              <Card.Text>{movies.}</Card.Text>
              <Card.Text>{movies.}</Card.Text> */}

              {/* <Link to={`/`}>
                <Button variant="primary">Back</Button>
              </Link> */}
            </Card.Body>
          </Card>
          {/* MODAL */}
          <React.Fragment>
            <ModalVideo
              className="modal-video modal-video-close-btn modal-video-movie-wrap"
              channel="youtube"
              isOpen={modalIsOpen}
              videoId={videoKey}
              allowFullScreen={true}
              onClose={() => setModalIsOpen(false)}
              onRequestClose={() => setModalIsOpen(false)}
            />
            {/* <button
                  className="btn-primary"
                  onClick={() => setModalIsOpen(false)}
                >
                  Close
                </button> */}
          </React.Fragment>
        </div>
      )}
    </div>
  );
}

export default MovieDetailPage;
