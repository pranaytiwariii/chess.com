import { Link } from "react-router-dom";

export const LandingPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <p>You entered landing page</p>
            <Link to="/game">Go to Game</Link>
        </div>
    )
}