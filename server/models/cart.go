package models

type Cart struct {
	ID       int                  `json:"id" type:"auto_increment"`
	SellerID int                  `json:"sellerId"`
	Seller   UsersProfileResponse `json:"seller"`
	OrderID  int                  `json:"orderId"`
	Order    ProductResponse      `json:"order"`
	Qty      int                  `json:"qty"`
}
