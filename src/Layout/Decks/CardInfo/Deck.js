import React, { useEffect, useState } from "react";
import { readDeck } from "../../../utils/api";
import { deleteDeck } from "../../../utils/api";


function Deck() {
  const [deck,setDeck] = useState({});
  
  useEffect(() => {
    readDeck(deckId).then
  })
}