import React from 'react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import LocalPostOfficeRoundedIcon from '@mui/icons-material/LocalPostOfficeRounded';
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded';

function Header(props) {
  const headerStyle = {
    marginTop:"20px",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    height: '60px',
    padding: '0 20px',
  };

  const leftStyle = {
    fontWeight: 'bold',
  };

  const rightStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const messageStyle = {
    marginRight: '20px',
  };

  const notificationStyle = {
    marginRight: '20px',
  };

  const userInfoStyle = {
    marginRight:"14px",
    display: 'flex',
    alignItems: 'center',
  };

  const avatarContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginLeft: "20px"
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginLeft: '10px',
    objectFit: 'cover',
  };

  const nameStyle = {
    fontFamily:"Roboto Flex",
    fontSize:"20px",
    marginTop:"10px",
    fontWeight: 'bold',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const idStyle = {
    color: '#999',
    marginLeft: '10px',
    fontSize: '15px',
    fontWeight: 'normal',
  };

  return (
    <header style={headerStyle}>
      <div style={leftStyle}></div>
      <div style={rightStyle}>
        <div style={messageStyle}>
          <IconButton>
            <LocalPostOfficeRoundedIcon style={{ color: '#333' }} />
          </IconButton>
        </div>
        <div style={notificationStyle}>
          <IconButton>
            <NotificationsIcon style={{ color: '#333' }} />
          </IconButton>
        </div>
        <div style={userInfoStyle}>
          <div style={nameStyle}>
            {props.userName}
            <div style={idStyle}>{props.userId}</div>
          </div>
          <div style={avatarContainerStyle}>
            <img style={avatarStyle} src={props.avatarUrl} alt="photo" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
