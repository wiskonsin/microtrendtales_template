import React from "react"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
    <div className="mb-2 transition justify-center ease-in-out hover:-translate-y-1 hover:scale-90 duration-300" > 
      <Link to={post.frontmatter.slug} className="bg-midnight block max-w-sm p-6 border border-gray-200 rounded-lg shadow h-full">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-metal mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white col-span-1">
                {post.frontmatter.title}
            </h5>
            <p className="font-normal text-metal dark:text-gray-400">{post.frontmatter.date}</p>
          </div>
            <img className="rounded-xl" src={`${post.frontmatter.imageURL}`} onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://digitalia-test-2.s3.eu-west-3.amazonaws.com/background-microtrend.png";
            }} alt="MTT"/>
        </div>
        
      </Link>
    </div>
)

export default PostLink