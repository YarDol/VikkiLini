import { Link } from "react-router-dom"

const page404Styles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
    textAlign: "center",
  };

const Page404 = () => {

    return (
        <div style={page404Styles}>
            <p>Oops... Something seems to have gone wrong. This page does not exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px', 'marginTop': '30px'}} to="/">Back to main page</Link>
        </div>
    )
}

export default Page404;