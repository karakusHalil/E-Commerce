import ReviewForm from "./ReviewForm";
import UserComment from "./UserComment";

function Review() {
  return (
    <>
      <div className="tab-panel-reviews">
        <UserComment />
        {/* comment form start */}
        <ReviewForm />
        {/* comment form end */}
      </div>
    </>
  );
}

export default Review;
