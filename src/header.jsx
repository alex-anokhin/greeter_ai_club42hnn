import React from 'react';

function Header() {
  return (
    <header>
      <div className="logo">
        <span className="site-name">Greeter</span>
      </div>
      <nav>
        <button className="nav-button">History</button>
        <button className="nav-button">Settings</button>
        <button className="nav-button">Logout</button>
      </nav>
    </header>
  );
}

export default Header;
