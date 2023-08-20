import { Link } from "react-router-dom";

export function Job({
    imageUrl,
    salary,
    title,
    _id
}) {

    return (
        <>
            <div className="offer">
                <img src={imageUrl} alt="example1" />
                <p>
                    <strong>Title: </strong>
                    <span className="title">{title}</span>
                </p>
                <p>
                    <strong>Salary:</strong>
                    <span className="salary">{salary}</span>
                </p>
                <Link className="details-btn" to={`/details/${_id}`}>
                    Details
                </Link>
            </div>
        </>
    )
}