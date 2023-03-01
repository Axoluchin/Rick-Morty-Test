import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import axios from 'axios'

import CharacterTile from './CharacterTile'
import { Character } from '../providers/api/models'

interface EpisodeCharacterProps {
  url: string
}

const EpisodeCharacter = ({ url }: EpisodeCharacterProps) => {
  const [character, setCharacter] = useState<Character | undefined | 'Error'>()

  useEffect(() => {
    axios
      .get<Character>(url)
      .then(({ data }) => setCharacter(data))
      .catch(() => setCharacter('Error'))
  }, [])

  if (!character)
    return (
      <Col md="6">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    )

  if (character === 'Error')
    return (
      <Col md="6">
        <p className="text-danger">Character not found</p>
      </Col>
    )

  return <CharacterTile character={character} />
}

export default EpisodeCharacter
