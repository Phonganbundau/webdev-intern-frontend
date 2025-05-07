import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import profile from '../images/score.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRankingStar,
  faBarChart,
  faSun,
  faBars,
  faSignOut,
  faMagnifyingGlass,
  faSignIn
} from '@fortawesome/free-solid-svg-icons';
import '../css/Sidebar.css';

const Sidebar = () => {


  useEffect(() => {
    const handleSidebarOpen = () => {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.toggle('close');
    };

    const handleSidebarClose = () => {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.add('close', 'hoverable');
    };

    const handleSidebarExpand = () => {
      const sidebar = document.querySelector('.sidebar');
      sidebar.classList.remove('close', 'hoverable');
    };

    const handleDarkLightToggle = () => {
      const body = document.querySelector('body');
      body.classList.toggle('dark');
    };

    const submenuItems = document.querySelectorAll('.submenu_item');

    const handleSubmenuItemToggle = (event) => {
      const clickedItem = event.target;
      submenuItems.forEach((item) => {
        if (item !== clickedItem) {
          item.classList.remove('show_submenu');
        }
      });
      clickedItem.classList.toggle('show_submenu');
    };

    const handleWindowResize = () => {
      const sidebar = document.querySelector('.sidebar');
      if (window.innerWidth < 768) {
        sidebar.classList.add('close');
      } else {
        sidebar.classList.remove('close');
      }
    };


    const darkLight = document.querySelector('#darkLight');
    const sidebarOpen = document.querySelector('#sidebarOpen');
    const sidebarClose = document.querySelector('.collapse_sidebar');
    const sidebarExpand = document.querySelector('.expand_sidebar');
    const sidebar = document.querySelector('.sidebar');

    sidebar.addEventListener("mouseenter", () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.remove("close");
      }
    });
    sidebar.addEventListener("mouseleave", () => {
      if (sidebar.classList.contains("hoverable")) {
        sidebar.classList.add("close");
      }
    });
    sidebarOpen.addEventListener('click', handleSidebarOpen);
    sidebarClose.addEventListener('click', handleSidebarClose);
    sidebarExpand.addEventListener('click', handleSidebarExpand);
    darkLight.addEventListener('click', handleDarkLightToggle);
    submenuItems.forEach((item) => {
      item.addEventListener('click', handleSubmenuItemToggle);
    });

    window.addEventListener('resize', handleWindowResize);

    return () => {
      sidebarOpen.removeEventListener('click', handleSidebarOpen);
      sidebarClose.removeEventListener('click', handleSidebarClose);
      sidebarExpand.removeEventListener('click', handleSidebarExpand);
      darkLight.removeEventListener('click', handleDarkLightToggle);
      submenuItems.forEach((item) => {
        item.removeEventListener('click', handleSubmenuItemToggle);
      });
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="logo_item">
          <FontAwesomeIcon icon={faBars} id="sidebarOpen" />
          <img src={profile} alt="" />
          G-Scores
        </div>


        <div className="navbar_content">
          <FontAwesomeIcon icon={faSun} id="darkLight" />
        </div>
      </nav>

      <nav className="sidebar">
        <div className="menu_content">
          <ul className="menu_items">
            <li className="item">
              <Link to="/score-chart" className="nav_link">
                <span className="navlink_icon">
                  <FontAwesomeIcon icon={faBarChart} />
                </span>
                <span className="navlink">Phân Bố Điểm</span>
              </Link>
            </li>

            <li className="item">
              <Link to="/search-score" className="nav_link">
                <span className="navlink_icon">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <span className="navlink">Tra Cứu Điểm</span>
              </Link>
            </li>


            <li className="item">
              <Link to="/top-10-khoi-a" className="nav_link">
                <span className="navlink_icon">
                  <FontAwesomeIcon icon={faRankingStar} />
                </span>
                <span className="navlink">Top 10 Khối A</span>
              </Link>
            </li>


          </ul>

          <div className="bottom_content">
            <div className="bottom expand_sidebar">
              <span>Mở Rộng</span>
              <FontAwesomeIcon icon={faSignIn} />
            </div>
            <div className="bottom collapse_sidebar">
              <span>Thu Lại</span>
              <FontAwesomeIcon icon={faSignOut} />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
