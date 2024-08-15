const Dashboard = () => {
    return (
        <>
            <h1 className="text-6xl max-sm:text-5xl font-extrabold">Your Dashboard</h1>
            <i className="text-xl ml-7 mr-7 font-light">These are the set of flashcards you generated.</i>
            <section className="grid grid-cols-3 max-sm:grid-cols-1 gap-10 items-center p-5">
                <figure className="bg-white p-10 rounded-lg flex flex-col items-center gap-5 text-black">
                    <h3 className="text-2xl font-extrabold">Biology Set</h3>
                    <p>Created on: August 15, 2024</p>
                </figure>
                <figure className="bg-white p-10 rounded-lg flex flex-col items-center gap-5 text-black">
                    <h3 className="text-2xl font-extrabold">Chemistry Set</h3>
                    <p>Created on: August 15, 2024</p>
                </figure>
                <figure className="bg-white p-10 rounded-lg flex flex-col items-center gap-5 text-black">
                    <h3 className="text-2xl font-extrabold">Data Structures And Algorithms Set</h3>
                    <p>Created on: August 15, 2024</p>
                </figure>
            </section>
        </>
    )
}

export default Dashboard;