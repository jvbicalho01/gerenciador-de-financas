import { useState, useEffect, createContext, ReactNode, useContext } from "react";
import { api } from "../services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

// type TransactionInput Pick<Transaction, "title" | "amount" | "type" | "category">

interface TransactiosnProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactiosnProviderProps) {
  const [transactions, setTrasactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("/transactions")
      .then(response => setTrasactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {

    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    const { transaction } = response.data;

    setTrasactions([
      ...transactions,
      transaction,
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}