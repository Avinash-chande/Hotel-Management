const MenuCard = ({ item, isAdmin, onToggle }) => {
  return (
    <div className="border rounded-xl p-5 mb-4 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">
            {item.name}
          </h3>

          <div className="flex gap-2 mt-2">
            <span className="bg-gray-100 px-2 py-1 rounded-full text-xs">
              Unlimited
            </span>

            <span
              className={`px-2 py-1 rounded-full text-xs ${
                item.isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.isAvailable ? "Available" : "Unavailable"}
            </span>
          </div>

          <ul className="mt-3 text-sm text-gray-600 space-y-1">
            <li>• चिकन 4 piece</li>
            <li>• चपाती / भाकरी Unlimited</li>
            <li>• राईस Unlimited</li>
            <li>• रस्सा Unlimited</li>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-end gap-2">
          {isAdmin && (
            <button
              onClick={() => onToggle(item.id)}
              className={`text-xs px-3 py-1 rounded-full ${
                item.isAvailable
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {item.isAvailable ? "Make Unavailable" : "Make Available"}
            </button>
          )}

          <div className="text-xl font-bold text-orange-600">
            ₹{item.price}
          </div>
        </div>
      </div>
    </div>
  );
};


export default MenuCard