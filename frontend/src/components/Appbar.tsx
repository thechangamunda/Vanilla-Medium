import { Link } from "react-router-dom"

interface AppbarProps{
    authorName: string
}


export const Appbar = ({ authorName }: AppbarProps ) => {

    return <div className="border-b border-slate-200 flex justify-between px-10 py-3">
        <div className="text-xl font-bold">
            <Link to={"/blogs"} className="cursor-pointer">Medium</Link>
        </div>
        <div className="flex">
            <Link to={"/publish"}>
            <button type="button" className=" cursor-pointer mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-5 py-2">New</button>
            </Link>
        <span className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ">
            <span className="font-medium text-gray-600 dark:text-gray-300">{authorName.slice(0,1)}</span>
        </span>
        </div>

    </div>
}