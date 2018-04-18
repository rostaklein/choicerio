export const compare = (respondent, candidate) => 
    Object.entries(respondent).map(([question, vote])=>
        ({
            question: question,
            respondent: vote,
            candidate: candidate[question],
            diff: Math.abs(vote-candidate[question])
        })
    )

export const calculate = (res, cand) => 
{
    const
        seq = compare(res, cand),
        perItem = 100/seq.length;
    return seq.reduce((acc, curr)=>{
        if(curr.diff==0){
            acc+=perItem;
        }
        if(curr.diff==1){
            acc+=perItem/2;
        }
        return acc;
    }, 0);
}