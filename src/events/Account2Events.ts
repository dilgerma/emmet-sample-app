import { BookAdded } from './BookAdded';
import { AccountCreated } from './AccountCreated';
import { MoneyTransferRequested } from './MoneyTransferRequested';
import { TransferCancelled } from './TransferCancelled';
import { TransferReceived } from './TransferReceived';
import { TransferClosed } from './TransferClosed';
import { DepositMade } from './DepositMade';
import { WithdrawalMade } from './WithdrawalMade';

export type Account2Events = BookAdded | AccountCreated | MoneyTransferRequested | TransferCancelled | TransferReceived | TransferClosed | DepositMade | WithdrawalMade;