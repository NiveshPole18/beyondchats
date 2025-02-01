"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import Button from "./Button"
import { AlertCircle, Building2, Globe, FileText } from "lucide-react"
import type React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

interface OrganizationSetupProps {
  onNext: () => void
  onPrev: () => void
}

const OrganizationSetup: React.FC<OrganizationSetupProps> = ({ onNext, onPrev }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const [scrapedPages, setScrapedPages] = useState<string[]>([])
  const [pendingPages, setPendingPages] = useState<string[]>([])
  const [selectedPage, setSelectedPage] = useState<string | null>(null)
  const [extractedData, setExtractedData] = useState<string>("")
  const [chartData, setChartData] = useState({
    labels: ["Scraped", "Pending"],
    datasets: [
      {
        data: [0, 100],
        backgroundColor: ["#4CAF50", "#FFA000"],
      },
    ],
  })

  const onSubmit = async (data: any) => {
    console.log(data)
    // Simulate fetching pages
    const dummyPages = ["Home", "About", "Products", "Contact", "Blog", "FAQ"]
    setScrapedPages(dummyPages.slice(0, 3))
    setPendingPages(dummyPages.slice(3))
    // Update chart data
    setChartData({
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          data: [dummyPages.slice(0, 3).length, dummyPages.slice(3).length],
        },
      ],
    })
    // Simulate auto-fetching meta description
    const metaDescription = `Auto-fetched meta description for ${data.companyName}`
    setValue("description", metaDescription)
  }

  const handlePageClick = (page: string) => {
    setSelectedPage(page)
    // Simulate fetching extracted data for the selected page
    setExtractedData(
      `This is the extracted data for ${page}. It includes various text chunks and relevant information scraped from the page.`,
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6 bg-white/90 backdrop-blur-md p-6 rounded-lg shadow-lg text-black max-w-2xl mx-auto"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="companyName"
              {...register("companyName", { required: "Company name is required" })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="Enter your company name"
            />
          </div>
          {errors.companyName && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.companyName.message as string}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700">
            Website URL
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Globe className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              id="websiteUrl"
              {...register("websiteUrl", { required: "Website URL is required" })}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              placeholder="https://www.example.com"
            />
          </div>
          {errors.websiteUrl && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.websiteUrl.message as string}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 pt-2 flex items-start pointer-events-none">
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="description"
              {...register("description")}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              rows={3}
              placeholder="Enter a brief description of your company"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="w-full sm:w-auto">
            Fetch Pages
          </Button>
        </div>
      </form>
      {scrapedPages.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <h3 className="text-2xl font-semibold text-black text-center mb-4">Detected Pages</h3>
          <h3 className="text-2xl font-semibold text-black text-center mb-4">Scraping Progress</h3>
          <div className="w-64 h-64 mx-auto">
            <Pie data={chartData} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-medium mb-2 text-gray-700 text-center">Scraped Pages</h4>
              <ul className="space-y-2">
                {scrapedPages.map((page) => (
                  <motion.li
                    key={page}
                    className="cursor-pointer text-black hover:text-gray-600 transition-colors"
                    onClick={() => handlePageClick(page)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {page}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2 text-gray-700 text-center">Pending Pages</h4>
              <ul className="space-y-2">
                {pendingPages.map((page) => (
                  <li key={page} className="text-gray-500">
                    {page}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {selectedPage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-gray-100 rounded-md"
            >
              <h4 className="text-lg font-medium mb-2 text-black">Extracted Data for {selectedPage}</h4>
              <p className="text-gray-700">{extractedData}</p>
            </motion.div>
          )}
        </motion.div>
      )}
      <div className="flex justify-between mt-6">
        <Button onClick={onPrev} className="w-full sm:w-auto mr-2">
          Previous
        </Button>
        <Button onClick={onNext} className="w-full sm:w-auto ml-2">
          Next
        </Button>
      </div>
    </motion.div>
  )
}

export default OrganizationSetup

