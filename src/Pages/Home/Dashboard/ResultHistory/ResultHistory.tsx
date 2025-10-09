import React, { useEffect } from "react";

import ResultItem from "./ResultItem";
import "./ResultHistory.css"; // General app styles
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../State/Store";
import { fetchResultHstory } from "../../../../State/ResultHistorySlice";
import { useSelector } from "react-redux";
import Sidebar from "../../../../Components/Sidebar";
// import Navbar2 from "../../../../Components/ui/Navbar/Navbar2";

const ResultHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const resultsHistory = useSelector(
    (state: RootState) => state.resultHistory?.data?.test_sessions
  );
  // console.log(resultsHistory);
  const loading = useSelector(
    (state: RootState) => state.resultHistory.loading
  );
  const error = useSelector((state: RootState) => state.resultHistory.error);

  useEffect(() => {
    dispatch(fetchResultHstory());
  }, []);
  return (
    <div className="flex">
      <Sidebar />
      {loading ? (
        <h2 style={{ textAlign: "center", paddingTop: "5px" }}>Loading...</h2>
      ) : !loading && error ? (
        <h2>Something went wrong, check internet connection</h2>
      ) : (
        <div className="app w-full max-h-screen overflow-y-scroll">
          <span className="back-arrow" onClick={() => window.history.back()}>
            ←
          </span>

          <main className="result-history">
            {resultsHistory?.length === 0 ? (
              <h2>No results for you yet, try completing a test session.</h2>
            ) : (
              resultsHistory?.map((result: any, index: any) => (
                <ResultItem key={index} {...result} />
              ))
            )}
          </main>
        </div>
      )}
    </div>
  );
};

export default ResultHistory;
