import Link from "next/link"
import Dialog from "../components/Dialog"

export default function Products() {

    async function onClose() {
        "use server"
        console.log("Modal has closed")
    }

    async function onOk() {
        "use server"
        console.log("Ok was clicked")
    }

    return (
        <>
            <Dialog title="" onClose={onClose} onOk={onOk}>
                <div className="p-4 w-full">
                {/* Search + Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                    <div className="flex items-center w-full sm:w-1/2 bg-white border border-gray-300 rounded-md px-3 py-2 shadow-sm">
                    <span className="mr-2">☰</span>
                    <input
                        type="text"
                        placeholder="Search Buses"
                        className="w-full outline-none"
                    />
                    <span>🔍</span>
                    </div>

                    {/* Filter Buttons */}
                    <div className="flex gap-2 mt-3 sm:mt-0">
                    <button className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                        Air-conditioned
                    </button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded-full text-sm">
                        No Aircon
                    </button>
                    </div>
                </div>

                {/* Available Buses List */}
                <h2 className="text-xl font-semibold mb-4">Available Buses</h2>
                <div className="bg-gray-100 rounded-md p-4 space-y-4">
                    {[1, 2, 3, 4].map((bus, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-white p-3 rounded shadow-sm"
                    >
                        <div className="flex items-center gap-4">
                        {/* Placeholder image */}
                        <div className="w-12 h-12 bg-black rounded"></div>

                        {/* Bus Details */}
                        <div>
                            <p className="font-semibold">PQA-1004 <span className="font-normal">Bus</span></p>
                            <p className="text-sm text-gray-600">Aircon</p>
                            <p className="text-sm text-gray-600">50 Seats</p>
                        </div>
                        </div>

                        {/* Assign Button */}
                        <button className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">
                        Assign
                        </button>
                    </div>
                    ))}
                </div>
                </div>
            </Dialog>

            {/* Test content */}
            <h1 className="text-5xl">Home</h1>
            <Link href="/" className="text-3xl underline">
                Go to Home
            </Link>
        </>
    )
}