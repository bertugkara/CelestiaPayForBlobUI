import Header from "./components/header/Header";
import './App.css';
import MainPage from "./components/content/MainPage";
import WalletAccountContext from "./context/WalletAccountContext";
import {useState} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

    const [account, setAccount] = useState(null);

    return <div className="main"
                style={{backgroundImage: `url("https://celestia.org/static/header-bg-861e0242f0c2149da928dd01d1c3a486.png")`}}>
        <ToastContainer/>
        <WalletAccountContext.Provider value={{account,setAccount}}>
            <Header/>
            <MainPage/>
        </WalletAccountContext.Provider>
    </div>
}

export default App;
