import Container from 'react-bootstrap/Container'
import { ApiRoutes, useAxios } from '../providers/api'
import { useParams } from 'react-router-dom'

import EpisodeCharacter from '../components/EpisodeCharacter'
import { Episode } from '../providers/api/models/Episode'

export function EpisodeDetail() {
  const { id } = useParams()
  const [{ data: episode, loading, error }] = useAxios<Episode>({
    url: ApiRoutes.episodeByID(id || '1'),
  })

  if (loading) return <p className="text-info">...loading</p>
  if (error) return <p className="text-danger">{error.toString()}</p>
  if (!episode) return <p className="text-danger">No episode Data </p>

  return (
    <div className="EpisodesList">
      <Container>
        <div className="grid">
          <p>
            {episode.episode} {episode.name}{' '}
          </p>
          <p>Air date: {episode.air_date}</p>

          <p>Characters on this episode:</p>
          <div className="grid">
            {episode.characters.map((characUrl) => (
              <EpisodeCharacter url={characUrl} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}
