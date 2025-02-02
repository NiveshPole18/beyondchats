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
    <div className="w-full max-w-md mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-6 bg-white/90 backdrop-blur-md p-4 rounded-lg shadow-lg"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-black">Organization Setup</h2>
          <p className="text-sm text-gray-600">Configure your company profile and customize your chatbot experience</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="companyName"
                {...register("companyName", { required: "Company name is required" })}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="Enter your company name"
              />
            </div>
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.companyName.message as string}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Website URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                id="websiteUrl"
                {...register("websiteUrl", { required: "Website URL is required" })}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-black focus:border-black"
                placeholder="https://www.example.com"
              />
            </div>
            {errors.websiteUrl && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.websiteUrl.message as string}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 pt-2 flex items-start pointer-events-none">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <textarea
                id="description"
                {...register("description")}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-black focus:border-black"
                rows={3}
                placeholder="Enter a brief description of your company"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            FETCH PAGES
          </Button>
        </form>

        {scrapedPages.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-black mb-2">Scraping Progress</h3>
              <div className="w-48 h-48 mx-auto">
                <Pie data={chartData} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Scraped Pages</h4>
                <ul className="space-y-1">
                  {scrapedPages.map((page) => (
                    <motion.li
                      key={page}
                      className="cursor-pointer text-sm text-black hover:text-gray-600 transition-colors"
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
                <h4 className="text-sm font-medium text-gray-700 mb-2">Pending Pages</h4>
                <ul className="space-y-1">
                  {pendingPages.map((page) => (
                    <li key={page} className="text-sm text-gray-500">
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
                className="p-3 bg-gray-100 rounded-md"
              >
                <h4 className="text-sm font-medium mb-2 text-black">Extracted Data for {selectedPage}</h4>
                <p className="text-xs text-gray-700">{extractedData}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        <div className="flex gap-2">
          <Button onClick={onPrev} className="flex-1">
            Previous
          </Button>
          <Button onClick={onNext} className="flex-1">
            Next
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

export default OrganizationSetup

