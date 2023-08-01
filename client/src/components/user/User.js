import { useState } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../../modules/userManager";
import { Button, Card, CardTitle } from "reactstrap";


const User = ({ user }) => {
  const [displayDeactivateButton, setDisplayDeactivateButton] = useState(true);



  const handleDeactivate = () => {
    e.preventDefault();
    user.activated = false;
    updateUser(user).then(setDisplayDeactivateButton(true).then(getUsers));
  };

  const handleActivate = () => {
    e.preventDefault();
    user.activated = true;
    updateUser(user).then(setDisplayDeactivateButton(false).then(getUsers));
  };

  const handleDelete = () => {
    e.preventDefault();
    user.activated = false;
    updateUser(user).then(setDisplayDeactivateButton(true).then(getUsers));
  };


  if (user.activated) {
    return <tr>
      <CardTitle tag="h5">{user.fullName}</CardTitle>
      <CardSubtitle tag="h6" className="mb-2 text-muted">{user.email}</CardSubtitle>
      <CardImg top width="100%" src={user.profilePic} alt="Card image cap" />
      <Button color="primary" size="x-sm" onClick={() => navigate(`/user/details/${user.id}`)}>Details</Button>
      <Button color="primary" size="x-sm" onClick={() => navigate(`/user/edit/${user.id}`)}>Edit</Button>

      <td>{displayDeactivateButton ? <Button onClick={() => { setDisplayDeactivateButton(false) }}>Deactivate</Button>
        : <>Are you sure?<Button onClick={handleDeactivate}>Yes</Button>
          <Button onClick={() => { setDisplayDeactivateButton(true) }}>No</Button></>}</td>
    </tr>
  } else {
    return <tr>
      <td><Link to={`${user.id}`}>{user.fullName}</Link></td>
      <td>{user.fullName}</td>
      <td><Button onClick={handleActivate}>Reactivate</Button></td>
    </tr>
  };
};

export default User;
