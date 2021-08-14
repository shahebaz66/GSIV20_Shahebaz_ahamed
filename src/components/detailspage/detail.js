import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "react-router-dom";

const Detail = (props) => {
  const [data, setData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=10e825717fc58b46beda9ff9f366870c`
      )
      .then((result) => {
        setData(result.data);
      });
  }, []);
  return (
    <div className="container mt-5">
      <div
        className="card border-0"
        style={{ boxShadow: "0 2px 2px 0 rgba(0,0,0,0.2)" }}
      >
        <div className="card-body d-flex justify-content-between">
          <h5>Movie Details</h5>
          <Link to={`/`} style={{ color: "inherit", textDecoration: "none" }}>
            <HomeIcon />
          </Link>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-3">
          <img
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            className="card-img-top"
            alt="..."
          />
        </div>
        <div className="col-lg-9 mt-2">
          <div className="">
            <h4>{data.title}</h4>
            <h6>rating : {data.vote_average}</h6>
          </div>
          <div>{data.release_date}</div>
          <div className="mb-2 mt-2">{data.overview}</div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
