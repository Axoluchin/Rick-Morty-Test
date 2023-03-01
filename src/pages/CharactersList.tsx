import { useState } from 'react'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import Row from 'react-bootstrap/Row'

import Header from '../components/Header'
import CharacterTile from '../components/CharacterTile'
import { ApiRoutes, useAxios } from '../providers/api'
import { Character, Page } from '../providers/api/models'

export function CharactersList() {
  const [pagination, setPagination] = useState<{ page: number }>({ page: 1 })

  const [{ data: charactersPage, loading, error }] = useAxios<Page<Character>>(
    {
      url: ApiRoutes.characters(pagination.page),
    },
    {
      useCache: true,
    },
  )

  const setPage = (page: number) => setPagination({ page })

  return (
    <div className="CharactersList">
      <Header status="Character" />

      <Container>
        {loading && <p className="text-info">...loading</p>}
        {error && <p className="text-danger">{error.toString()}</p>}
        {!charactersPage ? (
          <p>No Data found</p>
        ) : (
          <>
            <Row>
              {charactersPage?.results.map((character) => (
                <CharacterTile character={character} key={character.id} />
              ))}
            </Row>
              <ButtonToolbar aria-label="Toolbar with button groups" className='justify-content-center'>
                <ButtonGroup className="me-2" aria-label="First group">
                  {pagination.page > 2 && (
                    <Button
                      variant="secondary"
                      onClick={() => setPage(pagination.page - 2)}
                    >
                      {pagination.page - 2}
                    </Button>
                  )}

                  {pagination.page > 1 && (
                    <Button
                      variant="secondary"
                      onClick={() => setPage(pagination.page - 1)}
                    >
                      {pagination.page - 1}
                    </Button>
                  )}

                  <Button onClick={() => setPage(pagination.page)}>
                    {pagination.page}
                  </Button>

                  {pagination.page < charactersPage.info.pages && (
                    <Button
                      variant="secondary"
                      onClick={() => setPage(pagination.page + 1)}
                    >
                      {pagination.page + 1}
                    </Button>
                  )}

                  {pagination.page < charactersPage.info.pages - 1 && (
                    <Button
                      variant="secondary"
                      onClick={() => setPage(pagination.page + 2)}
                    >
                      {pagination.page + 2}
                    </Button>
                  )}
                </ButtonGroup>
              </ButtonToolbar>
          </>
        )}
      </Container>
    </div>
  )
}
