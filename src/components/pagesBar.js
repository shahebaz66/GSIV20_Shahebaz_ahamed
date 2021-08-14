import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { UPDATE_DATA, CHANGE_PAGE } from "../redux/actions/types";
import "./bar.css";
import store from "../redux";
const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?api_key=10e825717fc58b46beda9ff9f366870c&";

const Bar = (props) => {
  const currentPage = useSelector((state) => state.movies.page);
  const pages = useSelector((state) => state.movies.availablePages);
  const goToPreviousPage = async () => {
    if (pages.includes(currentPage - 1)) {
      store.dispatch({
        type: CHANGE_PAGE,
        payload: currentPage - 1,
      });
    } else {
      const data = await axios.get(apiUrl + `page=${currentPage - 1}`);
      store.dispatch({
        type: UPDATE_DATA,
        payload: data.data,
      });
    }
  };
  const goToNextPage = async () => {
    if (pages.includes(currentPage + 1)) {
      store.dispatch({
        type: CHANGE_PAGE,
        payload: currentPage + 1,
      });
    } else {
      const data = await axios.get(apiUrl + `page=${currentPage + 1}`);
      store.dispatch({
        type: UPDATE_DATA,
        payload: data.data,
      });
    }
  };
  const changePage = async (page) => {
    if (pages.includes(page)) {
      store.dispatch({
        type: CHANGE_PAGE,
        payload: page,
      });
    } else {
      const data = await axios.get(apiUrl + `page=${page}`);
      store.dispatch({
        type: UPDATE_DATA,
        payload: data.data,
      });
    }
  };
  const getPaginationGroup = () => {
    
      let start = Math.floor((currentPage - 1) / 5) * 5;
      return new Array(5).fill().map((_, idx) => start + idx + 1);
    
  };
  return (
    <div className="pagination">
      <button
        onClick={goToPreviousPage}
        className={`prev ${currentPage === 1 ? "disabled" : ""}`}
      >
        prev
      </button>

      {/* show page numbers */}
      {getPaginationGroup().map((item, index) => (
        <button
          key={index}
          onClick={() => changePage(item)}
          className={`paginationItem ${currentPage === item ? "active" : null}`}
        >
          <span>{item}</span>
        </button>
      ))}

      {/* next button */}
      <button
        onClick={goToNextPage}
        className={`next ${currentPage === pages ? "disabled" : ""}`}
      >
        next
      </button>
    </div>
  );
};

export default Bar;
