import {useEffect} from "react";
import PFB from "./pfb/PFB";
import '../header/Header.css'

const MainPage = () => {

    useEffect(() => {
    }, []);

    return <div className="celestia" style={{marginTop: 50}}>
        <PFB/>
    </div>
}
export default MainPage;