import { useEffect, useState } from "react";

const Partners = () => {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/partners')
            .then(res => res.json())
            .then(data => setPartners(data))
            .catch(error => console.error('Error fetching partners:', error));
    }, []);

    return (
        <section className="mb-12">
            <div className="mx-auto text-center md:w-4/12 my-8">
                <h3 className="text-3xl uppercase py-4">Our Partners</h3>
            </div>
            <div className="flex justify-center gap-10">
                {partners.map(partner => (
                    <div key={partner._id} className="logo flex flex-col items-center">
                        <img src={partner.logo} alt="Partner Logo" />
                        <div className="caption">{partner.caption}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Partners;
