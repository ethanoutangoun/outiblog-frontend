import * as React from 'react';
import Popover from '@mui/material/Popover';


export default function ProfilePopover({data}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='profile-container'>
      <img  onClick={handleClick} className="profile-picture" src={data.image} width={30} height={30} alt="" draggable={false}/>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
       <div className="popover-content">
        <h3>{data.name}</h3>
        <p>@{data.username}</p>
       </div>
      </Popover>
    </div>
  );
}
