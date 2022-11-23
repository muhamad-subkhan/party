package routes

import (
	"BE-foodways/handlers"
	"BE-foodways/pkg/middleware"
	"BE-foodways/pkg/mysql"
	"BE-foodways/repositories"

	"github.com/gorilla/mux"
)

func TransactionRoutes(r *mux.Router) {
	transactionRepository := repositories.RepositoryTransaction(mysql.DB)
	h := handlers.HandlerTransaction(transactionRepository)

	r.HandleFunc("/transactions", middleware.Auth(h.FindTransactions)).Methods("GET") // get all
	r.HandleFunc("/transaction/{id}", middleware.Auth(h.GetTransaction)).Methods("GET") // get by id
	r.HandleFunc("/transaction", middleware.Auth(h.CreateTransaction)).Methods("POST") // create
	r.HandleFunc("/transaction/{id}", middleware.Auth(h.UpdateTransaction)).Methods("PATCH") // Update
	r.HandleFunc("/transaction/{id}", middleware.Auth(h.DeleteTransaction)).Methods("DELETE") // Delete
}