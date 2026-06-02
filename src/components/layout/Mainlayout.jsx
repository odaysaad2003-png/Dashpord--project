import React, { useState } from "react";
import {Outlet} from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../../styles/layouts/mainlayout.css";
export default function Mainlayout() {


    const [isSidebarOpen , setisSidebarOpen] = useState(false)

    function openSidbar(){
        setisSidebarOpen(true)
    }
    function closeSidbar(){
        setisSidebarOpen(false)
    }

    return (
        <>
            <div className="app-layout">
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidbar} />
                {isSidebarOpen &&(
                    <div className="sidebar-overlay" onClick={closeSidbar} />
                )}

                <div className="main-area">
                    <Navbar onMenuClick={openSidbar} />

                    <main className="page-content">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}
