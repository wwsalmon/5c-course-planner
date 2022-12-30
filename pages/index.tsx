export default function Home() {
    return (
        <>
            <div className="w-72 px-4">
                <h2 className="mt-12 mb-8 text-4xl font-light opacity-50">F22</h2>
                <div className="p-4 shadow-md bg-white w-full">
                    <h3 className="uppercase text-xs tracking-wider opacity-50 font-bold">Main</h3>
                    <div className="px-2 py-1 bg-[#8AE8E9] mt-3 leading-[1.15] text-sm">
                        <p className="font-bold">MS 148 PO</p>
                        <p>Powers of Pleasure</p>
                    </div>
                    <div className="px-2 py-1 text-center text-sm mt-3 border border-gray-400 text-gray-500 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-600">
                        <span>+ Add course</span>
                    </div>
                </div>
                <div className="p-4 text-center text-xs border border-gray-400 text-gray-500 mt-6 uppercase font-bold tracking-wider">
                    <span>+ Add possibility</span>
                </div>
            </div>
        </>
    );
}