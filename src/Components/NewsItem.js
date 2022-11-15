import React, { Component } from "react";
import logo from "./Assets/Images/logo.svg";
import Tooltip from "@mui/material/Tooltip";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl,date } = this.props;

    return (
      <div className="card">
        <img
          src={imageUrl ? imageUrl : logo}
          className="card-img-top"
          alt="..."
          height={"200px"}
        />
        <div className="card-body">
          <Tooltip title={title} placement="top">
            <h5 className="card-title">
              {title ? title.slice(0, 65) : title}...
            </h5>
          </Tooltip>

          <p className="card-text">
            {description ? description.slice(0, 90) : description}...
          </p>
          <a
            href={newsUrl}
            target="_blank"
            className="btn btn-sm text-center btn-danger"
            style={{ width: "100%" }}
            rel="noreferrer"
          >
            Read More
          </a>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: "90%"}}>
    {new Date(date).toDateString()}
  </span>
        </div>
      </div>
    );
  }
}

export default NewsItem;
