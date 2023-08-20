import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getDetails, isApply, totalCountApplyes } from "../../../service/offerService"
import { DeleteDetails } from "./Delete";
import { Apply } from "./Apply";

export function Details({ user }) {

    const { detailId } = useParams();
    const [job, setJob] = useState({});
    const [isApplyToOffer, setApplyToOffer] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {

        getDetails(detailId)
            .then(data => setJob(data))
            .catch(err => navigate('/404'))

        totalCountApplyes(detailId)
            .then(c => setJob((s) => {
                return { ...s, count: c }
            }))
        if (user) {
            isApply(detailId, user.id)
                .then(c => setApplyToOffer(c))
        }

    }, [detailId, isApplyToOffer])


    return (
        <section id="details">
            <div id="details-wrapper">
                <img id="details-img" src={job.imageUrl} alt="example1" />
                <p id="details-title">{job.title}</p>
                <p id="details-category">
                    Category: <span id="categories">{job.category}</span>
                </p>
                <p id="details-salary">
                    Salary: <span id="salary-number">{job.salary}</span>
                </p>
                <div id="info-wrapper">
                    <div id="details-description">
                        <h4>Description</h4>
                        <span>
                            {job.description}
                        </span>
                    </div>
                    <div id="details-requirements">
                        <h4>Requirements</h4>
                        <span>
                            {job.requirements}
                        </span>
                    </div>
                </div>
                <p>
                    Applications: <strong id="applications">{job.count}</strong>
                </p>

                <div id="action-buttons">
                    {user ?
                        user.id === job._ownerId ?
                            <>
                                <Link to={`/edit/${job._id}`} id="edit-btn">
                                    Edit
                                </Link>
                                <DeleteDetails detailId={detailId} />
                            </>
                            :
                            isApplyToOffer === 0 ? <Apply detailId={detailId} setApplyToOffer={setApplyToOffer} /> : ''
                        : null}
                </div>
            </div>
        </section>
    )
}