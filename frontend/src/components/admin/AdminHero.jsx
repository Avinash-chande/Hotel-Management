import { useEffect, useState } from "react"

function AdminHero() {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());

        }, 1000)
        return () => clearInterval(interval);

    }, [])

    return (
        <div>
            <div
                className="h-[380px] bg-cover bg-center relative"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1541544741938-0af808871cc0')",
                }}
            >
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        होटल धरमरराज
                    </h1>
                    <p className="text-lg opacity-90">घरगुती जेवण</p>

                    <div className="mt-4 flex items-center gap-3">
                        <span className="px-4 py-1 bg-green-500 rounded-full text-sm font-semibold">
                            Open
                        </span>
                        <span className="text-sm opacity-80">
                            <div className="text-sm text-gray-200">
                                Updated:{" "}
                                {time.toLocaleString("en-IN", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </div>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminHero
