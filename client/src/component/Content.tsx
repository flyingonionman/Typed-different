import React, {useState, useEffect} from 'react'
import post from '../types/posts';
import Question from './Question'
import { Select } from "@chakra-ui/react"

function Content() : JSX.Element {
    const [data, setData] = useState<Array<typeof post>>([])

    const [mutated, setMutated] = useState<Array<typeof post>>([{
        "Title":"",
        "Body":"",
        "difficulty": { "level": ""},
        "tags": [{"Name": ""}],
        "user": {"id": 0,"username": ""}
    }])

    const [filter,setFilter]= useState("All");
    
    useEffect(() => {
        const fetchData  = async () => fetch('http://localhost:5000/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            })
        .then(response => response.json())
        .then(data => {
            const mutated = {};
            setData(data)
        });

        fetchData();

    }, [])

    useEffect(() => {
        if(filter!=="All"){
            const filtered = data.filter(post =>{
                const temp =  post.tags.filter(tags => {
                    return tags.Name === filter
                    }
                )
                return temp[0]
            })
            console.log(filtered)

            setMutated(m=>filtered);
        } else {
            setMutated(m=>data);
        }
    }, [filter, data])

    const handleChange = (event: any) => {
        setFilter(event.target.value)
    }

    return (
        <div>
            <Select 
                value= {filter}
                onChange = {handleChange}
                >
                <option value="All">All</option>
                <option value="Class">Class</option>
                <option value="Object Types">Object Types</option>
            </Select>

            {mutated.map((e,i)=>{
                return (
                    <Question 
                        key = {i}
                        Body = {e.Body}
                        Title = {e.Title}
                        difficulty = {e.difficulty}
                        tags = {e.tags}
                        user =  {e.user}
                    />
                )
            })}
        </div>
    )
}

export default Content
