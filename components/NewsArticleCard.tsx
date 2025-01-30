import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface ArticleCardProps {
  title: string
  excerpt: string
  imageUrl: string
  slug: string
}

export default function NewsArticleCard({ title, excerpt, imageUrl, slug }: ArticleCardProps) {
  return (
    <Link href={`/articles/${slug}`} className="group">
      <motion.article
        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <div className="relative h-56 sm:h-64 md:h-72 lg:h-80">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
          <p className="text-gray-600 mb-4 flex-grow">{excerpt}</p>
          <motion.div
            className="flex items-center text-blue-600 font-semibold group-hover:text-blue-800 transition-colors"
            whileHover={{ x: 10 }}
          >
            Read More
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
          </motion.div>
        </div>
      </motion.article>
    </Link>
  )
}

