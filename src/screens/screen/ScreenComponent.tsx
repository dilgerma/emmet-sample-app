import React, {useState} from 'react';
import {Navigation} from "../../components/navigation/Navigation";


import {AddBookCommandComponent} from "../../slices/AddBook/ui/AddBookCommandStateChange"
import {CreateAccountCommandComponent} from "../../slices/CreateAccount/ui/CreateAccountCommandStateChange"
import {TransferMoneyCommandComponent} from "../../slices/TransferMoney/ui/TransferMoneyCommandStateChange"
import {MakeDepositCommandComponent} from "../../slices/MakeDeposit/ui/MakeDepositCommandStateChange"
import {MakeWithdrawalCommandComponent} from "../../slices/MakeWithdrawal/ui/MakeWithdrawalCommandStateChange"
import {AccountBalanceReadModelStateView} from "../../slices/AccountBalance/ui/AccountBalanceReadModelStateView"


export default function ScreenComponent(props: any) {

    const [view, setView] = useState<string>()

    return (

        <div className="content container">
            <Navigation/>
            <img className="banner" src={"/assets/banner.png"}/>

            <main>
                <div className="grid">

                    <div className={"cell command"}
                         onClick={() => setView("addbook")}>
                        <h3>AddBook</h3>
                        <div>
                            COMMAND
                        </div>
                    </div>

                    <div className={"cell command"}
                         onClick={() => setView("createaccount")}>
                        <h3>CreateAccount</h3>
                        <div>
                            COMMAND
                        </div>
                    </div>

                    <div className={"cell command"}
                         onClick={() => setView("transfermoney")}>
                        <h3>TransferMoney</h3>
                        <div>
                            COMMAND
                        </div>
                    </div>

                    <div className={"cell command"}
                         onClick={() => setView("makedeposit")}>
                        <h3>MakeDeposit</h3>
                        <div>
                            COMMAND
                        </div>
                    </div>

                    <div className={"cell command"}
                         onClick={() => setView("makewithdrawal")}>
                        <h3>MakeWithdrawal</h3>
                        <div>
                            COMMAND
                        </div>
                    </div>

                    <div className={"cell readmodel"}
                         onClick={() => setView("accountbalance")}>
                        <h3>Accountbalance</h3>
                        <div>
                            READMODEL
                        </div>
                    </div>
                </div>

                {/* main */}
                <div className={"top-margin"}/>

                {view == "addbook" ? <AddBookCommandComponent/> : <span/>}
                {view == "createaccount" ? <CreateAccountCommandComponent/> : <span/>}
                {view == "transfermoney" ? <TransferMoneyCommandComponent/> : <span/>}
                {view == "makedeposit" ? <MakeDepositCommandComponent/> : <span/>}
                {view == "makewithdrawal" ? <MakeWithdrawalCommandComponent/> : <span/>}
                {view == "accountbalance" ? <AccountBalanceReadModelStateView/> : <span/>}

            </main>
        </div>

    );
}
