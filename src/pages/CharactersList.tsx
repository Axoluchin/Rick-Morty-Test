import { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import { ApiRoutes, useAxios } from '../providers/api'
import { Character, Page } from '../providers/api/models'
import { CharacterTile } from '../components/CharacterTile'

export function CharactersList() {
  const [pagination, setPagination] = useState<{ page: number }>({ page: 1 })

  const [{ data: charactersPage, loading, error }] = useAxios<Page<Character>>({
    url: ApiRoutes.characters(),
  })

  const nextPage = () => {
    setPagination({ page: pagination.page++ })
  }

  return (
    <div className="CharactersList">
      <Container>
        <Button variant="primary">
          <Link to="/episodes" style={{ color: 'white' }}>
            Navigate to episodes
          </Link>
        </Button>

        {loading && <p className="text-info">...loading</p>}
        {error && <p className="text-danger">{error.toString()}</p>}
        <div className="grid">
          {charactersPage?.results.map((character) => (
            <CharacterTile character={character} />
          ))}
        </div>
        <Button onClick={nextPage}>Next page</Button>
      </Container>
    </div>
  )
}
