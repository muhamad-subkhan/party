package handlers

import (
	dto "BE-foodways/dto/result"
	usersdto "BE-foodways/dto/users"
	"BE-foodways/models"
	"BE-foodways/repositories"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type handlerUser struct {
	UserRepository repositories.UserRepositories
}

func HandlerUser(UserRepository repositories.UserRepositories) *handlerUser {
	return &handlerUser{UserRepository}
}

func (h *handlerUser) FindUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	users, err := h.UserRepository.FindUsers() // menjalankan query kedatabase
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: users, Status: "succes"}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerUser) GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(user)}
	json.NewEncoder(w).Encode(response)
}

func (h *handlerUser) CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "application/json")

	request := new(usersdto.CreateUserRequest)
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	user := models.User{
		ID:       request.ID,
		Name:     request.Name,
		Email:    request.Email,
		Phone:    request.Phone,
		Location: request.Location,
		Image:    request.Image,
		Role:     request.Role,
	}

	data, err := h.UserRepository.CreateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err.Error())
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data), Status: "succes"}
	json.NewEncoder(w).Encode(response)

}

func (h *handlerUser) UpdateUser(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	dataContex := r.Context().Value("dataFile")
	filename := dataContex.(string)

	//take pattern data submission
	// request := new(usersdto.UpdateUserRequest)
	// request := new(usersdto.UpdateUserRequest)
	// if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
	// 	w.WriteHeader(http.StatusBadRequest)
	// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
	// 	json.NewEncoder(w).Encode(response)
	// 	return
	// }

	request := usersdto.UpdateUserRequest{
		Name:     r.FormValue("fullName"),
		Image:    r.FormValue("image"),
		Email:    r.FormValue("email"),
		Phone:    r.FormValue("phone"),
		Gender:   r.FormValue("gender"),
		Location: r.FormValue("location"),
	}

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	// user := models.User{}
	user, err := h.UserRepository.GetUser(int(id))

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	if request.Name != "" {
		user.Name = request.Name
	}

	if request.Email != "" {
		user.Email = request.Email
	}

	if request.Phone != "" {
		user.Phone = request.Phone
	}

	if request.Gender != "" {
		user.Gender = request.Gender
	}

	if request.Location != "" {
		user.Location = request.Location
	}

	if filename != "" {
		user.Image = path_file + filename
	}

	data, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}
	// user, _ = h.UserRepository.GetUser(user.ID)

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: UpdateRespone(data)}
	json.NewEncoder(w).Encode(response)
}

// w.Header().Set("Content-Type", "application/json")

// request := new(usersdto.UpdateUserRequest)
// if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
// 	w.WriteHeader(http.StatusBadRequest)
// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
// 	json.NewEncoder(w).Encode(response)
// 	return
// }

// // dataContex := r.Context().Value("dataFile")
// // filename := dataContex.(string)

// id, _ := strconv.Atoi(mux.Vars(r)["id"])
// user, err := h.UserRepository.GetUser(int(id))
// if err != nil {
// 	w.WriteHeader(http.StatusBadRequest)
// 	response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
// 	json.NewEncoder(w).Encode(response)
// 	return
// }
// fmt.Println("eroor", err)

// if request.Name != "" {
// 	user.Name = request.Name
// }

// if request.Email != "" {
// 	user.Email = request.Email
// }

// // if request. != "" {
// // 	user.Email = request.Email
// // }

// if request.Gender != "" {
// 	user.Gender = request.Gender
// }

// if request.Phone != ""{
// 	user.Phone = request.Phone
// }

// if request.Location != ""{
// 	user.Location = request.Location
// }

// // if request.Image != ""{
// // 	user.Image = filename
// // }

// // if request.Role != ""{
// // 	user.Role = request.Role
// // }

// data, err := h.UserRepository.UpdateUser(user)
// if err != nil {
// 	w.WriteHeader(http.StatusInternalServerError)
// 	response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
// 	json.NewEncoder(w).Encode(response)
// 	return
// }

// w.WriteHeader(http.StatusOK)
// response := dto.SuccessResult{Code: http.StatusOK, Data: UpdateRespone(data), Status: "succes"}
// json.NewEncoder(w).Encode(response)

// }

func (h *handlerUser) DeleteUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	id, _ := strconv.Atoi(mux.Vars(r)["id"])
	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		response := dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	data, err := h.UserRepository.DeleteUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		response := dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(w).Encode(response)
		return
	}

	w.WriteHeader(http.StatusOK)
	response := dto.SuccessResult{Code: http.StatusOK, Data: convertResponse(data), Status: "succes"}
	json.NewEncoder(w).Encode(response)
}

func convertResponse(u models.User) usersdto.UserResponse {
	return usersdto.UserResponse{
		ID:       u.ID,
		Name:     u.Name,
		Email:    u.Email,
		Phone:    u.Phone,
		Gender:   u.Gender,
		Location: u.Location,
		Image:    u.Image,
		Role:     u.Role,
	}
}

func UpdateRespone(u models.User) usersdto.UpdateRespone {
	return usersdto.UpdateRespone{
		ID:    u.ID,
		Name:  u.Name,
		Email: u.Email,
		Phone: u.Phone,
		// Gender: u.Gender,
		Location: u.Location,
		Image:    u.Image,
	}
}
