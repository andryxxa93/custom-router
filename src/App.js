import './App.css';
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import About from "./pages/About";
import {createContext, useContext, useEffect, useState} from "react";
import {ownHistory} from "./history";

const RouterContext = createContext({ currentPath: window.location.pathname });

const Router = ({ children }) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        return ownHistory.listen((targetLocation) => setCurrentPath(targetLocation))
    }, [])

    return (
        <RouterContext.Provider value={{currentPath, setCurrentPath}}>
            {children}
        </RouterContext.Provider>
    )
};

const Route = ({path, children}) => {
    const {currentPath} = useContext(RouterContext);

    return currentPath === path && children;
}

const Link = ({to, children }) => {
    const { setCurrentPath } = useContext(RouterContext);

    const navigate = (e) => {
        e.preventDefault();
        setCurrentPath(to);
        // eslint-disable-next-line no-restricted-globals
        ownHistory.pushState(to);
    }

    return <a href={to} onClick={navigate}>{children}</a>
}


function App() {
  return (
    <div className="App">
        <Router>
        <Link to={"/"}>
            Home
        </Link>
        <Link to={"/profile"}>
            Profile
        </Link>
        <Link to={"/about"}>
            About
        </Link>
            <Route path="/">
                <Home/>
            </Route>
            <Route path="/about">
                <About/>
            </Route>
            <Route path="/profile">
                <Profile/>
            </Route>
        </Router>
    </div>
  );
}

export default App;
