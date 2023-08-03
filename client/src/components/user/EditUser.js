import { useState } from "react";
import { Link } from "react-router-dom";
import { updateUser } from "../../modules/userManager";
import { Button, Card, CardTitle } from "reactstrap";


const EditUser = ({ user }) => {
  const [userProfile, setUserProfile] = useState(user);
  const id = user.id;

  const getUserDetailsById = (id) => {
    getUserDetailsById(id).then(setUserProfile);
  };



  const handleDelete = () => {
    e.preventDefault();
    user.activated = false;
    updateUser(user).then(setDisplayDeactivateButton(true).then(getUsers));
  };

  return (
    <>
      <Card key={userProfile.id}>
        <CardTitle tag="h1">Edit User</CardTitle>
        <form>
          <fieldset>
            <div className="formgrid">
              <label htmlFor="fullName">Full Name: </label>
              <input
                type="text"
                id="fullName"
                onChange={handleFieldChange}
                required
                autoFocus
                className="form-control"
                placeholder="Full Name"
                value={userProfile.fullName}
              />
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                id="email"
                onChange={handleFieldChange}
                required
                autoFocus
                className="form-control"
                placeholder="Email"
                value={userProfile.email}
              />
              <label htmlFor="password">Password: </label>
              <input
                type="text"
                id="password"
                onChange={handleFieldChange}
                required
                autoFocus
                className="form-control"
                placeholder="Password"
                value={userProfile.password}
              />
              <label htmlFor="profilePic">Profile Picture: </label>
              <input
                type="text" id="profilePic"
                onChange={handleFieldChange}
                required autoFocus className="form-control"
                placeholder="Profile Picture"
                value={userProfile.profilePic}
              />
            </div>
            <div className="alignRight">
              <Button
                color="primary"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  history.push(`/userprofile/${userProfile.id}`);
                }}
              >
                Cancel
              </Button>
            </div>
          </fieldset>

        </form>

      </Card>
    </>
  );
};



export default User;
