package repositories

import (
	"BE-foodways/models"

	"gorm.io/gorm"
)

type TransactionRepositories interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(transaction models.Transaction, ID int) (models.Transaction, error)
	DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repositories {
	return &repositories{db}
}

func (r *repositories) FindTransactions() ([]models.Transaction, error) {
	var Transaction []models.Transaction
	err := r.db.Preload("UserOrder").Preload("Order").Find(&Transaction).Error

	return Transaction, err
}

func (r *repositories) GetTransaction(ID int) (models.Transaction, error) {
	var Transaction models.Transaction
	err := r.db.Preload("UserOrder").Preload("Order").First(&Transaction, ID).Error

	return Transaction, err
}

func (r *repositories) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	err := r.db.Create(&transaction).Error

	return transaction, err
}

func (r *repositories) UpdateTransaction(transaction models.Transaction, ID int) (models.Transaction, error) {
	err := r.db.Save(&transaction).Error

	return transaction, err
}
func (r *repositories) DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error) {
	err := r.db.Delete(&transaction).Error

	return transaction, err
}