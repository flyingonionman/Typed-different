interface user{
    id : number,
    username : string
}

interface difficulty{
    level : string,
}

interface tags { 
    Name: string
}

type Question = {
    Title : string,
    difficulty: difficulty,
    user : user,
    tags : tags[]
    Body : string
}

declare const post : Question;

export default post;