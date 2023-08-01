import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup, Input } from "reactstrap"
import { getUser } from "../../modules/userManager";
import { getUserDetailsById } from "../../modules/userManager";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function UserDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const { id } = useParams(), [user, setUser] = useState({});


  useEffect(() => {
    getUserDetailsById(id).then(setUser);
    console.log("user", user)
  }, []);

  if (user === null) {
    return <p>Sorry, there is no user with id of {id}</p>
  } else {
    return (
      <>
        <Card key={user.id} >
          <Button color="primary" size="x-sm" onClick={() => navigate(`/`)}>Back to Shop</Button>
          <CardTitle tag="h5">{user.fullName}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{user.email}</CardSubtitle>
          <Button color="primary" size="x-sm" onClick={() => navigate(`/user/edit/${user.id}`)}>Edit</Button>

          <CardImg top width="100%" src={user.profilePic} alt="Card image cap" />

        </Card>
      </>


    )
  }
}