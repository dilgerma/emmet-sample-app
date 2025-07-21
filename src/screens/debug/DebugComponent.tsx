import React, {useState} from 'react';
import {Navigation} from "../../components/navigation/Navigation";



import {OpenTransfersReadModelStateView} from "../../slices/OpenTransfers/ui/OpenTransfersReadModelStateView"


export default function DebugComponent(props: any) {

    const [view, setView] = useState<string>()

                    return (

            <div className="content container">
                <Navigation/>
                <img className="banner" src={"/assets/banner.png"}/>

                <main>
                    <div className="grid">
                        
                        <div className={"cell readmodel"}
                             onClick={() => setView("opentransfers")}>
                            <h3>OpenTransfers</h3>
                            <div>
                                READMODEL
                            </div>
                        </div>
                   </div>

                 {/* main */}
                  <div className={"top-margin"}/>

                   {view == "opentransfers" ? <OpenTransfersReadModelStateView/> : <span/>}

                </main>
            </div>

    );
}
