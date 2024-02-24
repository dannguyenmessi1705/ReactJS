import { useEffect, useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = "1cb2b989";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false); // loading là một state để xử lý việc loading khi fetch data, nếu data chưa được fetch thì sẽ hiện loading
  const [error, setError] = useState(null); // error là một state để xử lý việc báo lỗi khi fetch data
  const [selectedId, setSelectedId] = useState(null); // selectedId là một state để xử lý việc hiện thông tin phim đã xem
  const handleSelectMovie = (id) => setSelectedId(selectedId => selectedId === id ? null : id); // handleSelectMovie là một eventHandler để xử lý việc hiện thông tin phim đã xem
  const handleCloseMovie = () => setSelectedId(null); // handleCloseMovie là một eventHandler để xử lý việc đóng thông tin phim đã xem
  useEffect(() => {
    // useEffect sẽ chạy sau khi render xong, nó sẽ mount vào DOM và chạy
    // Nếu không có dependency array thì useEffect sẽ chạy sau mỗi lần render, như vây sẽ gây ra vòng lặp vô hạn
    // Nó khác với eventHandler, eventHandler sẽ chạy khi có sự kiện xảy ra, còn useEffect sẽ chạy sau khi render xong
    const loadMovies = async () => {
      try {
        setLoading(true); // Nếu data chưa được fetch thì sẽ hiện loading
        setError(""); // fetch được data thì sẽ không có lỗi
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
        );
        if (!res.ok) throw new Error("Something went wrong"); // Nếu fetch data bị lỗi thì sẽ throw error (mất mạng, api không hoạt động, ...)
        const data = await res.json();
        setMovies(data.Search); // Các state là hàm bất đồng bộ
        console.log(data.Search); // Sẽ trả về một mảng các phim, nhưng nếu console.log(movies) thì sẽ trả về mảng rỗng
        // vì setMovies là hàm bất đồng bộ nên nó chạy sau khi console.log
      } catch (err) {
        setError(err.message); // Nếu fetch data bị lỗi thì sẽ báo lỗi
      } finally {
        setLoading(false); // Nếu fetch data thành công, hoặc không thì sẽ tắt loading
      }
      if (query.length < 3) {
        setMovies([]);
      }
    };
    loadMovies(); // Nên tạo hàm bất đồng bộ trong useEffect để tránh lỗi
  }, [query]); // [] là dependency array, nếu có thay đổi thì useEffect sẽ chạy lại

  return (
    <>
      <Nav movies={movies} query={query} setQuery={setQuery}>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Nav>
      <Main>
        <Box>
          {loading && <Loader />}{" "}
          {/* Nếu data chưa được fetch thì sẽ hiện loading */}
          {!loading && !error && <MovieList movies={movies} selectMovie={handleSelectMovie}/>}{" "}
          {/* Nếu data đã được fetch và không có lỗi thì sẽ hiện danh sách phim */}
          {error && <ErrorMessage message={error} />}{" "}
          {/* Nếu fetch data bị lỗi thì sẽ báo lỗi */}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails selectedId={selectedId} closeMovie={handleCloseMovie} />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// Component Nav để hiện navbar
const Nav = ({ children }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
};

// Component Logo để hiện logo
const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

// Component MovieList để hiện danh sách phim
const MovieList = ({ movies, selectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} selectMovie={selectMovie}/>
      ))}
    </ul>
  );
};

// Component Movie để hiện thông tin phim
const Movie = ({ movie, selectMovie }) => {
  return (
    <li onClick={() => selectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

// Component WatchedSummary để hiện thông tin phim đã xem
const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const totalRuntime = watched.reduce((acc, cur) => acc + cur.runtime, 0);
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{totalRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

// Component Loader để hiện loading khi data chưa được fetch
const Loader = () => {
  return <p className="loader">Loading...</p>;
};

// Component Error để hiện error khi fetch data bị lỗi
const ErrorMessage = ({ message }) => {
  return (
    <p className="error">
      <span>⛔{message}</span>
    </p>
  );
};

// Component Search để tìm kiếm phim
const Search = ({ query, setQuery }) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

// Component NumResults để hiện số lượng phim tìm kiếm được
const NumResults = ({ movies }) => {
  return (
    movies && // Nếu có movies thì sẽ hiện số lượng phim tìm kiếm được
    <p className="num-results">
      <span>{movies.length}</span> results
    </p>
  );
};

// Component Main để hiện nội dung chính
const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

// Component Box để hiện các box chứa nội dung
const Box = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); // isOpen là một state để xử lý việc mở rộng box
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};

// Component WatchedMoviesList để hiện danh sách phim đã xem
const WatchedMoviesList = ({ watched }) => {
  return (
    <ul className="list">
      {watched?.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
            <p>
              <span>⏱</span>
              <span>{movie.runtime} min</span>
            </p>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Component MovieDetails để hiện thông tin phim đã xem
const MovieDetails = ({ selectedId, closeMovie }) => {
  return (
    <div className="details">
      <button className="btn-back" onClick={closeMovie}>&larr;</button>
      {selectedId}
    </div>
  );
};
