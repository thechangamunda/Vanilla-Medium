import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"

export const Blogs = () =>{
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div>
            <Appbar authorName="Y"/> 
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }
    else{return<div>
    
    <Appbar authorName="Y"/>
    <div className="flex justify-center">
        <div>
            {blogs.map(blog => <BlogCard
             id={blog.id}
             authorName={blog.author.name || "Anonymous"} 
             content={blog.content}
             title={blog.title}
             publishedDate={""}/>)}
        </div>
    </div>
    </div>
    }
}