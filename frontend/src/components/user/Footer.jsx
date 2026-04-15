import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className="bg-[#f9f4ec] py-16 px-6">
      {/* Notice */}
      <div className="flex  justify-center mb-12">
        <div className="border flex-col border-orange-300 bg-orange-50 text-orange-700 px-6 py-4 rounded-lg flex items-center gap-2 max-w-xl bg-white shadow-xl text-center">
          <span className="font-semibold">⚠ Important</span>
          <p>
            We kindly request you to park your vehicle on the main road when
            arriving at the hotel.
          </p>
        </div>
      </div>


      {/* Find Us */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">Find Us</h2>
        <p className="text-gray-500 mt-2">Visit us at our convenient location</p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Location Card */}
        <div className="flex justify-center">
          <div className="bg-white shadow-lg rounded-xl p-6 max-w-sm text-center">
            <h3 className="font-semibold text-lg mb-2">Location</h3>
            <p className="text-gray-600">
              Behind Vaishno Devi Mandir, Akurdi Railway Station, Pune
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="flex justify-center">
          <iframe
            className="rounded-xl shadow-lg w-full max-w-md h-64"
            src="https://www.google.com/maps?q=18.6476,73.7682&z=15&output=embed"
            loading="lazy"
          ></iframe>
        </div>
      </div>


    </footer>
  )
}
