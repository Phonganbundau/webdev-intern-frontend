import React from "react";
import Top10KhoiA from "../components/User/Top10KhoiA.js";

import Sidebar from '../components/Sidebar';

const Top10KhoiAScreen = () => {
    return (
        <>
            <Sidebar />
            <main className="main-wrap">
                <Top10KhoiA />
            </main>
        </>
    );
};

export default Top10KhoiAScreen;
