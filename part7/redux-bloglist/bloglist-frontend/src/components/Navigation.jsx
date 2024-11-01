import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navigation = ({ user, handleLogout }) => {
  const link = {
    padding: '10px',
    textDecoration: 'none',
    color: 'white',
  };
  
  const navbarStyle = {
    marginBottom: '10px',
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={navbarStyle}>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      
        <Nav className="me-auto">
          <Nav.Link as="span">
            <Link style={link} to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link as="span">
            <Link style={link} to="/users">Users</Link>
          </Nav.Link>
        </Nav>
        
        
        <Nav className="ms-auto">
          <Nav.Link as="span">
            {user && (
              <>
                {user.name} logged in
                <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
              </>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
