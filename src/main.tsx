import React from 'react'
import ReactDOM from 'react-dom/client'
import { Model, createServer } from "miragejs"
import App from './App.tsx'

createServer({

  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de website",
          type: "deposit",
          category: "Desenvolvimento",
          amount: 6000,
          createdAt: new Date("2024-01-02 18:00:00"),
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          category: "Casa",
          amount: -1600,
          createdAt: new Date("2024-01-10 10:00:00"),
        }
      ],
    })
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction")
    })

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);

      return schema.create("transaction", data);
    })
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
