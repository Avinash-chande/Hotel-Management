import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white overflow-hidden">
            <h1 className="text-[120px] font-bold leading-none">404</h1>
            <p className="mb-10 text-gray-300">Page Not Found</p>

            {/* Ghost */}
            <div className="relative w-[120px] h-[150px] bg-white rounded-t-full animate-bounce">
                {/* Face */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="flex gap-8">
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                        <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                    <div className="w-8 h-4 border-2 border-black border-t-0 rounded-b-full mt-4"></div>
                </div>

                {/* Bottom waves */}
                <div className="absolute bottom-0 left-0 right-0 flex">
                    <div className="w-1/3 h-6 bg-white rounded-bl-full"></div>
                    <div className="w-1/3 h-6 bg-white"></div>
                    <div className="w-1/3 h-6 bg-white rounded-br-full"></div>
                </div>
            </div>

            {/* Button */}
            <Link to={"/"} className="mt-10 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
            Go Home</Link>
        </div>
    )
}
