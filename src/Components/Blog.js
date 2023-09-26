//Blogging App using Hooks
import { useState,useRef, useEffect } from "react";
import { db } from "../firebaseInit";
import { collection, addDoc,getDocs,onSnapshot,doc,deleteDoc } from "firebase/firestore"; 


// console.log("Document written with ID: ", docRef.id);
export default function Blog(){
    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const [blogs,setBlog]=useState([]);
    const titleRef=useRef(null);
     
    useEffect(()=>
    {
        // async function fetchData()
        // {
        //     const querySnapshot = await getDocs(collection(db, "blogs"));
        //     const blogs=querySnapshot.docs.map((doc)=>{
        //         return {
        //             id:doc.id,
        //             ...doc.data(),
        //         }
        //     })
        //     setBlog(blogs)
        // }
        // fetchData();
        const snap=onSnapshot(collection(db,"blogs"),(snapshot)=>
        {
            const blogs=snapshot.docs.map((doc)=>{
                        return {
                            id:doc.id,
                            ...doc.data(),
                        }
                    })
                    setBlog(blogs)
        }
        )
    },[]);
    

    //Passing the synthetic event as argument to stop refreshing the page on submit
  async function handleSubmit(e){
        e.preventDefault();
        // setBlog([{title,content},...blogs])
        // Add a new document with a generated id.
            await addDoc(collection(db, "blogs"), {
               title: title,
           content: content,
            });
        setTitle("")
        setContent("")
        titleRef.current.focus();
        console.log(blogs)
    }
    async function removeBlog(i)
    {
        // setBlog(blogs.filter((blog,index)=> i!==index))
        await deleteDoc(doc(db, "blogs", i));

    }
    useEffect(()=>
    {
        titleRef.current.focus();
    },[])

    useEffect(()=>
    {
        if(blogs.length && blogs[0].title)
        {
            document.title=blogs[0].title;
        }
        else
        {
            document.title="No blogs"
        }
    },[blogs])
    

    return(
        <>
        {/* Heading of the page */}
        <h1>Write a Blog!</h1>

        {/* Division created to provide styling of section to the form */}
        <div className="section">

        {/* Form for to write the blog */}
            <form onSubmit={handleSubmit}>

                {/* Row component to create a row for first input field */}
                <Row label="Title">
                        <input className="input"
                                placeholder="Enter the Title of the Blog here.." ref={titleRef} value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </Row >

                {/* Row component to create a row for Text area field */}
                <Row label="Content">
                        <textarea className="input content"
                                placeholder="Content of the Blog goes here.." value={content} onChange={(e)=> setContent(e.target.value)} />
                </Row >

                {/* Button to submit the blog */}            
                <button className = "btn">ADD</button>
            </form>
                     
        </div>

        <hr/>

        {/* Section where submitted blogs will be displayed */}
        <h2> Blogs </h2>
        <p>
            {blogs.map((b,index)=>
            {
                return <>
                <div key={index} className="blog">
                <h1>{b.title}</h1>
                <p> {b.content}</p>
                <div className="blog-btn">
                 <button className="btn remove" onClick={()=>removeBlog(b.id)}>Delete</button>
                </div>
                 </div>
                </>
            })}
        </p>
        
        </>
        )
    }

//Row component to introduce a new row section in the form
function Row(props){
    const{label} = props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr />
        </>
    )
}
