import React, { useState, useEffect } from "react";
import { Card, CardDeck, ListGroup, ListGroupItem } from "react-bootstrap";
import PaginationBar from "../component/PaginationBar";
// import { BrowserRouter as Link } from "react-router-dom";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = process.env.REACT_APP_TMDB_API_URL;
function NowPlayingPage({ type }) {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNum, setPageNum] = useState(1);
  const [filterMovies, setFilterMovies] = useState([]);
  const limit = 20;
  const [totalPageNum, setTotalPageNum] = useState(1);
  const [sortMovies, setSortMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let endpoint = "now_playing";
      if (type === "top_rated") {
        endpoint = "top_rated";
      }
      if (type === "upcoming") {
        endpoint = "upcoming";
      }
      // let url = `https://api.themoviedb.org/3/movie/${endpoint}?api_key=ec7f0956da9eab0fcf29358ab7a998b4&page=${pageNum}`;
      let url = `${API_URL}/movie/${endpoint}?api_key=${API_KEY}&page=${pageNum}`;
      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
      setFilterMovies(data.results);
      setTotalPageNum(data.total_pages);
    }
    fetchData();
  }, [type, pageNum]);

  // const handleSearchFormSubmit = (e) => {
  //   e.preventDefault();
  //   setQuery(searchInput);
  // };
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleChangePage = (page) => {
    setPageNum(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    let newMovies = movies.filter((m) =>
      m.title.toLowerCase().startsWith(searchInput.toLowerCase())
    );
    setFilterMovies(newMovies);
  }, [searchInput, movies]);
  return (
    <div>
      <form>
        <input
          type="text"
          onChange={handleSearchInputChange}
          value={searchInput}
        />
        <input type="submit" value="Search" />
      </form>
      <PaginationBar
        currentPage={currentPage}
        totalPageNum={totalPageNum}
        limit={limit}
        click={handleChangePage}
      />
      <CardDeck>
        {filterMovies.map((m) => (
          <div>
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
                  <b>Rating:</b> {m.vote_average} <b>from</b> {m.vote_count}{" "}
                  views
                </ListGroupItem>
              </ListGroup>
              {/* <Link to={`/movies/${m.id}`} key={m.id}>
              <Button variant="primary">View Details</Button>
            </Link> */}
            </Card>
          </div>
        ))}
      </CardDeck>
      {sortMovies.sort((a, b) => (
        <div>
          <Card>
            <Card.Body>
              <Card.Text>{a.popularity - b.popularity}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default NowPlayingPage;
