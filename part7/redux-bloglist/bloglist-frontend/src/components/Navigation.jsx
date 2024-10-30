import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = ({ user , handleLogout }) => {
  const padding = {
    padding: '10px',
  };
  const navbarStyle = {
    backgroundColor: '#808080', 
    marginBottom:'10px',
  };

  return (
    <Navbar collapseOnSelect expand="lg" style={navbarStyle} >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as="span">
            <Link style={padding} to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link as="span">
            <Link style={padding} to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link as="span">
            {user !== null && <>
              {user.name} logged in
              <button onClick={handleLogout}> Logout</button>
            </> }
          </Nav.Link>
       
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
