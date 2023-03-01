import { Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import { Episode } from '../providers/api/models/Episode'

interface EpisodeTileProps {
  episode: Episode
}

export function EpisodeTile({ episode }: EpisodeTileProps) {
  return (
    <Col md="6" className="episode-tile" key={episode.id}>
      <div className="container">
        <div className="info">
          <p className='title'>
            {episode.episode} - {episode.name}
          </p>
          <p><small>Air date:</small></p>
          <p className='air-date'>
            {episode.air_date}
          </p>

          <Button>Open detail</Button>
        </div>
      </div>
    </Col>
  )
}
