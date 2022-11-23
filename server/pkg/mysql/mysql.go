package mysql

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Database() {
	var err error
	dsn := "root@tcp(127.0.0.1:3306)/waysfood?charset=utf8mb4&parseTime=True&loc=Local"
	// dsn := "{user}:{password}@tcp({Host}:{Port})/{Database name}?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	fmt.Println("Database Has Connected")

}
