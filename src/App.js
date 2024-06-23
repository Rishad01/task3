import React from 'react';
import './App.css';
import { Card, Container, Image, Row, Col, Overlay } from "react-bootstrap";
import axios from 'axios';
import WOW from 'wowjs';
import person from "./logo.svg";

function Profile(props) {
  React.useEffect(()=>{
    const wow = new WOW.WOW();
    wow.init();
},[]);
  return (
    <Card onClick={(e) => props.onClick(props.items, e.currentTarget)} className="mb-3 WOW bounceInRight">
      <Card.Body>
        <Container>
          <Row>
            <Col xs='auto'>
              <Image style={{ height: '40px', width: '40px' }} src={props.items.avatar || person} alt='Pic' roundedCircle />
            </Col>
            <Col xs='auto'>
              <p>{props.items.profile.firstName} {props.items.profile.lastName}</p>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}

function App() {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [selectedProfile, setSelectedProfile] = React.useState(null);
  const [showOverlay, setShowOverlay] = React.useState(false);
  const [target, setTarget] = React.useState(null);

  React.useEffect(()=>{
    const wow = new WOW.WOW();
    wow.init();
},[]);

  React.useEffect(() => {
    const url = 'https://602e7c2c4410730017c50b9d.mockapi.io/users';

    axios.get(url)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleProfileClick = (profile, target) => {
    setSelectedProfile(profile);
    setTarget(target);
    setShowOverlay(true);
  };
  

  return (
    
      <Container>
        <Row>
          <Col xs="auto" md={4} className=''>
            {data.map((items, index) => (
              <Profile
                key={index}
                items={items}
                onClick={handleProfileClick}
              />
            ))}
          </Col>
        </Row>
        <Overlay target={target} show={showOverlay} placement="right">
          {({ placement, arrowProps, show: _show, popper, ...props }) => (
            <div
               className="WOW bounceInRight" data-wow-delay="1.5s"
              {...props}
              style={{
                ...props.style,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                zIndex: 1000,
                maxWidth: '600px',
                minWidth: '300px', // Adjust width as necessary
                marginLeft: '10px', // Ensure some space from the target element
              }}
            >
              {selectedProfile && (
                <Card>
                  <Card.Body>
                    <Container>
                      <Row className='align-items-center'>
                      <Col xs='auto' md={6}>
                          <Image style={{ height: '100px', width: '100px' }} src={selectedProfile.avatar || person} alt='Pic' roundedCircle />
                        </Col> 
                          <Col md={6}>
                          <h5>{selectedProfile.profile.firstName} {selectedProfile.profile.lastName}</h5>
                          </Col>
                          <Col  md={6}>
                          <strong>Username:</strong><p> {selectedProfile.profile.username  || 'No data to show'}</p>
                          </Col>
                          <Col md={6}>
                          <strong>Email:</strong><p> {selectedProfile.profile.email  || 'No data to show'}</p>
                          </Col>
                          <Col md={6}>
                          <strong>Phone:</strong><p> {selectedProfile.profile.phone  || 'No data to show'}</p>
                          </Col>
                          <Col md={6}>
                          <strong>Bio:</strong><p> {selectedProfile.Bio  || 'No data to show'}</p>
                          </Col>
                          <Col md={6}>
                          <strong>Job Title:</strong><p> {selectedProfile.jobTitle  || 'No data to show'}</p>
                          </Col>
                        
                      </Row>
                    </Container>
                  </Card.Body>
                </Card>
              )}
            </div>
          )}
        </Overlay>
      </Container>
  );
}

export default App;
