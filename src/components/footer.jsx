import React from 'react';

function Footer() {
  const footerStyle = {
    backgroundColor: '#034240',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100px',
    padding: '10px 70px',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    fontFamily:"Roboto Flex",
  };

  const leftStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const logoStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    marginRight: '20px',
  };

  const titleStyle = {
    fontWeight: 'bold',
    fontSize: '24px',
  };

  const rightStyle = {
    marginTop:"0",
    display: 'flex',
    alignItems: 'center',
  };

  const separatorStyle = {
    height: '70px',
    borderRight: '1px solid #fff',
    margin: '0 20px',
  };

  const linkStyle = {
    marginTop:"-40px",
    marginLeft: '20px',
    fontSize: '14px',
    textDecoration: 'none',
    color: '#fff',
  };

  const copyrightStyle = {
    fontSize: '12px',
    textAlign: 'center',
    marginBottom: '-50px'
};

  return (
    <footer style={footerStyle}>
      <div style={leftStyle}>
        <div>
          <div style={titleStyle}>IMA</div>
          <div>Internship</div>
          <div>Management</div>
          <div>App</div>
        </div>
        <div style={separatorStyle}></div>
        <img src="https://yt3.googleusercontent.com/ytc/AGIKgqPTKHZZg9VLuQ0y3zsmnxhR2PNSxUK09GmINc-s=s900-c-k-c0x00ffffff-no-rj" style={logoStyle} alt="logo" />
      </div>
      <div style={copyrightStyle}>© 2023 Agile Turtles</div>
      <div style={rightStyle}>
        <div style={linkStyle}><a href='#' style={{textDecoration:"none", color:"#fff"}}>Info</a></div>
        <div style={linkStyle}><a href='#' style={{textDecoration:"none", color:"#fff"}}>Privacy Policy</a></div>
        <div style={linkStyle}><a href='#' style={{textDecoration:"none", color:"#fff"}}>Term of Use</a></div>
      </div>
    </footer>
  );
}

export default Footer;
