import React, { useState, useContext } from "react";
import { ACTIONS } from "../reducers/reducer";

import PlaylistContext from "../contexts/PlaylistContext";

export default function Song({ song, index }) {
  const { dispatch } = useContext(PlaylistContext);
  const [liked, setLiked] = useState(song.liked);
  // envoyer une demande de modification au serveur et mettre l'interface à jour.
  const api = useContext(PlaylistContext).api;
  const toggleLike = () => {
    setLiked(liked ? false : true);
    api.updateSong(song.id);
  };

  // envoyer une action PLAY avec le bon index au reducer.
  const playSong = () => { dispatch({ type: ACTIONS.PLAY, payload: { index: index - 1 } }) };
  return (
    <section
      className="song-item flex-row"
      tabIndex={0} // Add tabIndex attribute to make it focusable
      onClick={() => {
        if (index != undefined) {
          playSong()
        }
      }}
    >
      {index ? <span>{index}</span> : <></>}
      {/*ajouter les bonnes informations de la chanson */}
      <p>{song.name}</p>
      <p>{song.genre}</p>
      <p>{song.artist}</p>

      {/*modifier le statut aimé seulement si index n'existe pas */}
      <button
        className={`${liked ? "fa" : "fa-regular"} fa-2x fa-heart`}
        onClick={index ? () => { } : toggleLike}
      ></button>
    </section>
  );
}