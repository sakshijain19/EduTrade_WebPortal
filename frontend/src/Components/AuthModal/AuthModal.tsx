// import { useState } from 'react'
// import { XIcon } from 'lucide-react'
// import React from 'react'

// interface AuthModalProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
//   const [isLogin, setIsLogin] = useState(true)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [name, setName] = useState('')

//   if (!isOpen) return null

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Here you would typically handle the authentication logic
//     console.log(isLogin ? 'Logging in' : 'Signing up', { email, password, name })
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//       <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">{isLogin ? 'Login' : 'Sign Up'}</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <XIcon size={24} />
//           </button>
//         </div>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {!isLogin && (
//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                 required
//               />
//             </div>
//           )}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             {isLogin ? 'Login' : 'Sign Up'}
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-sm text-indigo-600 hover:text-indigo-500"
//           >
//             {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }





















import React, { useState } from 'react'
import { XIcon, ArrowLeftIcon } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgotPassword'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    switch (mode) {
      case 'login':
        console.log('Logging in', { email, password })
        break
      case 'signup':
        console.log('Signing up', { email, password, name })
        break
      case 'forgotPassword':
        console.log('Resetting password for', email)
        break
    }
    // Here you would typically handle the authentication logic
  }

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          </>
        )
      case 'signup':
        return (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          </>
        )
      case 'forgotPassword':
        return (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {mode !== 'login' && (
              <button onClick={() => setMode('login')} className="mr-2">
                <ArrowLeftIcon size={24} className="text-gray-500 hover:text-gray-700" />
              </button>
            )}
            <h2 className="text-2xl font-bold">
              {mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {mode === 'login' ? 'Login' : mode === 'signup' ? 'Sign Up' : 'Reset Password'}
          </button>
        </form>
        <div className="mt-4 text-center space-y-2">
          {mode === 'login' && (
            <>
              <button
                onClick={() => setMode('signup')}
                className="text-sm text-indigo-600 hover:text-indigo-500 block w-full"
              >
                Don't have an account? Sign Up
              </button>
              <button
                onClick={() => setMode('forgotPassword')}
                className="text-sm text-indigo-600 hover:text-indigo-500 block w-full"
              >
                Forgot Password?
              </button>
            </>
          )}
          {mode === 'signup' && (
            <button
              onClick={() => setMode('login')}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Login
            </button>
          )}
          {mode === 'forgotPassword' && (
            <button
              onClick={() => setMode('login')}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Remember your password? Login
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

