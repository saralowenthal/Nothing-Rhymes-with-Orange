import { useParams } from 'react-router-dom'

export default function Details() {
  const { id } = useParams()

  return (
    <div>
      <h2>Palette Details for ID: {id}</h2>
      {/* Later: fetch + show colors */}
    </div>
  )
}
