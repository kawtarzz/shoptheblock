import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom'
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, ButtonGroup, Input, CardGroup } from "reactstrap"
import { getUser } from "../../modules/userManager";
import { getUserDetailsById } from "../../modules/userManager";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


export default function UserDetails({ user }) {
  const navigate = useNavigate();
  const location = useLocation();



  if (user === null) {
    return <p>Sorry, there is no user with id of {user.id}</p>
  } else {
    return (
      <>
        <Card key={user.id} >
          <CardImg top width="100%" src={user.profilePic} alt="Card image cap" />
          <br></br>
          <CardTitle tag="h">
          </CardTitle>
          <hr></hr>
          <CardBody style={{ alignContent: "center" }}>
            <b>Name:</b>  {user.fullName}
            <br></br>
            <b>Email:</b> {user.email}
          </CardBody>
          <hr></hr>
          <ButtonGroup>
            <Button variant="primary" onClick={() => navigate(`/userprofile/edit/${user.id}`)}>Edit</Button>
            <Button variant="danger" onClick={() => navigate(`/userprofile/delete/${user.id}`)}>Delete My Account</Button>
          </ButtonGroup>
        </Card>
      </>
    )
  }
}