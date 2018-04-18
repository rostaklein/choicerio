export const apiUrl =
    (process.env.NODE_ENV == "production") ? "https://choicerio-api.herokuapp.com" : "http://localhost:5000";

export const scale = ["strongly agree", "rather agree", "don't know", "rather disagree", "strongly disagree"];