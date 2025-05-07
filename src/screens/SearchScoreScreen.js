import React from "react";
import SearchScore from "../components/User/SearchScore.js";

import Sidebar from '../components/Sidebar';

const SearchScoreScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <SearchScore />
            </main>
        </>
    );
};

export default SearchScoreScreen;
