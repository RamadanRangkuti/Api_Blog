# Api_Blog
clone repository : git clone https://github.com/RamadanRangkuti/Api_Blog
istall package : npm install
run server on terminal : npm run dev

after local server run, you can register or login before access all api

endpoint register
post : http://localhost:5000/api/v1/auth/register
endpoint login
post : http://localhost:5000/api/v1/auth/login

//need authentication, you must login before acces this api
endpoint content
get : http://localhost:5000/api/v1/content (GET ALL COMMENT)
get : http://localhost:5000/api/v1/content/:id (GET COMMENT BY ID)
post : http://localhost:5000/api/v1/content/ (ADD CONTENT)
patch : http://localhost:5000/api/v1/content/patch (EDIT CONTENT BY ID)
delete : http://localhost:5000/api/v1/content/:id (DELETE CONTENT BY ID)

//need authentication, you must login before acces this api
endpoint comments 
get : http://localhost:5000/api/v1/comment (GET ALL COMMENT)
get: http://localhost:5000/api/v1/comment/content (GET COMMENT CONTENT)
get : http://localhost:5000/api/v1/comment/:id (GET COMMENT BY ID)
post : http://localhost:5000/api/v1/comment/ (ADD COMMENT)
patch : http://localhost:5000/api/v1/comment/patch (EDIT COMMENT BY ID)
delete : http://localhost:5000/api/v1/comment/:id (DELETE COMMENT BY ID)

//need authentication, you must login before acces this api
get : http://localhost:5000/api/v1/users (GET ALL USERS)

