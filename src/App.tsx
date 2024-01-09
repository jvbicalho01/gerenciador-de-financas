import { useState } from "react"
import Modal from "react-modal"

import { GlobalStyle } from "./styles/global"

import { Header } from "./components/Header"
import { Dashboard } from "./components/Dashboard"
import { NewTransactionModal } from "./components/NewTransactionModal"

import { TransactionsContext, TransactionsProvider } from "./TransactionsContext"

Modal.setAppElement('#root');

function App() {

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionsProvider>
  )
}

export default App