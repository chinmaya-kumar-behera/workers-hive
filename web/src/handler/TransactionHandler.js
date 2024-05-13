import React from 'react'
import { initiateTransactionService } from '../services/transactionService';

const TransactionHandler = () => {
    const initiateTransactionHadler = async (data) => {
        return initiateTransactionService(data);
    };
  return { initiateTransactionHadler };
}

export default TransactionHandler