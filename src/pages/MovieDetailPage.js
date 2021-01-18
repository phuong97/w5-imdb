import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;

function MovieDetailPage() {
  const { id } = useParams();
  const [movies, setMovies] = useState({});
  const [loading, setLoading] = useState(true);

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
  // console.log(`https://image.tmdb.org/t/p/original/${movies.backdrop_path}`);
  return (
    <div>
      {!loading && (
        <div>
          <Card style={{ width: "18rem" }} key={movies.id}>
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/original${movies.backdrop_path}`}
            />
            <Card.Body>
              <Card.Title>{movies.name}</Card.Title>
              <Card.Text>{movies.original_language}</Card.Text>
              <Button variant="primary" onClick={handleShow}>
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
        </div>
      )}
    </div>
  );
}

export default MovieDetailPage;
