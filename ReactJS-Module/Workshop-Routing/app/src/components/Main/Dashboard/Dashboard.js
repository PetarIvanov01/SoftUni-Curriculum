import { useEffect, useState } from "react";
import { Job } from "./Job";
import { getCatalog } from "../../../service/offerService";

export function Dashboard() {

  const [jobs, setCatalog] = useState([]);

  useEffect(() => {
    getCatalog()
      .then(jobs => setCatalog(jobs))
      .catch(err => console.log(err));

  }, [])


  return (
    <section id="dashboard">
      <h2>Job Offers</h2>
      {jobs.length !== 0 ? jobs.map(j => <Job key={j._id} {...j} />) : <h2>No offers yet.</h2>}
    </section>
  )
}