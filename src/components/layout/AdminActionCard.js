export default function AdminActionCard({ title, description, icon, color, onClick, href }) {
  const colorClasses = {
    blue: 'border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20',
    green: 'border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 hover:bg-green-50 dark:hover:bg-green-900/20',
    yellow: 'border-yellow-200 dark:border-yellow-800 hover:border-yellow-300 dark:hover:border-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
    red: 'border-red-200 dark:border-red-800 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20',
    purple: 'border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20',
    gray: 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
  }

  const Component = href ? 'a' : 'button'
  const props = href ? { href } : { onClick }

  return (
    <Component
      {...props}
      className={`w-full text-left p-6 rounded-lg border bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-md ${colorClasses[color] || colorClasses.gray}`}
    >
      <div className="flex items-start space-x-4">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {description}
          </p>
        </div>
        <div className="text-gray-400 dark:text-gray-500">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Component>
  )
}
