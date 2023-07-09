import NumberBoard from "./NumberBoard";

export default function Background(){
    return(
        <div className="bg-[#0B2434] h-screen w-screen flex justify-center items-center">
            <div className="mx-10 bg-[#F5F5F5] rounded-lg h-5/6 w-full flex flex-col">
                <div className="flex h-fit mt-16 pb-2 items-center justify-center text-[#0B2434] font-bold text-5xl order-1">
                    Tenzines
                </div>
                <div className="flex h-fit justify-center text-[#0B2434] font-light text-4xl order-2">
                    <span className="w-3/6">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</span>
                </div>
                <div className="order-3 pt-10 pb-20 flex items-center justify-center flex-col">
                    <NumberBoard />
                </div>
            </div>
        </div>
    );
}