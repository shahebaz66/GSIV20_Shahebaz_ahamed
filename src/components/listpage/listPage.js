import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../loader";
import Bar from "../pagesBar";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import axios from "axios";
import cogoToast from "cogo-toast";


function ListPage() {
  const [movieList, setList] = useState([]);
  const [showBar, setShowBar] = useState(true);
  const loader = useSelector((state) => state.movies.loader);
  const movies = useSelector((state) => state.movies.movies);
  const page = useSelector((state) => state.movies.page);
  useEffect(() => {
    const temp = movies.filter((i) => i.page === page);
    if (temp.length > 0) {
      setList(temp[0].list);
      window.scrollTo({ behavior: "smooth", top: "0px" });
    }
  }, [page]);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const data = e.target.value.replaceAll(" ", "+");
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=10e825717fc58b46beda9ff9f366870c&query=${data}`
        )
        .then((result) => {
          console.log(result);
          if (result.data.results.length > 0) {
            setList(result.data.results);
            setShowBar(false);
          } else {
            cogoToast.warn("Could not find anything with given input!", {
              position: "top-right",
            });
          }
        });
    }
  };
  return (
    <div className="container mt-5">
      <div
        className="card border-0"
        style={{ boxShadow: "0 2px 2px 0 rgba(0,0,0,0.2)" }}
      >
        <div className="card-body d-flex justify-content-between">
          <input
            style={{ width: "40%" }}
            type="search"
            className="form-control ds-input"
            placeholder={"Search..."}
            onKeyPress={(e) => handleKeyPress(e)}
          />
          
          <Link to={`/`} style={{ color: "inherit", textDecoration: "none" }}>
            <HomeIcon />
          </Link>
        </div>
      </div>

      {loader ? (
        <Loader />
      ) : (
        <div className="row">
          {movieList.map((i, index) => {
            return (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 mt-5">
                <Link
                  to={`/details/${i.id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <div className="card">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${i.poster_path}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title">{i.original_title}</h5>
                        <p>{i.vote_average}</p>
                      </div>

                      <p
                        className="card-text text-truncate"
                        style={{ maxHeight: "150px" }}
                      >
                        {i.overview}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
      {showBar ? <Bar /> : null}
    </div>
  );
}

export default ListPage;
