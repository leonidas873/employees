import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MainLayout from "../../../components/common/MainLayout/MainLayout";
import styles from "./Employee.module.css";

const Employee = ({ employee }) => {
  const router = useRouter();
  const [job, setJob] = useState("");
  const [location, setLocation] = useState("");
  const [likes, setLikes] = useState(employee.liked);
  const [pending, setPending] = useState(false);
  useEffect(() => {
    fetch(`https://test-task-api-optimo.herokuapp.com/job`)
      .then((res) => res.json())
      .then((res) => {
        let result = res.find((jobs) => jobs.id === employee.job_id);
        setJob(result);
      });
    fetch(`https://test-task-api-optimo.herokuapp.com/location`)
      .then((res) => res.json())
      .then((res) => {
        let result = res.find(
          (location) => location.id === employee.location_id
        );
        setLocation(result);
      });
  }, []);
  const onLike = (id) => {
    setPending(true);
    fetch(`https://test-task-api-optimo.herokuapp.com/employee/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLikes(res.liked);
        setPending(false);
      });
  };
  return (
    <MainLayout>
      <div className={styles.main}>
        <h2 className={styles.heading}>employee's profile</h2>
        <div className={styles.bio}>
          <div className={styles.bioImg}>
            <img
              src={`https://test-task-api-optimo.herokuapp.com${employee.avatar}`}
              alt=""
            />
          </div>
          <div>
            <span>name</span> {employee.name}
          </div>
          <div>
            <span>job:</span> {job.name}
          </div>
          <div>
            <span>location:</span>
            {location.name}
          </div>
          <div>
            <span>number of likes: </span>
            {likes}
          </div>
          <button
            className={styles.likeBtn}
            onClick={() => onLike(employee.id)}
            disabled={pending}
          >
            {pending ? "pending" : "like employee"}
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Employee;

export const getServerSideProps = async (context) => {
  const res = await fetch(
    `https://test-task-api-optimo.herokuapp.com/employee/${context.params.id}`
  );
  const employee = await res.json();
  console.log(employee);
  return {
    props: {
      employee,
    },
  };
};
