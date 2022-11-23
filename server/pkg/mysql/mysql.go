package mysql

import (
	"fmt"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Database() {
	var err error

	host := os.Getenv("MYSQL_HOST")
	pass := os.Getenv("MYSQL_PASS")
	user := os.Getenv("MYSQL_USER")
	name := os.Getenv("MYSQL_NAME")
	port := os.Getenv("MYSQL_PORT")

	if pass != "" {
		pass = fmt.Sprintf(":%s", pass)
	}

	dsn := fmt.Sprintf("%s%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local", user, pass, host, port, name)
	// dsn := "{user}:{password}@tcp({Host}:{Port})/{Database name}?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	fmt.Println("Database Has Connected")

}
