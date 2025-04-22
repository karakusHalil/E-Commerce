import SingleBlogArticle from "../components/blogs/SingleBlogArticle";
import Review from "../components/review/Review";

function SingleBlogPage() {
  return (
    <>
      <section className="single-blog">
        <div className="container">
          <SingleBlogArticle />
          <Review />
        </div>
      </section>
    </>
  );
}

export default SingleBlogPage;
