import { Link } from "react-router-dom"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string,
    id: string
}

export const BlogCard = ({
    authorName, 
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`} ><div className="pt-4 w-screen max-w-screen-lg md:max-w-screen-md curser-pointer">
        <div className="border-b border-slate-200 pb-4 ">
            <div>
                <span className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
                        <span className="font-medium text-gray-600 dark:text-gray-300">{authorName.slice(0,1)}</span>
                </span><span className="px-2 font-normal text-sm">{authorName}</span><span className="font-extrabold text-slate-400">&#183;</span><span className="px-2 text-slate-500 text-sm">{publishedDate}</span>
            </div>
            <div className="font-bold text-xl pt-2">
                {title}
            </div>
            <div className="pt-1">
                {(content.length)>100?content.slice(0,100)+"....":content}
            </div>
            <div className="text-slate-500 font-thin pt-2">
                {`${Math.ceil(content.length/100)} min read.`}
            </div>
            </div>
    </div>
    </Link>
}