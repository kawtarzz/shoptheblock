import { useState } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../modules/userManager";

const User = ({ user, getUsers }) => {
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

  if (user.activated) {
    return <tr>
      <td><Link to={`/user/details/${user.id}`}>{user.fullName}</Link></td>
      <td>{user.email}</td>
      <td>{displayDeactivateButton ? <button onClick={() => { setDisplayDeactivateButton(false) }}>Deactivate</button>
        : <>Are you sure?<button onClick={handleDeactivate}>Yes</button>
          <button onClick={() => { setDisplayDeactivateButton(true) }}>No</button></>}</td>
    </tr>
  } else {
    return <tr>
      <td><Link to={`${user.id}`}>{user.fullName}</Link></td>
      <td>{user.fullName}</td>
      <td><button onClick={handleActivate}>Reactivate</button></td>
    </tr>
  };
};

export default User;
