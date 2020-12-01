

// var token is updated only when the app is mounted or when npm start is run. fix it or only the first var value will be selected.

const varToken = localStorage.getItem('token')
const config = {   
    environment: "development",
    base_url: "http://localhost:8000/",
    headers: {headers: {
          Authorization: 'Bearer ' + (localStorage.getItem('token'))
        }}
}

export default config