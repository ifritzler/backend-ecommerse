import app from "./src/app.js";

const PORT = process.env.ENVIRONMENT === 'development' ? process.env.PORT : 8080

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})