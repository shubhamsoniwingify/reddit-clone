import React from 'react'

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            {/* eslint-disable-next-line */}
            <a className="navbar-brand" href="#">
              Reddit
              </a>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header;