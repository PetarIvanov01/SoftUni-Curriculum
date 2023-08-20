import { useEffect, useState } from "react"
import { editOffer, getDetails } from "../../../service/offerService";
import { useNavigate, useParams } from "react-router-dom";

export function Edit() {

  const { id } = useParams();
  const [err, setErr] = useState(null)
  const navigate = useNavigate();

  const [fields, setFields] = useState({
    title: '',
    imageUrl: '',
    category: '',
    description: '',
    requirements: '',
    salary: ''
  })

  useEffect(() => {
    getDetails(id)
      .then(j => {
        setFields({
          title: j.title,
          imageUrl: j.imageUrl,
          category: j.category,
          description: j.description,
          requirements: j.requirements,
          salary: j.salary
        })
      })
  }, [id])

  function onChangeHandler(e) {
    setFields((f) => {
      return { ...f, [e.target.name]: e.target.value }
    })
  }

  async function onSubmitForm(e) {
    e.preventDefault();

    try {
      if (Object.values(fields).some(e => e === '')) {
        throw new Error('All fields are required!')
      }
      const offer = await editOffer(id, fields);
      navigate(`/details/${offer._id}`)

    } catch (error) {
      setErr(error)
    }

  }


  return (
    <section id="edit">
      <div className="form">
        <h2>Edit Offer</h2>
        {err ? < h3 > {err.message} </h3> : ''}
        <form onSubmit={onSubmitForm} className="edit-form">
          <input
            onChange={onChangeHandler}
            value={fields.title}
            type="text"
            name="title"
            id="job-title"
            placeholder="Title" />
          <input
            onChange={onChangeHandler}
            value={fields.imageUrl}
            type="text"
            name="imageUrl"
            id="job-logo"
            placeholder="Company logo url"
          />
          <input
            onChange={onChangeHandler}
            value={fields.category}
            type="text"
            name="category"
            id="job-category"
            placeholder="Category"
          />
          <textarea
            onChange={onChangeHandler}
            value={fields.description}
            id="job-description"
            name="description"
            placeholder="Description"
            rows={4}
            cols={50}
          />
          <textarea
            onChange={onChangeHandler}
            value={fields.requirements}
            id="job-requirements"
            name="requirements"
            placeholder="Requirements"
            rows={4}
            cols={50}
          />
          <input
            onChange={onChangeHandler}
            value={fields.salary}
            type="text"
            name="salary"
            id="job-salary"
            placeholder="Salary"
          />
          <button type="submit">post</button>
        </form>
      </div>
    </section>
  )
}