import Binstructor from "../BInstructor/Binstructor";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Datashow from "../Datashow/Datashow";
import Partners from "../Partners/Partners";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Partners></Partners>
            <Category></Category>
            <Testimonials></Testimonials>
            <Datashow></Datashow>
<Binstructor></Binstructor>
        </div>
    );
};

export default Home;