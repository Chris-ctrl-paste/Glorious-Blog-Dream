import React, {  Component } from "react";
import { comment, uncomment } from "./apiPost";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DefaultProfile from "../images/avatar.jpg";

class Comment extends Component {
    state = {
        text: "",
        error: ""
    };

    handleChange = event => {
        this.setState({ error: "" });
        this.setState({ text: event.target.value });
    };

    isValid = () => {
        const { text } = this.state;
        if (!text.length > 0 || text.length > 100) {
            this.setState({
                error:
                    "Comment should not be empty and less than 100 characters long"
            });
            return false;
        }
        return true;
    };

    addComment = e => {
        e.preventDefault();

        if (!isAuthenticated()) {
            this.setState({ error: "Please Sign in To Leave A Comment" });
            return false;
        }

        if (this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            const postId = this.props.postId;

            comment(userId, token, postId, { text: this.state.text }).then(
                data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {
                        this.setState({ text: "" });

                        this.props.updateComments(data.comments);
                    }
                }
            );
        }
    };

    deleteComment = comment => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;
        const postId = this.props.postId;

        uncomment(userId, token, postId, comment).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.props.updateComments(data.comments);
            }
        });
    };

    deleteConfirmed = comment => {
        let answer = window.confirm(
            "Are You Sure You Want To Delete Your Comment?"
        );
        if (answer) {
            this.deleteComment(comment);
        }
    };

    render() {
        const { comments } = this.props;
        const { error } = this.state;

        return (
            <div>





                <div className="mt-5"></div>
                {isAuthenticated() && (

                    <form onSubmit={this.addComment}>
                        <div className="form-group">
                            <input
                                style={{ color: 'white' }}
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.text}
                                className="form-control"
                                placeholder="Leave a comment..."
                            />
                            <button className="btn btn-raised btn-success mt-2">
                                Post
                        </button>
                        </div>

                    </form>

                )})


                        <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                <div className="col-md-12 " style={{ marginBottom: '65px' }} >
                    <h3 className="text-success">{comments.length} Comments</h3>
                    <hr />
                    {comments.map((comment, i) => (
                        <div key={i}>
                            <div>
                                <Link to={`/user/${comment.postedBy._id}`}>
                                    <img
                                        style={{
                                            borderRadius: "50%",
                                            border: "1px solid black"
                                        }}
                                        className="float-left mr-2"
                                        height="30px"
                                        width="30px"
                                        onError={i =>
                                            (i.target.src = `${DefaultProfile}`)
                                        }
                                        src={`${
                                            process.env.REACT_APP_API_URL
                                            }/user/photo/${comment.postedBy._id}`}
                                        alt={comment.postedBy.name}
                                    />
                                </Link>
                                <div>
                                    <p style={{ color: 'white' }} className="lead">{comment.text}</p>
                                    <p className="font-italic mark" style={{ backgroundColor: 'rgb(21, 32, 43)', color: 'white' }}>
                                        {" "}
                                        <Link style={{ color: 'red' }}
                                            to={`/user/${comment.postedBy._id}`}
                                        >
                                            {comment.postedBy.name}{" "}
                                        </Link>
                                        on{" "}
                                        {new Date(
                                            comment.created
                                        ).toDateString()}
                                        <span>
                                            {isAuthenticated().user &&
                                                isAuthenticated().user._id ===
                                                comment.postedBy._id && (
                                                    <>
                                                        <span
                                                            onClick={() =>
                                                                this.deleteConfirmed(
                                                                    comment
                                                                )
                                                            }
                                                            className="text-danger float-right mr-1 "
                                                            style={{ 'cursor': 'pointer' }}
                                                        >
                                                            Remove
                                                        </span>
                                                    </>
                                                )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

export default Comment;
