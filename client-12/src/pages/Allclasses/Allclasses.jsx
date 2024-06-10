import { Link } from "react-router-dom"; // Import Link from react-router-dom
import useClass from "../../hooks/useClass";
import { useState } from "react";

const Allclasses = () => {
    const [Class1] = useClass();
    const [currentPage, setCurrentPage] = useState(1);
    const [classesPerPage] = useState(6); // Set the number of classes per page

    // Filter classes where status is "approved"
    const approvedClasses = Class1.filter(class1 => class1.status === "approved");

    // Logic for pagination
    const indexOfLastClass = currentPage * classesPerPage;
    const indexOfFirstClass = indexOfLastClass - classesPerPage;
    const currentClasses = approvedClasses.slice(indexOfFirstClass, indexOfLastClass);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <section>
            <div className="mx-auto text-center ">
                <h3 className="text-3xl uppercase  py-4 my-20">All Classes</h3>
            </div>
            <div className="flex flex-row flex-wrap gap-10 justify-center my-20">
                {currentClasses.map(class1 => (
                    <div key={class1.Title}>
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <figure>
                                <img src={class1.image} alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{class1.title}</h2>
                                <p>{class1.name}</p>
                                <p>{class1.description}</p>
                                <p>{class1.price}</p>
                            
                                <Link to={`/post/${class1._id}`} className="btn btn-sm btn-primary bg-blue-600 hover:bg-blue-400 w-full">Enroll now</Link>
                                <div className="card-actions justify-end">
                                    <div className="badge badge-outline">{class1.totalenrolment}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <nav className="pagination flex justify-center my-4">
                <ul className="pagination-list flex flex-row ">
                    <li>
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn btn-sm btn-outline"
                        >
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: Math.ceil(approvedClasses.length / classesPerPage) }, (_, index) => (
                        <li key={index}>
                            <button
                                onClick={() => paginate(index + 1)}
                                className={`btn btn-sm btn-outline ${currentPage === index + 1 ? 'btn-active' : ''}`}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={currentPage === Math.ceil(approvedClasses.length / classesPerPage)}
                            className="btn btn-sm btn-outline"
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </section>
    );
};

export default Allclasses;
