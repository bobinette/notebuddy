import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const NavBar = () => (
  <div className="navbar">
    <div className="navbar-container flex flex-v-center flex-space text-lg">
      <div>
        <Link href="/">
          <button type="button" className="btn btn-link">
            note buddy
          </button>
        </Link>
      </div>
      <div>
        <a href="https://github.com/bobinette/notebuddy">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
    </div>
  </div>
);

export default NavBar;
