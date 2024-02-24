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
      if(query.length < 3){
        setMovies([])
      }
    };
    loadMovies(); // Nên tạo hàm bất đồng bộ trong useEffect để tránh lỗi
  }, [query]); // [] là dependency array, nếu có thay đổi thì useEffect sẽ chạy lại

  return (
    <>
      <Nav movies={movies} query={query} setQuery={setQuery}>
        <Search query={query} setQuery={setQuery}/>
        {/* <NumResults movies={movies} /> */}
      </Nav>
      <main className="main">
        <div className="box">
          <MovieList loading={loading} error={error} movies={movies} />
        </div>

        <div className="box">
          <>
            <Summary movies={movies} />
            <MovieList2 movies={movies} />
          </>
        </div>
      </main>
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
const MovieList = ({ loading, error, movies }) => {
  return (
    <ul className="list">
      {!loading &&
        !error && // Nếu không có loading và error thì sẽ hiện movies
        movies?.map((movie) => (
          <li key={movie.imdbID}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </div>
          </li>
        ))}
      {loading && <Loader />} {/* Nếu loading thì sẽ hiện loading */}
      {error && <ErrorMessage message={error} />}{" "}
      {/* Nếu error thì sẽ hiện error */}
    </ul>
  );
};

// Component MovieList2
const MovieList2 = ({ movies }) => {
  return (
  movies &&
    <ul className="list">
      {movies.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};

// Component Summary
const Summary = ({ movies }) => {
  return (
  movies &&
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{movies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{0}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{0}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{0} min</span>
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
const Search = ({query, setQuery}) => {
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

