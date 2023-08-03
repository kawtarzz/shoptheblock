import React from 'react';
import { Link } from 'react-router-dom';
import { CardFooter, CardHeader, Card } from 'reactstrap';
import { CardTitle } from 'reactstrap';


export const Footer = () => {
  return (
    <Card>
      <CardFooter>
        <b>Shop the Block</b>
        <div className="row d-flex justify-content-end">
          <div className="col-xs-12 col-sm-8 col-lg-4">
            <Link to="/about" className="text-muted" > About Us </Link>
          </div>
          <div className="col-xs-12 col-sm-8 col-lg-4">
            <Link to="/contact" className="text-muted"> Contact Us </Link>
          </div>
          <div className="col-xs-12 col-sm-8 col-lg-4">
            <Link to="/faq" className="text-muted"> FAQ </Link>
          </div>
        </div>

        <div className="row d-flex justify-content-end">
          <div className="col-xs-12 col-sm-8 col-lg-4">
            <Link to="/terms" className="text-muted"> Terms and Conditions </Link>
          </div>
          <div className="col-xs-12 col-sm-8 col-lg-4">
            <Link to="/privacy" className="text-muted"> Privacy Policy </Link>
          </div>
          <div className="col-xs-12 col-sm-8 col-lg-4">
            <Link to="/shipping" className="text-muted"> Shipping & Returns </Link>
          </div>
        </div>
      </CardFooter>
    </Card >
  );
}