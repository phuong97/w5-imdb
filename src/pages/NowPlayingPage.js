import React, { useState, useEffect } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import PaginationBar from "../component/PaginationBar";
// import { BrowserRouter as Link } from "react-router-dom";
// const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
// const API_URL = process.env.REACT_APP_TMDB_API_URL;
function NowPlayingPage() {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=ec7f0956da9eab0fcf29358ab7a998b4`;
      if (query) {
        url = url + `&q=${query}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    }
    fetchData();
  }, [query]);
  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSearchFormSubmit}>
        <input
          type="text"
          onChange={handleSearchInputChange}
          value={searchInput}
        />
        <input type="submit" value="Search" />
      </form>
      <PaginationBar />
      {movies.map((m) => (
        <div>
          {/* <CardDeck> */}
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={`https://image.tmdb.org/t/p/w500/${m.backdrop_path}`}
            />
            <Card.Body>
              <Card.Title key={m.id}>{m.title}</Card.Title>
              <Card.Text>{m.overview}</Card.Text>
              {/* <Card.Text>
                <b>Release:</b> {m.release_date}
              </Card.Text>
              <Card.Text>
                <b>Rating:</b> {m.vote_average} <b>from</b> {m.vote_count} views
              </Card.Text> */}
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <b>Release:</b> {m.release_date}
              </ListGroupItem>
              <ListGroupItem>
                <b>Rating:</b> {m.vote_average} <b>from</b> {m.vote_count} views
              </ListGroupItem>
            </ListGroup>
            {/* <Link to={`/movies/${m.id}`} key={m.id}>
              <Button variant="primary">View Details</Button>
            </Link> */}
          </Card>
          {/* </CardDeck> */}
        </div>
      ))}
    </div>
  );
}

export default NowPlayingPage;
