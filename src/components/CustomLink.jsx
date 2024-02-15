import { useNavigate } from 'react-router-dom'

function CustomLink({ dest, content, setExit }) {
  const navigate = useNavigate()

  const handleDelayedLinkClick = (to, delay) => (event) => {
    event.preventDefault()
    setExit(true)
    setTimeout(() => {
      navigate(to)
    }, delay)
  }

  return (
    <div className='link' onClick={handleDelayedLinkClick(dest, 1000)}>
      {content}
    </div>
  )
}

export default CustomLink
