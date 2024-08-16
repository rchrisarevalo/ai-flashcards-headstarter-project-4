import '@fontsource/raleway';
import '@fontsource/roboto';

const Dashboard = () => {
    return (
        <>
            <h1 className="text-6xl max-sm:text-5xl font-extrabold text-[#1476bc] text-center"
            style={{ fontFamily: "'Raleway', sans-serif" }}>Your Dashboard</h1>
            <i className="text-xl ml-7 mr-7 font-light text-center block mb-10"
            style={{ fontFamily: "'Roboto', sans-serif" }}>These are the set of flashcards you generated.</i>
            <section className="grid grid-cols-3 max-sm:grid-cols-1 gap-10 items-center p-5 bg-white">
                <figure className="bg-white p-10 rounded-lg flex flex-col items-center gap-5 text-black shadow-lg transform transition-transform hover:scale-105 w-full h-50">
                    <h3 className="text-2xl font-extrabold text-[#1476bc]"
                    style={{ fontFamily: "'Raleway', sans-serif" }}>Biology Set</h3>
                    <p className="text-gray-600"
                    style={{ fontFamily: "'Roboto', sans-serif" }}>Created on: August 15, 2024</p>
                </figure>
                <figure className="bg-white p-10 rounded-lg flex flex-col items-center gap-5 text-black shadow-lg transform transition-transform hover:scale-105 w-full h-50">
                    <h3 className="text-2xl font-extrabold text-[#1476bc]"
                    style={{ fontFamily: "'Raleway', sans-serif" }}>Chemistry Set</h3>
                    <p className="text-gray-600"
                    style={{ fontFamily: "'Roboto', sans-serif" }}>Created on: August 15, 2024</p>
                </figure>
                <figure className="bg-white p-10 rounded-lg flex flex-col items-center gap-5 text-black shadow-lg transform transition-transform hover:scale-105 w-full h-50">
                    <h3 className="text-2xl font-extrabold text-[#1476bc]"
                    style={{ fontFamily: "'Raleway', sans-serif" }}>Data Structures And Algorithms Set</h3>
                    <p className="text-gray-600"
                    style={{ fontFamily: "'Roboto', sans-serif" }}>Created on: August 15, 2024</p>
                </figure>
            </section>
        </>
    )
}

export default Dashboard;