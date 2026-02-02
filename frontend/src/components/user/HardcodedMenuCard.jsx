import React from "react"

export default function HardcodedMenuCard() {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 mb-6">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-bold mb-2">
            टाईम प्लेट
          </h3>

          <div className="flex gap-2 mb-3">
            <span className="px-3 py-1 text-sm rounded-full bg-gray-100">
              Unlimited
            </span>

            <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-600">
              Unavailable
            </span>
          </div>
        </div>

        <span className="text-xl font-bold text-orange-500">
          ₹80
        </span>
      </div>

      {/* Items */}
      <ul className="list-disc list-inside text-gray-700 space-y-1 mt-3">
        <li>चिकन 4 piece</li>
        <li>चपाती / भाकरी Unlimited</li>
        <li>टाईम Unlimited</li>
        <li>रस्ता Unlimited</li>
      </ul>

    </div>
  )
}
