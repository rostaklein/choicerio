export const apiUrl =
    (process.env.NODE_ENV == "production") ? "https://choicerio-api.herokuapp.com" : "http://localhost:5000";

export const scale = ["strongly", "rather", "don't know", "rather", "strongly"];

export const compare = (respondent, candidate) => 
    Object.entries(respondent).map(([question, vote], i)=>
        ({
            question: question,
            respondent: vote,
            candidate: candidate[question],
            diff: Math.abs(vote-candidate[question])
        })
    )