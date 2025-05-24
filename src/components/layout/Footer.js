export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
      <div className="px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
          <div>
            © 2024 YourApp. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
