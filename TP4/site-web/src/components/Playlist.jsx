import React from "react";
import { SERVER_URL } from "../assets/js/consts";
import { NavLink } from "react-router-dom";

export default function Playlist({ playlist }) {
  return (
    <NavLink
      className="playlist-item flex-column"
      to={`/playlist/${playlist.id}`}
    >
      <div className="playlist-preview">
        {/*TODO : ajouter l'image de la playlist */}
        <img alt="" src={`${SERVER_URL}/${playlist.thumbnail}`} />
        <i className="fa fa-2x fa-play-circle hidden playlist-play-icon"></i>
      </div>
      {/*TODO : ajouter les informations de la playlist */}
      <p>{playlist.name}</p>
      <p>{playlist.description}</p>
    </NavLink>
  );
}