import { useState } from "react";
import imageichigo from "../image/ichigo.gif";
import imagekempachi from "../image/image-removebg-preview (1).png";
import imageaizen from "../image/image-removebg-preview.png"


function Combat() {
  const [character, setCharacter] = useState(null);
  const [opponentCharacter, setOpponentCharacter] = useState(null);

  const characters = [
    { 
      name: 'Ichigo Kurosaki', 
      health: 100,
      techniques: [{'name': 'Getsuga Tenshō', 'dégat': 20}, {'name': 'Bankai: Tensa Zangetsu', 'dégat': 45}, {'name': 'Fullbring: Fullbring', 'dégat': 25}],
      image: imageichigo
    },
    { 
      name: 'Kenpachi Zaraki', 
      health: 100,
      techniques: [{'name': 'Nozarashi', 'dégat': 25}, {'name': 'Kendo', 'dégat': 45}, {'name': 'Thunderous Thrust', 'dégat': 20}],
      image: imagekempachi
    },
    { 
      name: 'Sōsuke Aizen', 
      health: 100,
      techniques: [{'name': 'Kyōka Suigetsu', 'dégat': 25}, {'name': 'Hōgyoku', 'dégat': 45}, {'name': 'Kurohitsugi', 'dégat': 20}],
      image: imageaizen
    },
    
  ];

  const handleCharacterChange = (event) => {
    const selectedCharacter = characters.find(character => character.name === event.target.value);
    setCharacter(selectedCharacter);
  };

  const handleOpponentCharacterChange = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const selectedOpponentCharacter = characters[randomIndex];
    setOpponentCharacter(selectedOpponentCharacter);
  };

  const handleTechniqueClick = (technique) => {
    if (opponentCharacter) {
      const dégat = technique.dégat;
      setOpponentCharacter((prevOpponent) => {
        let newHealth = prevOpponent.health - dégat;
        if (newHealth < 0) {
          newHealth = 0;
        }
        if (newHealth === 0) {
          alert('Tu as gagné');
        }
        return {
          ...prevOpponent,
          health: newHealth,
        };
      });

      setTimeout(() => {
        const randomTechniqueIndex = Math.floor(Math.random() * character.techniques.length);
        const opponentTechnique = character.techniques[randomTechniqueIndex];
        const opponentDégat = opponentTechnique.dégat;
        setCharacter((prevCharacter) => {
          let newHealth = prevCharacter.health - opponentDégat;
          if (newHealth < 0) {
            newHealth = 0;
          }
          if (newHealth === 0) {
            alert('Tu as perdu');
          }
          return {
            ...prevCharacter,
            health: newHealth,
          };
        });
      }, 1000);
    } else {
      alert('Choisissez un personnage pour l\'autre avant de commencer');
    }
  };

  return (
    <div className="combat-container">
      <div className="character-section" id="selectionpersonnage">
        <select onChange={handleCharacterChange}>
          <option>Choisissez un personnage</option>
          {characters.map((character, index) => (
            <option key={index} value={character.name}>
              {character.name}
            </option>
          ))}
        </select>

        {character && (
          <div>
            <img src={character.image} alt={character.name} id="perso" />
            <h3 className="character-text">Votre personnage : {character.name}</h3>
            <p className="health-text-green">Health: {character.health}</p>
            {character.techniques.map((technique, index) => (
              <button key={index} onClick={() => handleTechniqueClick(technique)}>
                {technique.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="character-section">
        <button onClick={handleOpponentCharacterChange}>
          L'ordinateur choisit
        </button>

        {opponentCharacter && (
          <div>
            <img src={opponentCharacter.image} alt={opponentCharacter.name} />
            <h3 className="opponent-text-color">Personnage de l'opposant : {opponentCharacter.name}</h3>
            <p className="opponent-health-text-red">Health: {opponentCharacter.health}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Combat;
