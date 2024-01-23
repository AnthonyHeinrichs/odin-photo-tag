import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <h1>404: Page does not exist &#128575;</h1>
      <p>
        You can go back to the home page by clicking <Link to="/">here</Link>, though!
      </p>
    </>
  )
}

export default ErrorPage;