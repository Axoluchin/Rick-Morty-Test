import { useState, useEffect } from 'react'
import Col from 'react-bootstrap/Col'
import axios from 'axios'

import { Character, Episode } from '../providers/api/models'

interface CharacterTileProps {
  character: Character
}

export function CharacterTile({ character }: CharacterTileProps) {
  const [Episode, setEpisode] = useState<string | undefined>()

  useEffect(() => {
    axios
      .get<Episode>(character.episode[0])
      .then(({ data }) => setEpisode(data.name))
      .catch(() => setEpisode('Not Found'))
  }, [character])

  const setColor = {
    Alive: '#75c850',
    Dead: 'red',
    unknown: 'yellow',
  }
  return (
    <Col md="6" className="character-tile" key={character.id}>
      <div className="character-container">
        <img src={character.image} />
        <div className="info">
          <h4>{character.name}</h4>
          <p>
            <small>
              <span style={{ color: setColor[character.status] }}>●</span>{' '}
              {character.status} - {character.species}
            </small>
          </p>
          <p>
            <small>Last known location:</small>
            <br />
            {character.location.name}
          </p>
          <p>
            <small>First seen in:</small>
            <br />
            {Episode?.split('#')[0] || 'Loading...' }
          </p>
        </div>
      </div>
    </Col>
  )
}
